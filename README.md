# PURIENCE (PURE + EXPERIENCE)

> **What is actually worth experiencing?**

Purience is a consumer-first discovery and booking platform for extraordinary experiences worldwide.

**An [EM300.co](https://em300.co) Company.**

---

## 🌟 Brand & Visual Identity
- **Palette**: Warm Ivory (`#F7F4EE`), Deep Charcoal (`#191918`), Burnt Terracotta (`#C65D3A`), Desert Clay (`#A96F52`), Sand (`#E9E0D2`), Forest (`#40584A`).
- **Typography**: Playfair Display (Serif Editorial) + Plus Jakarta Sans (Modern Body).
- **Core Philosophy**: Discovery-first, editorial, human, emotional connection over transaction catalogs.

---

## 🏛️ System Architecture
Purience maintains strict technical and commercial separation from underlying supply providers:
- **`ExperienceSourceAdapter`**: Interface for supply providers.
- **`CurienceExperienceAdapter`**: Upstream distribution partner adapter mapping Curience schemas (`CUR_EXP_...`) to canonical Purience schemas (`PUR_EXP_...`).
- **`PurienceDirectAdapter`**: Direct artisan and maker supply adapter.
- **`SupplyRegistry`**: Unifies multi-supply sources, fallbacks, and transactional booking execution.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view Purience.

### 3. Build for production
```bash
npm run build
```

---

## 📁 Key Routes
- `/`: Editorial Homepage with discovery modules ("Worth travelling for", "Purience Picks", "Unexpected Marrakech", "Make something with your hands", "Eat differently", "After dark").
- `/discover`: Faceted discovery feed with instant filters, price sliders, and category pills.
- `/experiences/[slug]`: Cinematic experience detail page with timeline, host profile, inclusions, and interactive booking widget.
- `/destinations/[slug]`: Editorial destination guides for Marrakech, Seville, Paris, Essaouira, Barcelona.
- `/collections/[slug]`: Curated editorial playlists.
- `/saved`: Personal wishlists with instant shareable links.
- `/checkout/[id]`: Multi-currency booking flow with instant confirmation.
- `/booking/confirmation/[bookingRef]`: Confirmed voucher with calendar `.ics` download and host directions.
- `/design-system`: Living showcase of tokens, typography, and UI components.
- `/admin`: Curatorial merchandising console and supply adapter health monitor.

---

## 📚 Documentation
- [Image Audit & Bilingual System](docs/IMAGE_AUDIT_AND_I18N.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Curience Integration](docs/CURIENCE_INTEGRATION.md)
- [Booking Engine](docs/BOOKING.md)
- [Analytics](docs/ANALYTICS.md)
- [SEO](docs/SEO.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Decisions (ADRs)](docs/DECISIONS.md)

---

© Purience Inc. An [EM300.co](https://em300.co) Company.
