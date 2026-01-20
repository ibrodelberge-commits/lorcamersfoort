"""Debug script to understand the data structure"""
import requests
import re
import json

url = 'https://tcg.ravensburgerplay.com/events/338171'
response = requests.get(url)
html = response.text

# Save for analysis
with open('event_page.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Find the data section
# Look for patterns in the raw HTML
patterns_to_find = [
    ('"start_datetime"', 'Start datetime'),
    ('"name":"', 'Event name'),
    ('Spellenpoort', 'Store name'),
    ('Weekly Play', 'Event type'),
    ('donderdag', 'Day of week'),
]

print("Searching for patterns in HTML...")
for pattern, desc in patterns_to_find:
    idx = html.find(pattern)
    if idx > 0:
        # Get context around the match
        start = max(0, idx - 50)
        end = min(len(html), idx + 200)
        context = html[start:end]
        print(f"\n✓ Found '{desc}' at position {idx}:")
        print(f"  Context: ...{context}...")
    else:
        print(f"\n✗ '{desc}' not found")

# Extract the full event JSON from the dehydrated state
print("\n\n" + "="*50)
print("Extracting full event data...")
print("="*50)

# The data appears in script tags like: self.__next_f.push([1,"..."])
# But it's split across multiple pushes

# Let's find all data segments containing our event
import re
pattern = r'self\.__next_f\.push\(\[1,'
positions = [m.start() for m in re.finditer(pattern, html)]
print(f"\nFound {len(positions)} data push positions")

# Find the one with our event data
for pos in positions:
    end_pos = min(pos + 5000, len(html))
    chunk = html[pos:end_pos]
    if '338171' in chunk and 'start_datetime' in chunk:
        print("\nFound event data chunk!")
        # Clean up and print
        print(chunk[:2000])
        break
