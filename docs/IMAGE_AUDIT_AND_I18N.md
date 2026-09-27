# Purience — Image Audit & Bilingual Localization Report

An **[EM300.co](https://em300.co)** Company.

---

## 1. 🖼️ Visual Media Audit

### Methodology & Automation
To guarantee zero 404s, broken aspect ratios, or failed image decodes across desktop and mobile devices, we implemented an automated audit script located at [`scripts/audit_images.js`](../scripts/audit_images.js).

The script scans all canonical inventory items, editorial destination guides, and collection assets across:
- `src/data/canonicalInventory.ts`
- `src/data/destinations.ts`
- `src/data/collections.ts`

### Audit Results
- **Unique Image URLs Audited**: 34
- **HTTP HEAD Status**: 100% Return `200 OK`
- **Replaced 404s**:
  - Replaced broken Zellige photo `photo-1590076215667-875d4ef2d7ee` with verified authentic Moroccan pottery/clay atelier: `https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261`.
  - Replaced broken Seville photo `photo-1583200424564-9f8992f1a603` with verified Plaza de España asset: `https://images.unsplash.com/photo-1569154941061-e231b4725ef1`.
- **Defensive Fallback Mechanism**:
  All image cards and detail page components (`ExperienceCard`, `ExperienceDetailView`, etc.) feature native `onError` event fallbacks ensuring that even in the case of upstream CDN disruption, cards gracefully fall back to a curated backup without breaking layout or throwing uncaught exceptions.

---

## 2. 🌍 Bilingual Architecture (English & French)

Purience offers first-class bilingual support across both **English (`en`)** and **French (`fr`)**.

### User Control
- **Quick Switcher**: One-click `EN` / `FR` switcher pills prominently fixed in the navigation bar on both desktop and mobile.
- **Deep Language Menu**: Additional modal support for `ES` and `AR` (with automatic RTL flipping via `document.documentElement.dir`).
- **Persistence**: User selection persisted across sessions via `localStorage` with SSR-safe initial hydration.

### Schema & Data Decoupling
Purience experiences implement bilingual editorial fields:
```typescript
export interface PurienceExperience {
  id: string;
  slug: string;
  title: string;
  titleFr?: string;
  shortHeadline: string;
  shortHeadlineFr?: string;
  editorialPositioning: string;
  editorialPositioningFr?: string;
  description: string;
  descriptionFr?: string;
  categoryLabel: string;
  categoryLabelFr?: string;
  duration: string;
  durationFr?: string;
  groupType: string;
  groupTypeFr?: string;
  whyYoullLoveIt: string[];
  whyYoullLoveItFr?: string[];
  whatYoullDo: Array<{ step: number; title: string; description: string }>;
  whatYoullDoFr?: Array<{ step: number; title: string; description: string }>;
  included: string[];
  includedFr?: string[];
  notIncluded: string[];
  notIncludedFr?: string[];
  cancellationPolicy: string;
  cancellationPolicyFr?: string;
  accessibility: string;
  accessibilityFr?: string;
  // ...
}
```

### Dynamic Component Localization
1. **Homepage (`src/app/page.tsx`)**:
   Uses `<LocalizedText en="..." fr="..." />` for all module titles, curator notes, editorial quotes, and calls-to-action.
2. **Experience Cards (`src/components/ExperienceCard.tsx`)**:
   Automatically switches titles, subtitles, duration format, and price prefixes (`from €...` vs `dès €...`).
3. **Experience Details (`src/app/experiences/[slug]/ExperienceDetailView.tsx`)**:
   Instantaneous real-time translation of all editorial notes, host bios, timeline steps, meeting coordinates, and cancellation policies.
4. **Interactive Booking Engine (`src/components/BookingWidget.tsx`)**:
   - Dates formatted according to locale (`fr-FR` vs `en-US`).
   - Guest counters: `1 voyageur` vs `1 guest`, `2 voyageurs` vs `2 guests`.
   - Real-time conversion across EUR, MAD, and USD.
5. **Discovery Engine (`src/app/discover/page.tsx`)**:
   Bilingual search index matching both English and French keywords, translated filters, and localized empty states.
6. **Footer (`src/components/Footer.tsx`)**:
   Full localized footer featuring the official branding:
   `"An EM300.co Company"` / `"Une entreprise EM300.co"` with a live link to [https://em300.co](https://em300.co).

---

## 3. Verification & Build Quality
- **TypeScript**: 0 compilation errors (`npx tsc --noEmit`)
- **ESLint**: 0 errors, 0 warnings (`npm run lint`)
- **Next.js Production Build**: 100% static & dynamic page generation (`npm run build`)
