"""
Lorcamersfoort Event Scraper
Scrapes events from Ravensburger Play Hub for Spellenpoort store

Store ID: fb053bfb-2df4-4c16-b41d-9fcdff5cb0c8
Store Page: https://tcg.ravensburgerplay.com/stores/fb053bfb-2df4-4c16-b41d-9fcdff5cb0c8
"""

import requests
import json
import re
import os
from datetime import datetime, timezone
from typing import Optional
from pathlib import Path

# Your store's details
STORE_UUID = "fb053bfb-2df4-4c16-b41d-9fcdff5cb0c8"
STORE_SPICERACK_ID = 4387  # Internal Spicerack store ID for Spellenpoort
STORE_PAGE_URL = f"https://tcg.ravensburgerplay.com/stores/{STORE_UUID}"

# Output paths
SCRIPT_DIR = Path(__file__).parent
WEBSITE_DIR = SCRIPT_DIR / "website"
JSON_OUTPUT = WEBSITE_DIR / "data" / "events.json"

# Known event IDs for your store (from the webpage)
KNOWN_EVENT_IDS = [338171, 340398]  # Weekly Play and Winterspell Prerelease


def scrape_event_page(event_id: int) -> Optional[dict]:
    """
    Scrape event details from a specific event page.
    The data is embedded in the Next.js dehydrated state.
    """
    url = f"https://tcg.ravensburgerplay.com/events/{event_id}"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        html = response.text
        
        # Find the dehydrated state JSON containing event data
        # Pattern matches the Next.js RSC payload format
        event_data = extract_event_from_html(html, event_id)
        
        if event_data:
            return event_data
        
        # Fallback: extract key fields using regex
        return extract_event_fields_regex(html, event_id)
        
    except requests.RequestException as e:
        print(f"Error fetching event {event_id}: {e}")
        return None


def extract_event_from_html(html: str, event_id: int) -> Optional[dict]:
    """
    Extract structured event data from Next.js dehydrated state.
    The HTML contains escaped JSON in script tags.
    """
    event = {"id": event_id, "url": f"https://tcg.ravensburgerplay.com/events/{event_id}"}
    
    # The HTML contains escaped JSON like: \"name\":\"value\"
    # We need to search for both escaped and unescaped patterns
    
    # Find event name - look for the pattern with full_address before it
    name_pattern = r'full_address\\":\\"[^"]+\\",\\"name\\":\\"([^"\\]+)'
    match = re.search(name_pattern, html)
    if match:
        event["name"] = match.group(1)
    else:
        # Try unescaped version
        match = re.search(r'full_address":"[^"]+","name":"([^"]+)"', html)
        if match:
            event["name"] = match.group(1)
    
    # Start datetime - escaped version
    match = re.search(r'\\"start_datetime\\":\\"([^"\\]+)\\"', html)
    if match:
        event["start_datetime"] = match.group(1)
    else:
        match = re.search(r'"start_datetime":"([^"]+)"', html)
        if match:
            event["start_datetime"] = match.group(1)
    
    # Cost in cents
    match = re.search(r'\\"cost_in_cents\\":(\d+)', html)
    if match:
        cents = int(match.group(1))
        event["cost_cents"] = cents
        event["cost_display"] = f"€{cents / 100:.2f}" if cents > 0 else "Gratis"
    else:
        match = re.search(r'"cost_in_cents":(\d+)', html)
        if match:
            cents = int(match.group(1))
            event["cost_cents"] = cents
            event["cost_display"] = f"€{cents / 100:.2f}" if cents > 0 else "Gratis"
    
    # Capacity
    match = re.search(r'\\"capacity\\":(\d+)', html)
    if match:
        event["capacity"] = int(match.group(1))
    else:
        match = re.search(r'"capacity":(\d+)', html)
        if match:
            event["capacity"] = int(match.group(1))
    
    # Registered player count
    match = re.search(r'\\"registered_user_count\\":(\d+)', html)
    if match:
        event["registered_count"] = int(match.group(1))
    else:
        match = re.search(r'"registered_user_count":(\d+)', html)
        if match:
            event["registered_count"] = int(match.group(1))
    
    # Gameplay format
    match = re.search(r'\\"gameplay_format\\":\{\\"id\\":\\"[^"\\]+\\",\\"name\\":\\"([^"\\]+)\\"', html)
    if match:
        event["format"] = match.group(1)
    else:
        match = re.search(r'"gameplay_format":\{"id":"[^"]+","name":"([^"]+)"', html)
        if match:
            event["format"] = match.group(1)
    
    # Store name
    match = re.search(r'\\"store\\":\{\\"id\\":\d+,\\"name\\":\\"([^"\\]+)\\"', html)
    if match:
        event["store_name"] = match.group(1)
    else:
        match = re.search(r'"store":\{"id":\d+,"name":"([^"]+)"', html)
        if match:
            event["store_name"] = match.group(1)
    
    return event


def extract_event_fields_regex(html: str, event_id: int) -> dict:
    """
    Fallback extraction using regex patterns.
    """
    event = {
        "id": event_id,
        "url": f"https://tcg.ravensburgerplay.com/events/{event_id}"
    }
    
    # Try various patterns
    patterns = {
        "start_datetime": r'"start_datetime":"([^"]+)"',
        "name": r'"name":"([^"]+)"',
        "cost_in_cents": r'"cost_in_cents":(\d+)',
        "capacity": r'"capacity":(\d+)',
        "registered_user_count": r'"registered_user_count":(\d+)',
    }
    
    for key, pattern in patterns.items():
        match = re.search(pattern, html)
        if match:
            value = match.group(1)
            if key in ["cost_in_cents", "capacity", "registered_user_count"]:
                event[key] = int(value)
            else:
                event[key] = value
    
    return event


def scrape_store_events() -> list:
    """
    Scrape all events for Spellenpoort store.
    """
    events = []
    
    # First try to discover new events from store page
    print("🔍 Discovering events from store page...")
    discovered_ids = discover_event_ids_from_store_page()
    
    # Combine with known event IDs
    all_event_ids = list(set(KNOWN_EVENT_IDS + discovered_ids))
    
    print(f"📋 Found {len(all_event_ids)} event IDs to check...")
    for event_id in all_event_ids:
        event = scrape_event_page(event_id)
        if event:
            events.append(event)
            print(f"  ✓ Event {event_id}: {event.get('name', 'Unknown')}")
    
    return events


def filter_future_events(events: list) -> list:
    """
    Filter out events that have already passed.
    Only keeps events with start_datetime in the future.
    """
    now = datetime.now(timezone.utc)
    future_events = []
    
    for event in events:
        if 'start_datetime' not in event:
            # Keep events without datetime (just in case)
            future_events.append(event)
            continue
        
        try:
            # Parse the datetime string
            dt_str = event['start_datetime']
            # Handle various datetime formats
            if dt_str.endswith('Z'):
                dt_str = dt_str[:-1] + '+00:00'
            event_dt = datetime.fromisoformat(dt_str)
            
            # Make sure it's timezone aware
            if event_dt.tzinfo is None:
                event_dt = event_dt.replace(tzinfo=timezone.utc)
            
            if event_dt > now:
                future_events.append(event)
            else:
                print(f"  ⏭️  Skipping past event: {event.get('name', 'Unknown')} ({dt_str})")
        except Exception as e:
            print(f"  ⚠️  Could not parse date for event {event.get('id')}: {e}")
            # Keep the event if we can't parse the date
            future_events.append(event)
    
    return future_events


def sort_events_by_date(events: list) -> list:
    """
    Sort events by start_datetime, soonest first.
    """
    def get_sort_key(event):
        if 'start_datetime' not in event:
            return datetime.max.replace(tzinfo=timezone.utc)
        try:
            dt_str = event['start_datetime']
            if dt_str.endswith('Z'):
                dt_str = dt_str[:-1] + '+00:00'
            dt = datetime.fromisoformat(dt_str)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except:
            return datetime.max.replace(tzinfo=timezone.utc)
    
    return sorted(events, key=get_sort_key)


def discover_event_ids_from_store_page() -> list:
    """
    Try to discover event IDs from the store page.
    Note: This may not work if the page uses client-side rendering.
    """
    try:
        response = requests.get(STORE_PAGE_URL, timeout=10)
        html = response.text
        
        # Look for event IDs in the format /events/XXXXXX
        pattern = r'/events/(\d{5,7})'
        matches = re.findall(pattern, html)
        
        return list(set(int(m) for m in matches))
    except Exception as e:
        print(f"Error discovering events: {e}")
        return []


def format_event_for_display(event: dict) -> str:
    """
    Format event data for display.
    """
    lines = []
    lines.append(f"📅 {event.get('name', 'Event')}")
    
    if 'start_datetime' in event:
        dt = datetime.fromisoformat(event['start_datetime'].replace('+00:00', '+00:00'))
        lines.append(f"   🕐 {dt.strftime('%A %d %B %Y, %H:%M')}")
    
    if 'format' in event:
        lines.append(f"   🎴 Format: {event['format']}")
    
    if 'cost_display' in event:
        lines.append(f"   💰 {event['cost_display']}")
    
    if 'registered_count' in event and 'capacity' in event:
        lines.append(f"   👥 {event['registered_count']}/{event['capacity']} spelers")
    
    lines.append(f"   🔗 {event['url']}")
    
    return '\n'.join(lines)


def generate_html_widget(events: list) -> str:
    """
    Generate an HTML widget to embed on your website.
    """
    html = """
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <style>
        .lorcamersfoort-events {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 600px;
            margin: 0 auto;
        }
        .event-card {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            color: #fff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .event-title {
    # Filter out past events
    print(f"\n🕐 Filtering past events...")
    future_events = filter_future_events(events)
    
    # Sort by date (soonest first)
    future_events = sort_events_by_date(future_events)
    
    print(f"\n📋 {len(future_events)} upcoming events:\n")
    for event in future_events:
        print(format_event_for_display(event))
        print()
    
    # Ensure website directory exists
    WEBSITE_DIR.mkdir(parents=True, exist_ok=True)
    
    # Save JSON data directly to website folder
    with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(future_events, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved {len(future_events)} events to {JSON_OUTPUT}")
    
    # Also save a backup in the script directory
    backup_json = SCRIPT_DIR / "lorcamersfoort_events.json"
    with open(backup_json, "w", encoding="utf-8") as f:
        json.dump(future_events, f, indent=2, ensure_ascii=False)
    print(f"✅ Backup saved to {backup_json}")
    
    # Generate HTML widget
    html_output = generate_html_widget(future_events)
    with open(SCRIPT_DIR / "lorcamersfoort_events.html", "w", encoding="utf-8") as f:
        f.write(html_output)
    print("✅ Generated lorcamersfoort_events.html")
    
    print("\n" + "=" * 50)
    print("✨ Event update complete!")
    print("=" * 50
            text-decoration: none;
            border-radius: 6px;
            transition: background 0.3s;
        }
        .event-link:hover {
            background: #5b4cc7;
        }
    </style>
</head>
<body>
    <div class="lorcamersfoort-events">
        <h2>🏰 Lorcamersfoort Evenementen</h2>
"""
    
    for event in events:
        dt_str = ""
        if 'start_datetime' in event:
            try:
                dt = datetime.fromisoformat(event['start_datetime'].replace('+00:00', '+00:00'))
                dt_str = dt.strftime('%A %d %B %Y, %H:%M')
            except:
                dt_str = event['start_datetime']
        
        html += f"""
        <div class="event-card">
            <div class="event-title">{event.get('name', 'Evenement')}</div>
            <div class="event-detail">📅 {dt_str}</div>
            <div class="event-detail">🎴 {event.get('format', 'Constructed')}</div>
            <div class="event-detail">💰 {event.get('cost_display', 'Gratis')}</div>
            <div class="event-detail">👥 {event.get('registered_count', 0)}/{event.get('capacity', '?')} spelers</div>
            <a href="{event['url']}" target="_blank" class="event-link">Inschrijven →</a>
        </div>
"""
    
    html += """
    </div>
</body>
</html>
"""
    return html


if __name__ == "__main__":
    print("=" * 50)
    print("🏰 Lorcamersfoort Event Scraper")
    print("=" * 50)
    print(f"\nStore: Spellenpoort")
    print(f"URL: {STORE_PAGE_URL}\n")
    
    # Scrape events
    events = scrape_store_events()
    
    # Filter out past events
    print(f"\n🕐 Filtering past events...")
    future_events = filter_future_events(events)
    
    # Sort by date (soonest first)
    future_events = sort_events_by_date(future_events)
    
    print(f"\n📋 {len(future_events)} upcoming events:\n")
    for event in future_events:
        print(format_event_for_display(event))
        print()
    
    # Ensure website directory exists
    WEBSITE_DIR.mkdir(parents=True, exist_ok=True)
    
    # Save JSON data directly to website folder
    with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(future_events, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved {len(future_events)} events to {JSON_OUTPUT}")
    
    # Also save a backup in the script directory
    backup_json = SCRIPT_DIR / "lorcamersfoort_events.json"
    with open(backup_json, "w", encoding="utf-8") as f:
        json.dump(future_events, f, indent=2, ensure_ascii=False)
    print(f"✅ Backup saved to {backup_json}")
    
    # Generate HTML widget
    html_output = generate_html_widget(future_events)
    with open(SCRIPT_DIR / "lorcamersfoort_events.html", "w", encoding="utf-8") as f:
        f.write(html_output)
    print("✅ Generated lorcamersfoort_events.html")
    
    print("\n" + "=" * 50)
    print("✨ Event update complete!")
    print("=" * 50)
