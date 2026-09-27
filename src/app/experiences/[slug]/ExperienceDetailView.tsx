"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PurienceExperience } from "@/types";
import { useLocale } from "@/context/LocaleContext";
import { useWishlist } from "@/context/WishlistContext";
import { BookingWidget } from "@/components/BookingWidget";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ShareModal } from "@/components/ShareModal";
import {
  MapPin,
  Clock,
  Users,
  Globe2,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  Navigation,
  Bookmark,
  Share2,
} from "lucide-react";

interface ExperienceDetailViewProps {
  experience: PurienceExperience;
  similarExperiences: PurienceExperience[];
}

export function ExperienceDetailView({
  experience,
  similarExperiences,
}: ExperienceDetailViewProps) {
  const { language } = useLocale();
  const { isSaved, toggleSave } = useWishlist();
  const [shareOpen, setShareOpen] = useState(false);
  const [heroImgSrc, setHeroImgSrc] = useState(experience.images[0]?.url || "");

  const isFr = language === "fr";
  const saved = isSaved(experience.id);

  // Localized fields
  const title = (isFr && experience.titleFr) ? experience.titleFr : experience.title;
  const shortHeadline = (isFr && experience.shortHeadlineFr) ? experience.shortHeadlineFr : experience.shortHeadline;
  const editorialPositioning = (isFr && experience.editorialPositioningFr) ? experience.editorialPositioningFr : experience.editorialPositioning;
  const categoryLabel = (isFr && experience.categoryLabelFr) ? experience.categoryLabelFr : experience.categoryLabel;
  const duration = (isFr && experience.durationFr) ? experience.durationFr : experience.duration;
  const groupType = (isFr && experience.groupTypeFr) ? experience.groupTypeFr : experience.groupType;
  const description = (isFr && experience.descriptionFr) ? experience.descriptionFr : experience.description;
  const whyYoullLoveIt = (isFr && experience.whyYoullLoveItFr) ? experience.whyYoullLoveItFr : experience.whyYoullLoveIt;
  const included = (isFr && experience.includedFr) ? experience.includedFr : experience.included;
  const notIncluded = (isFr && experience.notIncludedFr) ? experience.notIncludedFr : experience.notIncluded;
  const cancellationPolicy = (isFr && experience.cancellationPolicyFr) ? experience.cancellationPolicyFr : experience.cancellationPolicy;

  const heroImage = experience.images[0];
  const secondaryImages = experience.images.slice(1);

  return (
    <div className="pb-24 pt-6">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-terracotta transition">
            {isFr ? "Accueil" : "Home"}
          </Link>
          <span>/</span>
          <Link
            href={`/destinations/${experience.destination.slug}`}
            className="hover:text-terracotta transition"
          >
            {experience.destination.name}
          </Link>
          <span>/</span>
          <span className="text-charcoal font-medium truncate max-w-xs">
            {title}
          </span>
        </div>
      </div>

      {/* Main Experience Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header with Client Share/Save Controls */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {experience.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-charcoal text-ivory">
                  {experience.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand text-charcoal">
                {categoryLabel}
              </span>
              <span className="text-xs text-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                {experience.destination.name}, {experience.destination.country}
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-charcoal tracking-tight leading-tight">
              {title}
            </h1>

            {/* Editorial Positioning Hook */}
            <p className="font-serif italic text-lg sm:text-xl text-clay font-normal leading-relaxed">
              &ldquo;{shortHeadline}&rdquo;
            </p>

            {/* Quick Specs */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-charcoal">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-terracotta" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-terracotta" />
                <span>
                  {isFr
                    ? `Max ${experience.maxGuests} pers. (${groupType})`
                    : `Max ${experience.maxGuests} guests (${groupType})`}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-terracotta" />
                <span>
                  {isFr
                    ? `Proposé en ${experience.languages.join(", ")}`
                    : `Offered in ${experience.languages.join(", ")}`}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold">{experience.rating.score.toFixed(2)}</span>
                <span className="text-muted">
                  {isFr
                    ? `(${experience.rating.verifiedCount} avis vérifiés)`
                    : `(${experience.rating.verifiedCount} verified reviews)`}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Save & Share Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => toggleSave(experience.id, title)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition cursor-pointer ${
                saved
                  ? "bg-terracotta border-terracotta text-white"
                  : "bg-white border-border text-charcoal hover:border-charcoal"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-white" : ""}`} />
              <span>{saved ? (isFr ? "Enregistré" : "Saved") : (isFr ? "Enregistrer" : "Save")}</span>
            </button>

            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:border-charcoal text-xs font-semibold text-charcoal transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-muted" />
              <span>{isFr ? "Partager" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Cinematic Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 rounded-3xl overflow-hidden bg-sand/20 border border-border">
          <div className="md:col-span-2 relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-sand/30">
            <Image
              src={heroImgSrc}
              alt={heroImage?.alt || title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              onError={() => {
                setHeroImgSrc("https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80");
              }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
            {secondaryImages.slice(0, 2).map((img, i) => (
              <div key={i} className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-sand/30">
                <Image
                  src={img.url}
                  alt={img.alt || title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Content Grid: Details Left, Booking Widget Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Left Column: Editorial Details */}
          <div className="lg:col-span-7 space-y-12">
            {/* Editorial Positioning Callout */}
            <div className="p-6 rounded-2xl bg-sand/40 border border-border/80">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-1">
                {isFr ? "L'Œil Purience" : "The Purience View"}
              </span>
              <p className="text-sm sm:text-base text-charcoal font-light leading-relaxed">
                {editorialPositioning}
              </p>
            </div>

            {/* Why You'll Love It */}
            <div className="space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                {isFr ? "Pourquoi vous allez adorer" : "Why you'll love it"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyYoullLoveIt.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-border/60">
                    <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Experience Description */}
            <div className="space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                {isFr ? "L'expérience" : "The experience"}
              </h2>
              <div className="prose prose-stone text-sm sm:text-base leading-relaxed text-charcoal/90">
                <p>{description}</p>
              </div>
            </div>

            {/* What You'll Do - Timeline */}
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                {isFr ? "Le déroulement" : "What you'll do"}
              </h2>
              <div className="space-y-6 relative pl-4 border-l-2 border-border">
                {experience.whatYoullDo.map((step, idx) => (
                  <div key={idx} className="relative space-y-1.5">
                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-terracotta border-2 border-ivory" />
                    <span className="text-[10px] font-bold text-terracotta tracking-wider uppercase">
                      {isFr ? `Étape ${step.step}` : `Step ${step.step}`}
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-charcoal">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who You'll Meet (Host) */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                {isFr ? "Votre hôte" : "Who you'll meet"}
              </h2>
              <div className="p-6 rounded-2xl bg-white border border-border flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-sand shrink-0 border-2 border-terracotta">
                  <Image
                    src={experience.host.avatar}
                    alt={experience.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-editorial text-lg font-bold text-charcoal">
                      {experience.host.name}
                    </h4>
                    {experience.host.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-forest bg-forest-light px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{isFr ? "Hôte Vérifié" : "Verified Host"}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-terracotta font-medium">
                    {experience.host.title}
                  </p>
                  <p className="text-xs text-muted leading-relaxed pt-1">
                    {experience.host.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="space-y-3">
                <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-charcoal">
                  {isFr ? "Ce qui est inclus" : "What's Included"}
                </h4>
                <ul className="space-y-2">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-charcoal">
                      <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-charcoal">
                  {isFr ? "Non inclus" : "What's Not Included"}
                </h4>
                <ul className="space-y-2">
                  {notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted">
                      <XCircle className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meeting Point & Map info */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                {isFr ? "Point de rendez-vous" : "Meeting Point"}
              </h2>
              <div className="p-5 rounded-2xl bg-sand/30 border border-border space-y-3">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-xs sm:text-sm text-charcoal">
                      {experience.meetingPoint.address}
                    </h5>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      {experience.meetingPoint.description}
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-muted/80">
                      {isFr ? "Coordonnées GPS :" : "Coordinates:"} {experience.meetingPoint.lat.toFixed(4)}, {experience.meetingPoint.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="p-5 rounded-2xl bg-white border border-border space-y-2 text-xs text-charcoal">
              <div className="font-semibold text-terracotta uppercase tracking-wider text-[10px]">
                {isFr ? "Conditions d'annulation" : "Cancellation Policy"}
              </div>
              <p className="text-muted leading-relaxed">
                {cancellationPolicy}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <BookingWidget experience={experience} />
            </div>
          </div>
        </div>

        {/* Similar Experiences Section */}
        {similarExperiences.length > 0 && (
          <div className="pt-16 border-t border-border space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                  {isFr ? "Inspirations similaires" : "Continuations"}
                </span>
                <h3 className="font-editorial text-3xl font-bold text-charcoal">
                  {isFr ? "Vous aimerez aussi." : "You might also love."}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Booking Bar */}
      <BookingWidget experience={experience} isStickyMobile={true} />

      {/* Share Modal */}
      <ShareModal
        experience={experience}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
}
