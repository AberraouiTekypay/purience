"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PurienceExperience } from "@/types";
import { useLocale } from "@/context/LocaleContext";
import { useWishlist } from "@/context/WishlistContext";
import { Bookmark, Star, Clock, MapPin, Sparkles } from "lucide-react";

interface ExperienceCardProps {
  experience: PurienceExperience;
  aspectRatio?: "portrait" | "standard" | "wide";
  priority?: boolean;
}

export function ExperienceCard({
  experience,
  aspectRatio = "portrait",
  priority = false,
}: ExperienceCardProps) {
  const { formatCurrency, language } = useLocale();
  const { isSaved, toggleSave } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const saved = isSaved(experience.id);
  const heroImage = experience.images.find((img) => img.isHero) || experience.images[0];

  const ratioClass = {
    portrait: "aspect-[4/5]",
    standard: "aspect-[3/2]",
    wide: "aspect-[16/10]",
  }[aspectRatio];

  const displayTitle = language === "fr" && experience.titleFr ? experience.titleFr : experience.title;
  const displayHeadline = language === "fr" && experience.shortHeadlineFr ? experience.shortHeadlineFr : experience.shortHeadline;
  const displayCategory = language === "fr" && experience.categoryLabelFr ? experience.categoryLabelFr : experience.categoryLabel;
  const displayDuration = language === "fr" && experience.durationFr ? experience.durationFr : experience.duration;
  const fromPrefix = language === "fr" ? "dès" : "from";

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border/60 hover:border-terracotta/40 hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className={`relative w-full ${ratioClass} overflow-hidden bg-sand/40`}>
        <Link href={`/experiences/${experience.slug}`} className="block w-full h-full">
          {!imageError ? (
            <Image
              src={heroImage.url}
              alt={heroImage.alt || displayTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              onError={() => setImageError(true)}
              className="object-cover img-zoom-hover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-sand/60 text-charcoal/60 p-4 text-center">
              <Sparkles className="w-8 h-8 text-terracotta mb-2" />
              <span className="font-editorial text-sm font-semibold">{displayTitle}</span>
            </div>
          )}
        </Link>

        {/* Subtle Badge */}
        {experience.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-charcoal/85 backdrop-blur-md text-ivory border border-white/10 shadow-sm">
              {experience.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(experience.id, displayTitle);
          }}
          className={`absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 active:scale-90 ${
            saved
              ? "bg-terracotta text-white shadow-md"
              : "bg-charcoal/40 text-white hover:bg-charcoal/70"
          }`}
          aria-label={saved ? "Remove from saved" : "Save experience"}
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-white" : ""}`} />
        </button>

        {/* Category Pill Over Image Bottom */}
        <div className="absolute bottom-3 left-3.5 pointer-events-none">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-ivory/90 text-charcoal backdrop-blur-sm">
            {displayCategory}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Destination & Duration info */}
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1 font-medium text-charcoal">
              <MapPin className="w-3 h-3 text-terracotta" />
              {experience.destination.name}, {experience.destination.country}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted" />
              {displayDuration}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-charcoal leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
            <Link href={`/experiences/${experience.slug}`}>{displayTitle}</Link>
          </h3>

          {/* Short Editorial Hook */}
          <p className="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
            {displayHeadline}
          </p>
        </div>

        {/* Card Footer: Rating & Pricing */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
          {/* Genuine Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-charcoal">{experience.rating.score.toFixed(2)}</span>
            <span className="text-muted">({experience.rating.verifiedCount})</span>
          </div>

          {/* Formatted Price */}
          <div className="text-right">
            <span className="text-[11px] text-muted mr-1">{fromPrefix}</span>
            <span className="font-sans font-bold text-base text-charcoal">
              {formatCurrency(experience.basePriceEUR)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
