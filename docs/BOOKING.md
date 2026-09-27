# PURIENCE — BOOKING & TRANSACTION ENGINE

## 1. Booking Architecture

Purience implements an abstracted `BookingProviderAdapter` pattern:
1. **Selection**: User selects Date, Time Slot, Tier Option, and Party Size.
2. **Pricing Normalization**: Prices are stored in base EUR and converted in real-time to display currency (EUR, MAD, USD) using safe integer arithmetic (cents) to avoid IEEE floating-point errors.
3. **Reservation**: Lead traveler information (Name, Email, WhatsApp Phone, Dietary/Accessibility requests) is validated.
4. **Execution**: The booking request is forwarded to `SupplyRegistry.processBooking()`.
5. **Confirmation**: A canonical Purience booking reference (`PUR-BK-XXXXXX`) is generated along with an upstream partner reference (`CUR-BK-XXXXXX` or `PUR-DIR-BK-XXXXXX`).
6. **Voucher & Calendar**: Traveler receives immediate instant confirmation, downloadable standard `.ics` calendar appointment, and meeting point directions.
