# 🏰 Lorcamersfoort

Community website voor Disney Lorcana spelers in Amersfoort, Nederland.

🌐 **Live website**: https://[jouw-username].github.io/lorcamersfoort/website/

---

## 📋 Over dit project

Lorcamersfoort is een community van Disney Lorcana spelers die elke donderdagavond samenkomen in Amersfoort. Deze website toont onze evenementen automatisch via de Ravensburger Play Hub.

### Speellocatie
- **Denksportcentrum Amersfoort**
- Nijverheidsweg-Noord 76C, 3812 PM Amersfoort (De Isselt)
- Elke donderdag vanaf 19:30
- Gratis parkeren!

### Winkel
- **Spellenpoort** - [spellenpoort.com](https://spellenpoort.com)
- Scherbierstraat 4, 3811 JP Amersfoort

---

## 🚀 Hosting Setup (GitHub Pages)

### Stap 1: Repository aanmaken
1. Ga naar https://github.com/new
2. Naam: `lorcamersfoort`
3. Kies **Public**
4. Klik **Create repository**

### Stap 2: Code pushen
```bash
cd C:\Users\ivor_\lorcamersfoort
git init
git add .
git commit -m "Initial commit: Lorcamersfoort website"
git branch -M main
git remote add origin https://github.com/[jouw-username]/lorcamersfoort.git
git push -u origin main
```

### Stap 3: GitHub Pages inschakelen
1. Ga naar repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. De website is live op: `https://[jouw-username].github.io/lorcamersfoort/website/`

### Stap 4: Actions activeren
1. Ga naar **Actions** tab
2. Klik op **I understand my workflows, go ahead and enable them**
3. Events worden nu dagelijks om 07:00 (NL tijd) automatisch bijgewerkt

---

## 📁 Project Structuur

```
lorcamersfoort/
├── .github/
│   └── workflows/
│       └── update-events.yml    # Automatische event updates
├── website/
│   ├── index.html               # Hoofdpagina
│   ├── css/styles.css           # Styling
│   ├── js/
│   │   ├── main.js              # Navigatie & animaties
│   │   ├── events.js            # Event laden
│   │   └── i18n.js              # Taal toggle (NL/EN)
│   ├── images/                  # Afbeeldingen
│   ├── data/events.json         # Event data
│   ├── sitemap.xml              # SEO sitemap
│   └── robots.txt               # SEO robots
├── scraper.py                   # Event scraper
├── update_events.bat            # Handmatige update script
└── README.md                    # Dit bestand
```

---

## ⚙️ Handmatig Events Bijwerken

### Windows
```bash
cd C:\Users\ivor_\lorcamersfoort
python scraper.py
```

Of dubbelklik op `update_events.bat`

### De scraper haalt events op van
- **Store UUID**: `fb053bfb-2df4-4c16-b41d-9fcdff5cb0c8`
- **Play Hub**: https://tcg.ravensburgerplay.com/stores/fb053bfb-2df4-4c16-b41d-9fcdff5cb0c8

---

## 🔧 Lokaal Testen

```bash
cd C:\Users\ivor_\lorcamersfoort\website
python -m http.server 8080
```

Open http://localhost:8080 in je browser.

---

## 📧 Contact

- **Email**: spellenpoort.lorcana@gmail.com
- **Winkel**: [spellenpoort.com](https://spellenpoort.com)

---

## 📜 Licentie

Dit project is gemaakt voor de Lorcamersfoort community. Disney Lorcana is een handelsmerk van Disney.
