"use client";

import React, { createContext, useContext, useState } from "react";
import { Currency, Language } from "@/types";
import { TRANSLATIONS, TranslationDictionary, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { formatCurrency as formatCurrencyUtil } from "@/lib/currency";

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: TranslationDictionary;
  dir: "ltr" | "rtl";
  formatCurrency: (amountInEUR: number, options?: { isFromPrice?: boolean; compact?: boolean }) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedLang = localStorage.getItem("purience_language") as Language | null;
        if (savedLang && ["en", "fr", "es", "ar"].includes(savedLang)) {
          return savedLang;
        }
      } catch {
        // ignore
      }
    }
    return "en";
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCurr = localStorage.getItem("purience_currency") as Currency | null;
        if (savedCurr && ["EUR", "MAD", "USD"].includes(savedCurr)) {
          return savedCurr;
        }
      } catch {
        // ignore
      }
    }
    return "EUR";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("purience_language", lang);
    } catch {
      // ignore
    }
    const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    if (typeof document !== "undefined") {
      document.documentElement.dir = langConfig?.dir || "ltr";
      document.documentElement.lang = lang;
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem("purience_currency", curr);
    } catch {
      // ignore
    }
  };

  const activeLangConfig = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const dir = activeLangConfig?.dir || "ltr";
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const formatCurrency = (amountInEUR: number, options?: { isFromPrice?: boolean; compact?: boolean }) => {
    return formatCurrencyUtil(amountInEUR, currency, options);
  };

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        dir,
        formatCurrency,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
