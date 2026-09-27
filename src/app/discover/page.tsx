"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";
import { DESTINATIONS } from "@/data/destinations";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useLocale } from "@/context/LocaleContext";
import {
  Compass,
  Search,
  RotateCcw,
  Sparkles,
  MapPin,
  X,
} from "lucide-react";

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";
  const initialBadge = searchParams.get("badge") || "all";

  const { formatCurrency, language } = useLocale();
  const isFr = language === "fr";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [selectedGroupType, setSelectedGroupType] = useState<string>("all");
  const [maxPriceEUR, setMaxPriceEUR] = useState<number>(200);

  const categories: Array<{ id: string; label: string }> = isFr
    ? [
        { id: "all", label: "Tous les thèmes" },
        { id: "craft", label: "Artisanat d'art" },
        { id: "culinary", label: "Terroir & Gastronomie" },
        { id: "after-dark", label: "Nuit & Musique" },
        { id: "ocean", label: "Océan & Littoral" },
      ]
    : [
        { id: "all", label: "All Themes" },
        { id: "craft", label: "Artisan Craft" },
        { id: "culinary", label: "Culinary & Earth" },
        { id: "after-dark", label: "After Dark & Music" },
        { id: "ocean", label: "Ocean & Coastal" },
      ];

  const destinationsList = Object.values(DESTINATIONS);

  const filteredExperiences = useMemo(() => {
    return CANONICAL_EXPERIENCES.filter((exp) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = exp.title.toLowerCase().includes(q) || (exp.titleFr && exp.titleFr.toLowerCase().includes(q));
        const matchesDest = exp.destination.name.toLowerCase().includes(q) || exp.destination.country.toLowerCase().includes(q);
        const matchesCategory = exp.categoryLabel.toLowerCase().includes(q) || (exp.categoryLabelFr && exp.categoryLabelFr.toLowerCase().includes(q));
        const matchesDesc = exp.shortHeadline.toLowerCase().includes(q) || (exp.shortHeadlineFr && exp.shortHeadlineFr.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDest && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && exp.category !== selectedCategory) {
        return false;
      }

      // Destination filter
      if (selectedDestination !== "all" && exp.destination.slug !== selectedDestination) {
        return false;
      }

      // Group type
      if (selectedGroupType !== "all" && exp.groupType !== selectedGroupType) {
        return false;
      }

      // Price
      if (exp.basePriceEUR > maxPriceEUR) {
        return false;
      }

      // Badge filter if present
      if (initialBadge === "pick" && exp.badge !== "Purience Pick" && exp.badge !== "Rare Find") {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedDestination,
    selectedGroupType,
    maxPriceEUR,
    initialBadge,
  ]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedDestination !== "all" ||
    selectedGroupType !== "all" ||
    maxPriceEUR < 200;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDestination("all");
    setSelectedGroupType("all");
    setMaxPriceEUR(200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta">
          <Compass className="w-3.5 h-3.5" />
          <span>{isFr ? "Sélection Découverte" : "Curated Discovery Feed"}</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal tracking-tight">
          {isFr ? "Qu'est-ce qui vaut vraiment la peine d'être vécu ?" : "What is actually worth experiencing?"}
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl">
          {isFr
            ? "Explorez des expériences indépendantes sélectionnées avec soin en Europe et en Afrique du Nord."
            : "Browse vetted independent experiences across Europe and North Africa, filtered by what moves you."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-border shadow-sm space-y-4">
        {/* Top row: search + destination dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFr ? "Rechercher une expérience, artisanat, tradition..." : "Search experiences, keywords, traditions..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/80 bg-sand/20 text-sm font-medium focus:outline-none focus:border-terracotta transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Destination Dropdown */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-border/80 bg-sand/20 text-sm font-medium focus:outline-none focus:border-terracotta transition cursor-pointer appearance-none"
            >
              <option value="all">{isFr ? "Toutes les destinations" : "All Destinations"}</option>
              {destinationsList.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}, {d.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
          <span className="text-xs uppercase font-bold tracking-wider text-muted mr-1">
            {isFr ? "Thème :" : "Category:"}
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-terracotta text-white shadow-sm"
                  : "bg-sand/40 hover:bg-sand text-charcoal border border-border/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bottom controls: Price slider and Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-border/40 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-medium text-charcoal">
              {isFr ? "Prix max : " : "Max Price: "}
              <strong className="text-terracotta font-semibold font-sans">
                {formatCurrency(maxPriceEUR)}
              </strong>
            </span>
            <input
              type="range"
              min={50}
              max={250}
              step={10}
              value={maxPriceEUR}
              onChange={(e) => setMaxPriceEUR(Number(e.target.value))}
              className="accent-terracotta w-36 sm:w-48 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted font-medium">
              {isFr ? (
                <>
                  Affichage de{" "}
                  <strong className="text-charcoal font-semibold">
                    {filteredExperiences.length}
                  </strong>{" "}
                  expériences sélectionnées
                </>
              ) : (
                <>
                  Showing{" "}
                  <strong className="text-charcoal font-semibold">
                    {filteredExperiences.length}
                  </strong>{" "}
                  vetted experiences
                </>
              )}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-terracotta hover:underline font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isFr ? "Réinitialiser" : "Reset Filters"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredExperiences.map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} priority={idx < 3} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-border space-y-4 max-w-xl mx-auto my-8">
          <Sparkles className="w-8 h-8 text-terracotta mx-auto" />
          <h3 className="font-editorial text-2xl font-bold text-charcoal">
            {isFr
              ? "Aucune expérience ne correspond à cette combinaison."
              : "No experiences match this exact combination."}
          </h3>
          <p className="text-sm text-muted">
            {isFr
              ? "Nous appliquons une sélection stricte plutôt que de proposer des circuits touristiques génériques. Essayez d'ajuster votre budget ou vos critères."
              : "We intentionally maintain a tight, uncompromising standard rather than filling results with generic tours. Try loosening your price or theme filters."}
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-full bg-charcoal text-ivory text-xs font-semibold hover:bg-terracotta transition cursor-pointer"
          >
            {isFr ? "Réinitialiser les filtres" : "Reset all filters"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-muted">Loading curated experiences...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
