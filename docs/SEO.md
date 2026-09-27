# PURIENCE — SEO & ORGANIC ACQUISITION ARCHITECTURE

## 1. URL Architecture

- `/`: Root Discovery Portal & Curated Hero
- `/discover`: Dynamic Faceted Experience Directory
- `/experiences/[slug]`: Canonical Experience Pages with Rich Schema.org data
- `/destinations/[slug]`: Hub guides (e.g. `/destinations/marrakech`, `/destinations/seville`)
- `/collections/[slug]`: Editorial playlists (e.g. `/collections/learn-from-someone-local`)

## 2. Meta Tags & OpenGraph

Each page exports dynamic Next.js `generateMetadata` configuring title, description, and high-resolution OpenGraph cards with image dimensions suitable for WhatsApp, Twitter, and iMessage previews.
