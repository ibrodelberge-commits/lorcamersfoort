/**
 * Lorcamersfoort Events Loader
 * Haalt events op van de JSON data en toont ze op de pagina
 */

// Nederlandse maandnamen
const MAANDEN = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'
];

const DAGEN = [
    'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'
];

/**
 * Formatteert een ISO datum naar Nederlandse leesbare string
 */
function formatDatum(isoString) {
    const datum = new Date(isoString);
    const dag = DAGEN[datum.getDay()];
    const dagNummer = datum.getDate();
    const maand = MAANDEN[datum.getMonth()];
    const jaar = datum.getFullYear();
    const uur = datum.getHours().toString().padStart(2, '0');
    const minuten = datum.getMinutes().toString().padStart(2, '0');
    
    return {
        volledig: `${dag} ${dagNummer} ${maand} ${jaar}`,
        tijd: `${uur}:${minuten}`,
        kort: `${dagNummer} ${maand}`
    };
}

/**
 * Maakt een event card HTML element
 */
function createEventCard(event) {
    const datumInfo = formatDatum(event.start_datetime);
    const isGratis = event.cost_cents === 0;
    
    const card = document.createElement('article');
    card.className = 'event-card animate-fade-in';
    
    card.innerHTML = `
        <div class="event-header">
            <span class="event-format">${event.format || 'Constructed'}</span>
        </div>
        <div class="event-body">
            <h3 class="event-title">${event.name}</h3>
            <div class="event-details">
                <div class="event-detail">
                    <span class="event-detail-icon">📅</span>
                    <span>${datumInfo.volledig}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-icon">🕐</span>
                    <span>${datumInfo.tijd}</span>
                </div>
                <div class="event-detail">
                    <span class="event-detail-icon">📍</span>
                    <span>${event.store_name || 'Spellenpoort'}</span>
                </div>
            </div>
            <div class="event-footer">
                <span class="event-price ${isGratis ? 'free' : ''}">${event.cost_display || 'Gratis'}</span>
                <span class="event-capacity">👥 ${event.registered_count || 0}/${event.capacity || 16} spelers</span>
            </div>
            <a href="${event.url}" target="_blank" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                Aanmelden
            </a>
        </div>
    `;
    
    return card;
}

/**
 * Maakt een "geen events" bericht
 */
function createNoEventsMessage() {
    const container = document.createElement('div');
    container.className = 'no-events';
    container.style.cssText = `
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background: var(--bg-card);
        border-radius: var(--radius-md);
    `;
    
    container.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎴</div>
        <h3 style="color: var(--secondary); margin-bottom: 0.5rem;">Geen aankomende events</h3>
        <p style="color: var(--text-secondary);">
            Er zijn momenteel geen geplande events. Kom snel terug of volg ons voor updates!
        </p>
    `;
    
    return container;
}

/**
 * Laadt en toont de events
 */
async function loadEvents() {
    const container = document.getElementById('events-container');
    
    if (!container) {
        console.error('Events container niet gevonden');
        return;
    }
    
    try {
        // Probeer eerst de JSON file te laden
        const response = await fetch('../lorcamersfoort_events.json');
        
        if (!response.ok) {
            throw new Error('Kon events niet laden');
        }
        
        const events = await response.json();
        
        // Clear loading spinner
        container.innerHTML = '';
        
        if (events.length === 0) {
            container.appendChild(createNoEventsMessage());
            return;
        }
        
        // Filter events in de toekomst en sorteer op datum
        const now = new Date();
        const upcomingEvents = events
            .filter(event => new Date(event.start_datetime) > now)
            .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime));
        
        if (upcomingEvents.length === 0) {
            container.appendChild(createNoEventsMessage());
            return;
        }
        
        // Voeg event cards toe
        upcomingEvents.forEach(event => {
            container.appendChild(createEventCard(event));
        });
        
    } catch (error) {
        console.error('Fout bij laden events:', error);
        
        // Toon fallback events (hardcoded voor demo)
        container.innerHTML = '';
        
        const fallbackEvents = [
            {
                id: 338171,
                name: 'Donderdag Evening Weekly Play (Constructed)',
                start_datetime: '2026-01-22T18:30:00+01:00',
                cost_cents: 0,
                cost_display: 'Gratis',
                capacity: 16,
                registered_count: 0,
                format: 'Core Constructed',
                store_name: 'Spellenpoort',
                url: 'https://tcg.ravensburgerplay.com/events/338171'
            },
            {
                id: 340398,
                name: 'Winterspell Prerelease - Sealed',
                start_datetime: '2026-02-19T18:30:00+01:00',
                cost_cents: 4000,
                cost_display: '€40,00',
                capacity: 16,
                registered_count: 0,
                format: 'Sealed',
                store_name: 'Spellenpoort',
                url: 'https://tcg.ravensburgerplay.com/events/340398'
            }
        ];
        
        fallbackEvents.forEach(event => {
            container.appendChild(createEventCard(event));
        });
    }
}

// Laad events wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', loadEvents);
