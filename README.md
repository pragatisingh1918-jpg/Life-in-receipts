# 🧾 Life Receipts: The Story of You

> **WebRush 6-Hour Frontend Hackathon Project**  
> *Transforming fragmented digital moments into a 3D interactive story experience.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Tests](https://img.shields.io/badge/Vitest-3%20Passed-brightgreen.svg)]()
[![Core Web Vitals](https://img.shields.io/badge/Web%20Vitals-100%25-success.svg)]()

---

## 🌟 Overview

**Life Receipts** is an interactive digital experience built for the *WebRush Hackathon* challenge **"Your Life, In Receipts"**. 

Instead of showing raw, disconnected transaction rows or music streaming logs, **Life Receipts** turns digital traces (2 AM Spotify streams, Domino's Pizza orders, INOX movie tickets, hospital runs, Ganesh festival idols, train journeys) into a 3D interactive narrative.

---

## ✨ Key Features

- **🧾 3D Thermal Receipt Visualizer**: Interactive 3D mouse tilt perspective, realistic perforated paper textures, barcodes with animated laser scanner beam, and category stamps.
- **🎵 Dedicated Spotify Music Vault**: 3D spinning vinyl record player, live animated equalizer audio waveform, and 2 AM midnight music stream analytics.
- **📖 Interactive Story Chapters**: Guided auto-playing narrative slideshow (*"Chapter I: The 2 AM Melancholy & Payday Indulgence"*) with quote highlights and celebration confetti engine.
- **🕸️ Moment Connections Explorer**: Interactive constellation graph connecting related moments across music, purchases, movies, and health care.
- **📊 Persona & Pattern Insights**: Chronotype distribution (Night Owl vs. Early Bird), top obsessions tracker, and expenditure vs. emotional state analytics.
- **📥 Custom Dataset Importer**: Drag-and-drop CSV/JSON file parser (powered by PapaParse) allowing live testing of custom datasets.

---

## 🏗️ Architecture & Directory Structure

```text
life-in-receipts/
├── src/
│   ├── assets/           # Media & visual assets
│   ├── components/       # Modular React functional components
│   │   ├── ConnectionGraph.jsx
│   │   ├── DataUploader.jsx
│   │   ├── InsightsDashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ReceiptCard.jsx
│   │   ├── SpotifyVault.jsx
│   │   └── StoryPlayer.jsx
│   ├── data/             # Structured datasets & JSDoc schema
│   │   └── receiptsData.js
│   ├── hooks/            # Custom React hooks (useReceipts)
│   │   └── useReceipts.js
│   ├── test/             # Vitest & Testing Library audit suite
│   │   ├── App.test.jsx
│   │   └── setup.js
│   ├── types/            # TypeScript interfaces
│   │   └── index.d.ts
│   ├── utils/            # Pure utility functions & formatters
│   │   └── formatters.js
│   ├── App.jsx           # Main application state & tab orchestration
│   ├── index.css         # Tailwind CSS & 3D thermal styling
│   └── main.jsx          # React entry point
├── jsconfig.json         # Path aliases (@/*)
├── LICENSE               # MIT License
├── README.md             # Project documentation
└── vite.config.js        # Vite + Vitest + Tailwind config
```

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 18 + Vite 8
- **Styling**: Tailwind CSS v4 + 3D CSS Transforms & Perspective
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Parser**: PapaParse
- **Testing**: Vitest + Testing Library + jsdom

---

## 🧪 Testing & Verification

Run unit tests via Vitest:

```bash
npm run test
```

Build production bundle:

```bash
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
