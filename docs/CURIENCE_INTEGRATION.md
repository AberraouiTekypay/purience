# PURIENCE — CURIENCE INTEGRATION PROTOCOL

## 1. Upstream Protocol

Purience interfaces with Curience via the `CurienceExperienceAdapter`.
This adapter acts as a customer/partner client adhering strictly to external API boundaries.

## 2. Source Mapping Architecture

Curience supplies items identified by `CUR_EXP_XXXXXX`. Purience ingests and maps them to canonical `PUR_EXP_XXXXXX` objects. Consumers never see Curience IDs or schemas directly.

| Canonical Purience ID | Upstream Curience ID | Experience Title |
| :--- | :--- | :--- |
| `PUR_EXP_10291` | `CUR_EXP_849382` | Master the Sacred Geometry of Hand-Chiseled Zellige |
| `PUR_EXP_10293` | `CUR_EXP_710924` | Cante Jondo: Acoustic Flamenco Inside a 17th-Century Patio |
| `PUR_EXP_10294` | `CUR_EXP_992140` | Sidi Kaouki Sunset Gallop & Argan Grove Ocean Fire |
| `PUR_EXP_10296` | `CUR_EXP_448102` | Old Scent Alchemy: Compounding Mediterranean Botanicals |
| `PUR_EXP_10297` | `CUR_EXP_619830` | Agafay Nightfall: Acoustic Oud & Deep Sky Stargazing |

## 3. Resiliency & Independence

If Curience experiences a service disruption, Purience's `SupplyRegistry` transparently retains canonical inventory snapshots and can seamlessly fall back or substitute with Purience Direct suppliers without database migration or consumer downtime.
