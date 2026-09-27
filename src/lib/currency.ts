import { Currency } from "@/types";

// Base exchange rates against EUR (1 EUR = X target)
// In production, these are periodically updated via ECB or live market feed
const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1.0,
  MAD: 10.85,
  USD: 1.09,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  MAD: "MAD ",
  USD: "$",
};

export const SUPPORTED_CURRENCIES: Array<{ code: Currency; label: string; symbol: string }> = [
  { code: "EUR", label: "Euro (€)", symbol: "€" },
  { code: "MAD", label: "Moroccan Dirham (MAD)", symbol: "MAD" },
  { code: "USD", label: "US Dollar ($)", symbol: "$" },
];

/**
 * Converts a base price in whole EUR to target currency using integer math (cents).
 * Avoids IEEE-754 floating-point rounding errors.
 */
export function convertFromEUR(amountInEUR: number, targetCurrency: Currency): number {
  if (targetCurrency === "EUR") return Math.round(amountInEUR);
  const rate = EXCHANGE_RATES[targetCurrency];
  // Convert to cents, multiply by rate, round, convert back to whole units
  const baseCents = Math.round(amountInEUR * 100);
  const targetCents = Math.round(baseCents * rate);
  return Math.round(targetCents / 100);
}

/**
 * Formats an amount in given currency for editorial consumer display
 */
export function formatCurrency(
  amountInEUR: number,
  currency: Currency = "EUR",
  options?: { isFromPrice?: boolean; compact?: boolean }
): string {
  const converted = convertFromEUR(amountInEUR, currency);
  const symbol = CURRENCY_SYMBOLS[currency];
  const prefix = options?.isFromPrice ? "from " : "";

  if (currency === "MAD") {
    return `${prefix}${converted.toLocaleString("en-US")} ${symbol.trim()}`;
  }
  if (currency === "USD") {
    return `${prefix}${symbol}${converted.toLocaleString("en-US")}`;
  }
  return `${prefix}${symbol}${converted.toLocaleString("en-US")}`;
}
