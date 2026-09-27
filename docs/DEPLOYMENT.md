# PURIENCE — DEPLOYMENT & INFRASTRUCTURE

## 1. Vercel Production Deployment

Purience is architected as a Next.js edge-ready application optimized for Vercel deployment:
- Turbopack-powered high-speed build.
- Remote image optimization for Unsplash CDN.
- Static generation for core editorial hub pages with dynamic SSR for faceted discovery feeds.

## 2. Environment Variables

- `CURIENCE_API_URL`: Curience Partner API endpoint (defaults to sandbox if unset).
- `CURIENCE_API_KEY`: Partner API authorization key.
- `NEXT_PUBLIC_SITE_URL`: Primary canonical host (e.g. `https://purience.com`).
