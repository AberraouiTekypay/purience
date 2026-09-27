"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useLocale } from "@/context/LocaleContext";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Bookmark, Share2, Compass, Check } from "lucide-react";

export default function SavedPage() {
  const { savedIds } = useWishlist();
  const { language } = useLocale();
  const [copied, setCopied] = useState(false);

  const isFr = language === "fr";
  const savedExperiences = CANONICAL_EXPERIENCES.filter((exp) => savedIds.includes(exp.id));

  const copyWishlistLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-8">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 fill-terracotta" />
            <span>{isFr ? "Sélection Personnelle" : "Personal Wishlist"}</span>
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal">
            {isFr ? "Expériences Enregistrées." : "Saved Experiences."}
          </h1>
          <p className="text-sm text-muted">
            {isFr
              ? "Les expériences que vous prévoyez de vivre lorsque le moment et le lieu s'accorderont."
              : "Experiences you intend to live when the time and place align."}
          </p>
        </div>

        {savedExperiences.length > 0 && (
          <button
            onClick={copyWishlistLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-white hover:border-charcoal text-xs font-semibold text-charcoal transition cursor-pointer self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest" />
                <span>{isFr ? "Lien copié" : "Link Copied"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-muted" />
                <span>{isFr ? "Partager cette liste" : "Share this list"}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Grid of Saved Experiences */}
      {savedExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-border max-w-lg mx-auto space-y-5">
          <Bookmark className="w-10 h-10 text-muted/60 mx-auto" />
          <h3 className="font-editorial text-2xl font-bold text-charcoal">
            {isFr ? "Votre sélection est vide." : "Your wishlist is empty."}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {isFr
              ? "Cliquez sur l'icône marque-page de n'importe quelle expérience pour composer votre carnet de voyage avant de réserver."
              : "Click the bookmark icon on any experience to build your personal collection of extraordinary travel moments before booking."}
          </p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold transition"
          >
            <Compass className="w-4 h-4" />
            <span>{isFr ? "Découvrir des expériences" : "Discover Experiences"}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
