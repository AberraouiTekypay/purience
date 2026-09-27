"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { Search, MapPin, Sparkles } from "lucide-react";
import { analytics } from "@/lib/analytics";

export function HeroSection() {
  const { t } = useLocale();
  const router = useRouter();
  const [destinationQuery, setDestinationQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.track("search", {
      query: destinationQuery,
      category: categoryQuery,
    });

    const params = new URLSearchParams();
    if (destinationQuery) params.set("q", destinationQuery);
    if (categoryQuery && categoryQuery !== "all") params.set("category", categoryQuery);

    router.push(`/discover?${params.toString()}`);
  };

  const quickPills = [
    { label: "Marrakech", query: "Marrakech" },
    { label: "Artisan Craft", category: "craft" },
    { label: "After Dark", category: "after-dark" },
    { label: "Seville", query: "Seville" },
    { label: "Culinary & Earth", category: "culinary" },
    { label: "Wild Ocean", category: "ocean" },
  ];

  return (
    <section className="relative overflow-hidden bg-ivory pt-8 pb-16 sm:pb-24 border-b border-border/60">
      {/* Background Ambience Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#DED8CF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Subtle Concept Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/60 border border-border/80 text-charcoal text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span className="uppercase tracking-widest text-[10px] font-semibold text-muted">
              {t.tagline}
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-charcoal leading-[1.08] text-balance">
            {t.heroHeadline}
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-xl text-muted max-w-2xl font-normal leading-relaxed">
            {t.heroSubheadline}
          </p>

          {/* Search Module - Clean, warm, non-corporate */}
          <div className="pt-2 sm:pt-4">
            <form
              onSubmit={handleSearch}
              className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-full border border-border shadow-lg shadow-charcoal/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
            >
              {/* Destination Input */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-1">
                <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                <div className="flex-1">
                  <label htmlFor="hero-destination-input" className="block text-[10px] uppercase font-bold tracking-wider text-muted">
                    Destination
                  </label>
                  <input
                    id="hero-destination-input"
                    type="text"
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                    placeholder="Marrakech, Seville, Paris, Essaouira..."
                    className="w-full text-sm font-medium text-charcoal placeholder:text-muted/60 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-border" />

              {/* Category Selector */}
              <div className="sm:w-48 px-3 py-2 sm:py-1">
                <label htmlFor="hero-category-select" className="block text-[10px] uppercase font-bold tracking-wider text-muted">
                  Vibe & Theme
                </label>
                <select
                  id="hero-category-select"
                  value={categoryQuery}
                  onChange={(e) => setCategoryQuery(e.target.value)}
                  className="w-full text-sm font-medium text-charcoal bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Experience</option>
                  <option value="craft">Artisan Craft</option>
                  <option value="culinary">Culinary & Earth</option>
                  <option value="after-dark">After Dark & Music</option>
                  <option value="ocean">Ocean & Nature</option>
                  <option value="wellness">Slow Down</option>
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-hover text-white px-6 py-3 rounded-xl sm:rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchButton}</span>
              </button>
            </form>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-4 text-xs">
              <span className="text-muted font-medium text-[11px] uppercase tracking-wider">
                Popular:
              </span>
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => {
                    if (pill.query) setDestinationQuery(pill.query);
                    if (pill.category) setCategoryQuery(pill.category);
                    const params = new URLSearchParams();
                    if (pill.query) params.set("q", pill.query);
                    if (pill.category) params.set("category", pill.category);
                    router.push(`/discover?${params.toString()}`);
                  }}
                  className="px-3 py-1 rounded-full bg-white/70 hover:bg-white border border-border text-charcoal hover:text-terracotta transition font-medium"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
