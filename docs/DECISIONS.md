# PURIENCE — ARCHITECTURAL DECISION RECORDS (ADR)

## ADR 001: Separation of Purience Core from Curience Infrastructure
- **Context**: Curience supplies launch inventory, but Purience must remain commercially independent.
- **Decision**: Implemented `ExperienceSourceAdapter` with internal bi-directional canonical mapping (`PUR_EXP_...` ↔ `CUR_EXP_...`).
- **Consequence**: Purience can swap or diversify supply partners with zero database or consumer schema breakage.

## ADR 002: Anti-SaaS Editorial Design System
- **Context**: Travel discovery requires emotional resonance rather than utility SaaS tables.
- **Decision**: Adopted a restrained palette of Warm Ivory (`#F7F4EE`), Deep Charcoal (`#191918`), and Burnt Terracotta (`#C65D3A`) paired with `Playfair Display` serif headlines.
- **Consequence**: Produces a distinct, magazine-quality aesthetic that builds consumer desire.

## ADR 003: Safe Integer Currency Math
- **Context**: Floating-point arithmetic causes rounding errors in multi-currency conversions.
- **Decision**: Base prices in integer cents EUR, converted using integer multipliers for MAD and USD.
- **Consequence**: Reliable accounting and zero fractional cent artifacts.

## ADR 004: Ownership Branding in Footer
- **Context**: Purience is an EM300 consumer travel-tech startup.
- **Decision**: Prominent attribution in footer: "An EM300.co Company" linking directly to `https://em300.co`.
- **Consequence**: Clear brand heritage and transparency.
