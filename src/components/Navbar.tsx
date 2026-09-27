"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { useWishlist } from "@/context/WishlistContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";
import {
  Compass,
  Bookmark,
  Globe,
  Coins,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, currency, setCurrency } = useLocale();
  const { savedCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currMenuOpen, setCurrMenuOpen] = useState(false);

  const navLinks = [
    { href: "/discover", label: "Discover" },
    { href: "/destinations", label: "Destinations" },
    { href: "/collections", label: "Collections" },
    { href: "/saved", label: "Saved", badge: savedCount > 0 ? savedCount : null },
  ];

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-border/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl tracking-tight text-charcoal font-bold group-hover:text-terracotta transition-colors">
              PURIENCE
            </span>
            <span className="text-[9px] tracking-[0.28em] uppercase text-muted font-medium -mt-1">
              Pure + Experience
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive ? "text-terracotta font-semibold" : "text-charcoal hover:text-terracotta"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-terracotta text-white rounded-full">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Currency & Language Selectors + Action */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrMenuOpen(!currMenuOpen);
                setLangMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white/60 hover:bg-white text-charcoal font-medium transition"
              aria-label="Select Currency"
            >
              <Coins className="w-3.5 h-3.5 text-muted" />
              <span>{currency}</span>
            </button>

            {currMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-muted font-semibold">
                  Display Currency
                </div>
                {SUPPORTED_CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setCurrMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-sand/40 transition ${
                      currency === c.code ? "text-terracotta font-semibold bg-sand/30" : "text-charcoal"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-muted font-mono">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setCurrMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white/60 hover:bg-white text-charcoal font-medium transition"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-muted" />
              <span className="uppercase">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-muted font-semibold">
                  Interface Language
                </div>
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-sand/40 transition ${
                      language === l.code ? "text-terracotta font-semibold bg-sand/30" : "text-charcoal"
                    }`}
                  >
                    <span>{l.nativeName}</span>
                    <span className="text-muted uppercase text-[10px]">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/discover"
            className="px-4 py-2 bg-charcoal text-ivory hover:bg-terracotta font-medium rounded-full transition-colors flex items-center gap-2 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover</span>
          </Link>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/saved"
            className="relative p-2 text-charcoal hover:text-terracotta"
            aria-label="Saved experiences"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal hover:text-terracotta rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-ivory px-6 py-6 space-y-5 animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-charcoal hover:text-terracotta"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-terracotta text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Currency</span>
              <div className="flex gap-2">
                {SUPPORTED_CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                      currency === c.code ? "bg-terracotta text-white" : "bg-sand text-charcoal"
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted">
              <span>Language</span>
              <div className="flex gap-2">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                      language === l.code ? "bg-terracotta text-white" : "bg-sand text-charcoal"
                    }`}
                  >
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
