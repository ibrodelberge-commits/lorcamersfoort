/**
 * Lorcamersfoort - Internationalization (i18n)
 * Language toggle between Dutch and English
 */

const translations = {
    nl: {
        // Navigation
        'nav.about': 'Over Ons',
        'nav.events': 'Events',
        'nav.links': 'Links',
        'nav.location': 'Locatie',
        'nav.contact': 'Contact',
        
        // Hero
        'hero.title': 'Welkom bij <span class="highlight">Lorcamersfoort</span>',
        'hero.subtitle': 'De gezelligste Disney Lorcana community van Amersfoort',
        'hero.cta': 'Bekijk Events',
        
        // About
        'about.title': 'Over Ons',
        'about.community.title': 'Onze Community',
        'about.community.text': 'Lorcamersfoort is een enthousiaste groep Disney Lorcana spelers uit Amersfoort en omgeving. Of je nu een ervaren Illumineer bent of net begint met het spel, bij ons ben je welkom!',
        'about.weekly.title': 'Wekelijkse Speeldag',
        'about.weekly.text': 'Elke donderdag komen we samen in het Denksportcentrum Amersfoort om te spelen, ruilen en nieuwe strategieen te ontdekken. Een gezellige avond vol magie en Disney-plezier!',
        'about.tournaments.title': 'Toernooien',
        'about.tournaments.text': 'Naast casual speelavonden organiseren we ook regelmatig toernooien. Van Constructed tot Sealed events - er is voor ieder wat wils!',
        'about.magic.title': 'Word deel van de magie',
        'about.magic.text1': 'Bij Lorcamersfoort draait het niet alleen om winnen. We geloven in een vriendelijke en inclusieve speelomgeving waar iedereen kan genieten van dit fantastische kaartspel.',
        'about.magic.text2': 'Nieuw bij Disney Lorcana? Geen probleem! Onze ervaren spelers helpen je graag op weg met tips over deckbuilding, spelregels en strategie.',
        'about.features.1': 'Wekelijkse speeldag op donderdag',
        'about.features.2': 'Spelen in Denksportcentrum Amersfoort',
        'about.features.3': 'Vriendelijke en behulpzame community',
        'about.features.4': 'Beginners altijd welkom',
        'about.features.5': 'Ruilen en handelen',
        
        // Events
        'events.title': 'Aankomende Events',
        'events.loading': 'Events laden...',
        'events.cta.text': 'Wil je meedoen aan een event? Meld je aan via de Ravensburger Play Hub!',
        'events.cta.button': 'Bekijk alle events op Play Hub',
        'events.register': 'Inschrijven',
        'events.players': 'spelers',
        'events.free': 'Gratis',
        
        // Links
        'links.title': 'Handige Links',
        'links.inkdecks': 'Voor Constructed meta decks die actief gespeeld worden in grote en kleine toernooien.',
        'links.dreamborn': 'Voor het bouwen van decks & beheren van je collectie.',
        'links.resources': 'Officiele speldocumentatie. Onze spelers leggen je ook graag face-to-face uit hoe het spel werkt!',
        'links.cardmarket': 'Voor inkoop en verkoop van individuele kaarten. Mocht niemand de kaart hebben, kijk dan hier!',
        'links.challenge': 'De grootste events waar ieder strijdt om een plek voor de World Championship invitation!',
        'links.lorcanaspelen': 'Nog meer events willen vinden? Via LorcanaSpelen vind je gemakkelijk nog meer events in jouw omgeving!',
        'links.discord': 'De officiele Disney Lorcana Discord server. Niet geaffilieerd met Lorcamersfoort.',
        'links.lorecast': 'Officiele Disney Lorcana LoreCast streams met nieuws, previews en toernooien.',
        
        // Location
        'location.title': 'Locatie',
        'location.play.badge': 'Speellocatie',
        'location.play.description': 'Hier komen we elke donderdag samen om Disney Lorcana te spelen!',
        'location.address': 'Adres:',
        'location.play.time': 'Lorcana Avond:',
        'location.play.schedule': 'Elke donderdag vanaf 19:30',
        'location.play.parking': 'Parkeren:',
        'location.play.parkingInfo': 'Gratis parkeren bij de locatie',
        'location.shop.badge': 'Winkel',
        'location.shop.description': 'Voor al je Disney Lorcana producten en kaarten!',
        'location.shop.website': 'Website:',
        'location.directions': 'Route plannen',
        
        // Contact
        'contact.title': 'Contact',
        'contact.intro': 'Heb je vragen over onze community of wil je meer weten over Disney Lorcana in Amersfoort? Neem gerust contact met ons op!',
        'contact.event': 'Evenement Contact',
        'contact.product': 'Product Contact',
        'contact.whatsapp': 'WhatsApp Groep',
        'contact.whatsapp.note': 'Nieuwe leden worden handmatig toegevoegd op aanvraag',
        
        // Footer
        'footer.description': 'Lorcamersfoort is een onafhankelijke Disney Lorcana community.',
        'footer.copyright': '2026 Lorcamersfoort. Disney Lorcana is een handelsmerk van Disney.'
    },
    
    en: {
        // Navigation
        'nav.about': 'About Us',
        'nav.events': 'Events',
        'nav.links': 'Links',
        'nav.location': 'Location',
        'nav.contact': 'Contact',
        
        // Hero
        'hero.title': 'Welcome to <span class="highlight">Lorcamersfoort</span>',
        'hero.subtitle': 'The friendliest Disney Lorcana community in Amersfoort',
        'hero.cta': 'View Events',
        
        // About
        'about.title': 'About Us',
        'about.community.title': 'Our Community',
        'about.community.text': 'Lorcamersfoort is an enthusiastic group of Disney Lorcana players from Amersfoort and the surrounding area. Whether you are an experienced Illumineer or just starting out, you are welcome to join us!',
        'about.weekly.title': 'Weekly Game Night',
        'about.weekly.text': 'Every Thursday we gather at Denksportcentrum Amersfoort to play, trade and discover new strategies. A fun evening full of magic and Disney fun!',
        'about.tournaments.title': 'Tournaments',
        'about.tournaments.text': 'Besides casual game nights, we also regularly organize tournaments. From Constructed to Sealed events - there is something for everyone!',
        'about.magic.title': 'Become part of the magic',
        'about.magic.text1': 'At Lorcamersfoort, it is not just about winning. We believe in a friendly and inclusive gaming environment where everyone can enjoy this fantastic card game.',
        'about.magic.text2': 'New to Disney Lorcana? No problem! Our experienced players are happy to help you with tips on deckbuilding, game rules and strategy.',
        'about.features.1': 'Weekly game night on Thursdays',
        'about.features.2': 'Playing at Denksportcentrum Amersfoort',
        'about.features.3': 'Friendly and helpful community',
        'about.features.4': 'Beginners always welcome',
        'about.features.5': 'Trading and dealing',
        
        // Events
        'events.title': 'Upcoming Events',
        'events.loading': 'Loading events...',
        'events.cta.text': 'Want to join an event? Sign up via the Ravensburger Play Hub!',
        'events.cta.button': 'View all events on Play Hub',
        'events.register': 'Register',
        'events.players': 'players',
        'events.free': 'Free',
        
        // Links
        'links.title': 'Useful Links',
        'links.inkdecks': 'For Constructed meta decks actively played in large and small tournaments.',
        'links.dreamborn': 'For building decks & managing your collection.',
        'links.resources': 'Official game documentation. Our players are also happy to explain the game face-to-face!',
        'links.cardmarket': 'For buying and selling individual cards. If no one has the card you need, check here!',
        'links.challenge': 'The biggest events where everyone competes for a spot at the World Championship invitation!',
        'links.lorcanaspelen': 'Want to find more events? Via LorcanaSpelen you can easily find more events in your area!',
        'links.discord': 'The official Disney Lorcana Discord server. Not affiliated with Lorcamersfoort.',
        'links.lorecast': 'Official Disney Lorcana LoreCast streams with news, previews and tournaments.',
        
        // Location
        'location.title': 'Location',
        'location.play.badge': 'Play Location',
        'location.play.description': 'This is where we gather every Thursday to play Disney Lorcana!',
        'location.address': 'Address:',
        'location.play.time': 'Lorcana Night:',
        'location.play.schedule': 'Every Thursday from 19:30',
        'location.play.parking': 'Parking:',
        'location.play.parkingInfo': 'Free parking at the venue',
        'location.shop.badge': 'Store',
        'location.shop.description': 'For all your Disney Lorcana products and cards!',
        'location.shop.website': 'Website:',
        'location.directions': 'Get directions',
        
        // Contact
        'contact.title': 'Contact',
        'contact.intro': 'Do you have questions about our community or would you like to know more about Disney Lorcana in Amersfoort? Feel free to contact us!',
        'contact.event': 'Event Contact',
        'contact.product': 'Product Contact',
        'contact.whatsapp': 'WhatsApp Group',
        'contact.whatsapp.note': 'New members are added manually upon request',
        
        // Footer
        'footer.description': 'Lorcamersfoort is an independent Disney Lorcana community.',
        'footer.copyright': '2026 Lorcamersfoort. Disney Lorcana is a trademark of Disney.'
    }
};

// Current language
let currentLang = localStorage.getItem('lorcamersfoort-lang') || 'nl';

/**
 * Initialize i18n system
 */
function initI18n() {
    // Set initial language
    setLanguage(currentLang);
    
    // Setup language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const buttons = langToggle.querySelectorAll('.lang-option');
        buttons.forEach(btn => {
            // Set initial active state
            if (btn.dataset.lang === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                setLanguage(lang);
                
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

/**
 * Set language and update all translations
 */
function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not found, defaulting to nl`);
        lang = 'nl';
    }
    
    currentLang = lang;
    localStorage.setItem('lorcamersfoort-lang', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            // Use innerHTML to support HTML in translations (like <span>)
            element.innerHTML = translations[lang][key];
        }
    });
}

/**
 * Get translation for a key
 */
function t(key) {
    return translations[currentLang][key] || translations['nl'][key] || key;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initI18n);
