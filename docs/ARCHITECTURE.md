# PURIENCE — SYSTEM ARCHITECTURE

## 1. Executive Summary

Purience (**PURE + EXPERIENCE**) is an independent B2C consumer-first discovery and booking platform for extraordinary experiences worldwide.

Purience is owned and operated by EM300 (`An EM300.co Company`).

## 2. Fundamental Company Separation: Purience vs Curience

Purience and Curience are **TWO SEPARATE COMPANIES AND PLATFORMS**:
- **Curience**: B2B experience infrastructure, aggregation, and distribution layer.
- **Purience**: Independent B2C consumer discovery brand, audience, and intent marketplace.

Purience does **not** share database schemas or internal IDs directly with Curience. Instead, Purience connects to Curience through an abstracted partner distribution layer (`ExperienceSourceAdapter`), identical to how any other external enterprise travel distributor would connect.

```
                    SUPPLY SOURCES
         ┌─────────────────┼──────────────────┐
         ↓                 ↓                  ↓
  Curience API      Purience Direct     External APIs
 (Partner v1)        (Artisans)
         └─────────────────┼──────────────────┘
                           ↓
               EXPERIENCE SOURCE ADAPTER
                           ↓
             PURIENCE CANONICAL ENGINE
          - Canonical PurienceExperience
          - Source ID Mappings (PUR_EXP_... ↔ CUR_EXP_...)
          - Multi-Currency & Safe Integer Math
          - Multi-Language & RTL Orchestration
                           ↓
                   PURIENCE UX & APPS
          - Editorial Discovery Feed
          - Curated Hubs & Destinations
          - Handcrafted Playlists (Collections)
          - Wishlist & Share Engine
          - Booking Provider Adapter & Confirmation
                           ↓
                   CONSUMER TRAVELER
```

## 3. Technology Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom Purience editorial design tokens
- **Typography**: Playfair Display (Serif) & Plus Jakarta Sans (Sans)
- **State & Context**: Client-side reactive contexts for Locale (`LocaleContext`) and Wishlists (`WishlistContext`)
- **Supply Registry**: `SupplyRegistry` orchestrating `CurienceExperienceAdapter` and `PurienceDirectAdapter`
- **Analytics**: Funnel tracking service with 16 event stages
