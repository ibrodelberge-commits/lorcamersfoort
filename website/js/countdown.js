/**
 * Lorcamersfoort - Winterspell Reveal Countdown Timer
 * Countdown functionality for content creator reveals
 * All times are in Amsterdam timezone (Europe/Amsterdam)
 */

// Helper function to parse date string as Amsterdam time (CET = UTC+1)
function parseAmsterdamTime(dateStr) {
    // Add CET timezone offset (+01:00) to treat all times as Amsterdam time
    return new Date(dateStr + '+01:00');
}

// Reveal schedule data organized by region
// All times are in Amsterdam timezone (CET/CEST)
const revealSchedule = {
    "Spain": [
        { date: "2026-01-23T21:00:00", creator: "FraviTCG", url: "https://www.youtube.com/@FraviTCG", platform: "YouTube" },
        { date: "2026-01-25T19:00:00", creator: "Maestros de Lorcana", url: "https://youtube.com/@maestrosdelorcana", platform: "YouTube" },
        { date: "2026-01-25T18:30:00", creator: "La Baraja Encantada", url: "https://www.youtube.com/@LaBarajaEncantada", platform: "YouTube" },
        { date: "2026-01-27T20:00:00", creator: "Duelo de tintas", url: "https://www.instagram.com/duelodetintas", platform: "Instagram" },
        { date: "2026-01-29T20:30:00", creator: "Leyendas de Lorcana", url: "https://youtube.com/@leyendasdelorcana", platform: "YouTube" },
        { date: "2026-01-28T21:00:00", creator: "Nachel_K", url: "https://www.instagram.com/nachel_k/", platform: "Instagram" },
        { date: "2026-01-29T20:30:00", creator: "De Buena Tinta", url: "https://www.instagram.com/debuenatinta.lorcana/", platform: "Instagram" }
    ],
    "Italy": [
        { date: "2026-01-21T21:30:00", creator: "Lore League", url: "https://www.instagram.com/loreleagueig/", platform: "Instagram" },
        { date: "2026-01-22T13:00:00", creator: "Escilgioco", url: "http://www.youtube.com/@escilgioco", platform: "YouTube" },
        { date: "2026-01-23T18:30:00", creator: "Lorcanita", url: "https://www.instagram.com/lorcanita.dli/", platform: "Instagram" },
        { date: "2026-01-26T12:00:00", creator: "Amici di Giula", url: "https://www.instagram.com/amicidigiula", platform: "Instagram" },
        { date: "2026-01-27T15:00:00", creator: "Mario Petillo", url: "https://www.instagram.com/mariopetillo/", platform: "Instagram" },
        { date: "2026-01-28T14:00:00", creator: "MakeawishTCG", url: "https://www.instagram.com/makeawish_pkmn/", platform: "Instagram" },
        { date: "2026-01-30T19:00:00", creator: "Erica de Matteis", url: "https://www.instagram.com/erica_dematteis/", platform: "Instagram" }
    ],
    "UK & Ireland": [
        { date: "2026-01-21T14:00:00", creator: "Lorcana Player", url: "https://lorcanaplayer.com/", platform: "Website" },
        { date: "2026-01-21T15:00:00", creator: "Zatu", url: "https://www.board-game.co.uk/author/stefano-paravisi/", platform: "Website" },
        { date: "2026-01-21T17:00:00", creator: "Earlmeister", url: "https://x.com/Earlmeister_", platform: "X" },
        { date: "2026-01-21T18:00:00", creator: "Harlan & Allie Sweete", url: "https://www.youtube.com/@harlansweete", platform: "YouTube" },
        { date: "2026-01-22T19:00:00", creator: "CharltonTCG", url: "https://www.youtube.com/channel/UCt-NPf0zDm1lRwuvhmt4wVg", platform: "YouTube" },
        { date: "2026-01-22T18:00:00", creator: "Lorcana Decks", url: "https://x.com/Lorcanadecks", platform: "X" },
        { date: "2026-01-26T20:00:00", creator: "Lorcana Villain", url: "https://x.com/LorcanaVillain", platform: "X" },
        { date: "2026-01-23T12:00:00", creator: "CozyBoardgames", url: "https://www.instagram.com/cozyboardgames/", platform: "Instagram" },
        { date: "2026-01-24T13:00:00", creator: "Inkkery", url: "https://www.youtube.com/@Inkkery", platform: "YouTube" },
        { date: "2026-01-25T16:00:00", creator: "James Hodges", url: "https://www.tiktok.com/@jamesmhodges", platform: "TikTok" },
        { date: "2026-01-26T19:00:00", creator: "Kimberlyanne Dalton", url: "https://www.tiktok.com/@__kimberlyanne", platform: "TikTok" },
        { date: "2026-01-27T18:30:00", creator: "WossyPlays", url: "https://www.youtube.com/@WossyPlays/videos", platform: "YouTube" }
    ],
    "Nordics": [
        { date: "2026-01-21T10:00:00", creator: "Nordic inkrealm", url: "https://www.instagram.com/nordicinkrealm/", platform: "Instagram" },
        { date: "2026-01-22T10:00:00", creator: "Unelmoin", url: "https://www.tiktok.com/@unelmoinn", platform: "TikTok" },
        { date: "2026-01-23T10:00:00", creator: "TheLegendOfDanne", url: "https://www.instagram.com/thelegendofdanne/", platform: "Instagram" },
        { date: "2026-01-24T10:00:00", creator: "Ruudukko", url: "https://www.youtube.com/channel/UC1-ysqxfsIzVCQ-WwCoUiHQ/videos", platform: "YouTube" }
    ],
    "Benelux": [
        { date: "2026-01-22T19:00:00", creator: "Illumineer Tales", url: "https://www.instagram.com/illumineertales/", platform: "Instagram" },
        { date: "2026-01-24T19:00:00", creator: "confluxvzw", url: "https://www.instagram.com/confluxvzw/", platform: "Instagram" },
        { date: "2026-01-25T19:00:00", creator: "Lorcana Sabine", url: "https://www.instagram.com/lorcana.sabine/", platform: "Instagram" },
        { date: "2026-01-26T19:00:00", creator: "onelore.lorcana", url: "https://www.instagram.com/onelore.lorcana/", platform: "Instagram" }
    ],
    "Poland": [
        { date: "2026-01-21T15:00:00", creator: "weronika_bociag", url: "https://www.instagram.com/weronika_bociag/", platform: "Instagram" },
        { date: "2026-01-24T14:00:00", creator: "goofyplayslorcana", url: "https://www.instagram.com/goofyplayslorcana/", platform: "Instagram" },
        { date: "2026-01-25T18:00:00", creator: "Voj4k", url: "https://youtube.com/@voj4k", platform: "YouTube" },
        { date: "2026-01-26T18:00:00", creator: "zavadahs", url: "https://www.twitch.tv/zavadahs", platform: "Twitch" }
    ],
    "France": [
        { date: "2026-01-21T10:30:00", creator: "Val & PL", url: "https://www.twitch.tv/val_pl_magicarenafr", platform: "Twitch" },
        { date: "2026-01-21T22:30:00", creator: "Boba", url: "https://www.twitch.tv/bobafett17", platform: "Twitch" },
        { date: "2026-01-22T07:00:00", creator: "Dodane", url: "https://www.youtube.com/@dodanelorcana", platform: "YouTube" },
        { date: "2026-01-22T17:00:00", creator: "Tom & Revan", url: "https://www.youtube.com/@TomEtRevan", platform: "YouTube" },
        { date: "2026-01-24T19:00:00", creator: "Gaëtan Call", url: "https://www.youtube.com/@gaetan_call", platform: "YouTube" },
        { date: "2026-01-27T22:00:00", creator: "Les joueurs du dimanche", url: "https://www.twitch.tv/maxildan", platform: "Twitch" }
    ],
    "Germany": [
        { date: "2026-01-21T14:00:00", creator: "Babbelheld", url: "https://www.youtube.com/@Babbelheld_Lorcana", platform: "YouTube" },
        { date: "2026-01-22T19:30:00", creator: "Tintenvorrat", url: "https://www.instagram.com/tintenvorrat/", platform: "Instagram" },
        { date: "2026-01-23T18:00:00", creator: "DerDobby", url: "https://www.youtube.com/@xDerDobbyx", platform: "YouTube" },
        { date: "2026-01-24T17:27:00", creator: "Ready_Set_Rob", url: "https://www.instagram.com/ready_set_rob/", platform: "Instagram" },
        { date: "2026-01-24T18:00:00", creator: "Disphielifestyle", url: "https://www.instagram.com/disphielifestyle/", platform: "Instagram" },
        { date: "2026-01-25T19:04:00", creator: "Sl4sH", url: "https://www.youtube.com/@donsl4sh177", platform: "YouTube" },
        { date: "2026-01-25T18:00:00", creator: "Ink2well", url: "https://www.youtube.com/@Ink2well", platform: "YouTube" },
        { date: "2026-01-26T16:00:00", creator: "CardCrows", url: "https://www.youtube.com/@CardCrows", platform: "YouTube" },
        { date: "2026-01-26T13:00:00", creator: "LorcanaTactics", url: "https://www.instagram.com/lorcanatactics/", platform: "Instagram" },
        { date: "2026-01-28T13:37:00", creator: "RadioNukular", url: "https://www.instagram.com/radionukular/", platform: "Instagram" },
        { date: "2026-01-30T18:00:00", creator: "TotaHahn", url: "https://www.youtube.com/@TotaHahnLorcana", platform: "YouTube" }
    ],
    "North America": [
        { date: "2026-01-22T02:00:00", creator: "DWLorcana", url: "https://x.com/dwlorcana", platform: "X" },
        { date: "2026-01-21T21:00:00", creator: "Lorcana Duo", url: "https://www.instagram.com/lorcanaduo/?hl=en", platform: "Instagram" },
        { date: "2026-01-22T23:00:00", creator: "enchanted_kim", url: "https://www.instagram.com/enchanted_kim_/?hl=en", platform: "Instagram" },
        { date: "2026-01-23T01:00:00", creator: "Lorcana Goons", url: "https://www.youtube.com/@LorcanaGoons", platform: "YouTube" },
        { date: "2026-01-23T02:00:00", creator: "Panderic Quests", url: "https://www.instagram.com/pandericquests/?hl=en", platform: "Instagram" },
        { date: "2026-01-23T02:00:00", creator: "The Lorekeeper's Inn", url: "https://www.youtube.com/@thelorekeepersinn", platform: "YouTube" },
        { date: "2026-01-23T20:00:00", creator: "Illumineer's Champion League", url: "https://www.youtube.com/@IllumineerChampionsLeague/streams", platform: "YouTube" },
        { date: "2026-01-23T21:00:00", creator: "lawcana", url: "https://www.instagram.com/lawcana/", platform: "Instagram" },
        { date: "2026-01-24T00:00:00", creator: "Googly Glimmers", url: "https://www.youtube.com/@GooglyGlimmers", platform: "YouTube" },
        { date: "2026-01-24T19:00:00", creator: "ajrafael", url: "https://www.instagram.com/ajrafael/?hl=en", platform: "Instagram" },
        { date: "2026-01-24T19:00:00", creator: "Kovray", url: "https://www.youtube.com/@kovray", platform: "YouTube" },
        { date: "2026-01-25T20:00:00", creator: "Eric Switzer", url: "https://x.com/EpicSwitzer", platform: "X" },
        { date: "2026-01-28T00:00:00", creator: "bibbidi.bobbidi.beard", url: "https://www.instagram.com/bibbidi.bobbidi.beard/", platform: "Instagram" },
        { date: "2026-01-28T04:00:00", creator: "The Dan Regal", url: "https://youtube.com/@thedanregal", platform: "YouTube" },
        { date: "2026-01-27T18:00:00", creator: "Garrick's Lorcana Lair", url: "https://www.youtube.com/@TheLorcanaLair", platform: "YouTube" },
        { date: "2026-01-29T00:00:00", creator: "Brent Mukai", url: "https://youtube.com/@brentsquest", platform: "YouTube" },
        { date: "2026-01-30T22:00:00", creator: "The Hobbyist Novice", url: "https://www.youtube.com/@TheHobbyistNovice", platform: "YouTube" }
    ]
};

// Platform icons mapping
const platformIcons = {
    "YouTube": "▶️",
    "Instagram": "📷",
    "TikTok": "🎵",
    "Twitch": "📺",
    "X": "𝕏",
    "Website": "🌐"
};

// Language strings
const countdownI18n = {
    nl: {
        pageTitle: "Winterspell Reveals",
        pageSubtitle: "Content Creator Kaart Onthullingen",
        nextReveal: "Volgende Onthulling",
        days: "Dagen",
        hours: "Uren",
        minutes: "Minuten",
        seconds: "Seconden",
        live: "🔴 LIVE NU!",
        revealed: "Onthuld",
        upcoming: "Aankomend",
        watchNow: "Bekijk Nu",
        filterAll: "Alle Regio's",
        showPast: "Toon Verlopen",
        hidePast: "Verberg Verlopen",
        noUpcoming: "Geen aankomende onthullingen",
        allRevealed: "Alle kaarten zijn onthuld!"
    },
    en: {
        pageTitle: "Winterspell Reveals",
        pageSubtitle: "Content Creator Card Reveals",
        nextReveal: "Next Reveal",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        live: "🔴 LIVE NOW!",
        revealed: "Revealed",
        upcoming: "Upcoming",
        watchNow: "Watch Now",
        filterAll: "All Regions",
        showPast: "Show Past",
        hidePast: "Hide Past",
        noUpcoming: "No upcoming reveals",
        allRevealed: "All cards have been revealed!"
    }
};

let currentLang = 'nl';
let showPastReveals = false;
let activeRegion = 'all';

// Initialize countdown page
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('lorcamersfoort-lang');
    if (savedLang) {
        currentLang = savedLang;
    }

    initializeFilters();
    renderRevealSchedule();
    startCountdownTimers();
    
    // Update countdowns every second
    setInterval(updateAllCountdowns, 1000);
});

// Initialize filter buttons
function initializeFilters() {
    const filterContainer = document.getElementById('region-filters');
    if (!filterContainer) return;

    // Add "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.region = 'all';
    allBtn.textContent = countdownI18n[currentLang].filterAll;
    allBtn.addEventListener('click', () => filterByRegion('all'));
    filterContainer.appendChild(allBtn);

    // Add region buttons
    Object.keys(revealSchedule).forEach(region => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.region = region;
        btn.textContent = region;
        btn.addEventListener('click', () => filterByRegion(region));
        filterContainer.appendChild(btn);
    });

    // Toggle past reveals button
    const togglePastBtn = document.getElementById('toggle-past');
    if (togglePastBtn) {
        togglePastBtn.addEventListener('click', togglePastReveals);
        updateTogglePastButton();
    }
}

// Filter reveals by region
function filterByRegion(region) {
    activeRegion = region;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.region === region);
    });
    
    renderRevealSchedule();
}

// Toggle showing past reveals
function togglePastReveals() {
    showPastReveals = !showPastReveals;
    updateTogglePastButton();
    renderRevealSchedule();
}

function updateTogglePastButton() {
    const btn = document.getElementById('toggle-past');
    if (btn) {
        btn.textContent = showPastReveals 
            ? countdownI18n[currentLang].hidePast 
            : countdownI18n[currentLang].showPast;
        btn.classList.toggle('active', showPastReveals);
    }
}

// Render the reveal schedule
function renderRevealSchedule() {
    const container = document.getElementById('reveals-container');
    if (!container) return;

    const now = new Date();
    let allReveals = [];

    // Collect all reveals
    Object.entries(revealSchedule).forEach(([region, reveals]) => {
        if (activeRegion === 'all' || activeRegion === region) {
            reveals.forEach(reveal => {
                allReveals.push({ ...reveal, region });
            });
        }
    });

    // Sort by date
    allReveals.sort((a, b) => parseAmsterdamTime(a.date) - parseAmsterdamTime(b.date));

    // Filter based on showPastReveals
    if (!showPastReveals) {
        allReveals = allReveals.filter(reveal => parseAmsterdamTime(reveal.date) > now);
    }

    // Update next reveal hero
    updateNextRevealHero(allReveals, now);

    // Clear and render
    container.innerHTML = '';

    if (allReveals.length === 0) {
        container.innerHTML = `
            <div class="no-reveals">
                <p>${showPastReveals ? countdownI18n[currentLang].noUpcoming : countdownI18n[currentLang].allRevealed}</p>
            </div>
        `;
        return;
    }

    allReveals.forEach((reveal, index) => {
        const revealDate = parseAmsterdamTime(reveal.date);
        const isPast = revealDate <= now;
        const isLive = !isPast && (revealDate - now) < 3600000; // Within 1 hour

        const card = document.createElement('div');
        card.className = `reveal-card ${isPast ? 'past' : ''} ${isLive ? 'live' : ''}`;
        card.dataset.date = reveal.date;

        card.innerHTML = `
            <div class="reveal-card-header">
                <span class="reveal-region">${reveal.region}</span>
                <span class="reveal-platform">${platformIcons[reveal.platform] || '🔗'} ${reveal.platform}</span>
            </div>
            <div class="reveal-card-body">
                <h3 class="reveal-creator">${reveal.creator}</h3>
                <div class="reveal-datetime">
                    <span class="reveal-date">${formatDate(revealDate)}</span>
                    <span class="reveal-time">${formatTime(revealDate)}</span>
                </div>
                <div class="reveal-countdown" data-target="${reveal.date}">
                    ${isPast ? `<span class="status-badge revealed">${countdownI18n[currentLang].revealed}</span>` : 
                      isLive ? `<span class="status-badge live">${countdownI18n[currentLang].live}</span>` :
                      '<span class="countdown-timer">--:--:--:--</span>'}
                </div>
            </div>
            <div class="reveal-card-footer">
                <a href="${reveal.url}" target="_blank" rel="noopener noreferrer" class="reveal-link">
                    ${isPast ? countdownI18n[currentLang].watchNow : countdownI18n[currentLang].upcoming}
                    <span class="link-arrow">→</span>
                </a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Update the hero countdown for next reveal
function updateNextRevealHero(allReveals, now) {
    const heroCountdown = document.getElementById('hero-countdown');
    if (!heroCountdown) return;

    const upcomingReveals = allReveals.filter(r => parseAmsterdamTime(r.date) > now);
    
    if (upcomingReveals.length === 0) {
        heroCountdown.innerHTML = `
            <div class="hero-countdown-complete">
                <span class="complete-icon">✨</span>
                <span>${countdownI18n[currentLang].allRevealed}</span>
            </div>
        `;
        return;
    }

    const nextReveal = upcomingReveals[0];
    const nextDate = parseAmsterdamTime(nextReveal.date);
    const diff = nextDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    heroCountdown.innerHTML = `
        <div class="next-reveal-info">
            <span class="next-reveal-label">${countdownI18n[currentLang].nextReveal}:</span>
            <span class="next-reveal-creator">${nextReveal.creator}</span>
        </div>
        <div class="hero-timer">
            <div class="timer-block">
                <span class="timer-value">${String(days).padStart(2, '0')}</span>
                <span class="timer-label">${countdownI18n[currentLang].days}</span>
            </div>
            <span class="timer-separator">:</span>
            <div class="timer-block">
                <span class="timer-value">${String(hours).padStart(2, '0')}</span>
                <span class="timer-label">${countdownI18n[currentLang].hours}</span>
            </div>
            <span class="timer-separator">:</span>
            <div class="timer-block">
                <span class="timer-value">${String(minutes).padStart(2, '0')}</span>
                <span class="timer-label">${countdownI18n[currentLang].minutes}</span>
            </div>
            <span class="timer-separator">:</span>
            <div class="timer-block">
                <span class="timer-value">${String(seconds).padStart(2, '0')}</span>
                <span class="timer-label">${countdownI18n[currentLang].seconds}</span>
            </div>
        </div>
    `;
}

// Start countdown timers
function startCountdownTimers() {
    updateAllCountdowns();
}

// Update all countdown timers
function updateAllCountdowns() {
    const now = new Date();
    
    // Update hero countdown
    const allReveals = [];
    Object.entries(revealSchedule).forEach(([region, reveals]) => {
        if (activeRegion === 'all' || activeRegion === region) {
            reveals.forEach(reveal => {
                allReveals.push({ ...reveal, region });
            });
        }
    });
    allReveals.sort((a, b) => parseAmsterdamTime(a.date) - parseAmsterdamTime(b.date));
    updateNextRevealHero(allReveals, now);

    // Update card countdowns
    document.querySelectorAll('.reveal-countdown[data-target]').forEach(el => {
        const targetDate = parseAmsterdamTime(el.dataset.target);
        const diff = targetDate - now;

        if (diff <= 0) {
            const isRecent = diff > -3600000; // Within last hour
            el.innerHTML = isRecent 
                ? `<span class="status-badge live">${countdownI18n[currentLang].live}</span>`
                : `<span class="status-badge revealed">${countdownI18n[currentLang].revealed}</span>`;
            el.closest('.reveal-card')?.classList.add('past');
            if (isRecent) {
                el.closest('.reveal-card')?.classList.add('live');
            }
        } else {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (hours < 24) {
                el.innerHTML = `<span class="countdown-timer">${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</span>`;
            } else {
                const days = Math.floor(hours / 24);
                const remainingHours = hours % 24;
                el.innerHTML = `<span class="countdown-timer">${days}d ${String(remainingHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</span>`;
            }
        }
    });
}

// Format date for display (in Amsterdam timezone)
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Europe/Amsterdam' };
    return date.toLocaleDateString(currentLang === 'nl' ? 'nl-NL' : 'en-US', options);
}

// Format time for display (in Amsterdam timezone)
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' };
    const timeStr = date.toLocaleTimeString(currentLang === 'nl' ? 'nl-NL' : 'en-US', options);
    return timeStr + ' CET';
}

// Language toggle support
function setCountdownLanguage(lang) {
    currentLang = lang;
    updateTogglePastButton();
    renderRevealSchedule();
    
    // Update filter buttons
    const allBtn = document.querySelector('.filter-btn[data-region="all"]');
    if (allBtn) {
        allBtn.textContent = countdownI18n[currentLang].filterAll;
    }
}

// Export for external use
window.setCountdownLanguage = setCountdownLanguage;
