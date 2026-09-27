import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supplyRegistry } from "@/lib/adapters/SupplyRegistry";
import { BookingWidget } from "@/components/BookingWidget";
import { ExperienceDetailClient } from "./ExperienceDetailClient";
import { ExperienceCard } from "@/components/ExperienceCard";
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
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const experience = await supplyRegistry.getExperience(slug);

  if (!experience) {
    return { title: "Experience Not Found" };
  }

  return {
    title: `${experience.title} — ${experience.destination.name}`,
    description: experience.shortHeadline,
    openGraph: {
      title: `${experience.title} | Purience`,
      description: experience.shortHeadline,
      images: [experience.images[0]?.url || ""],
    },
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const experience = await supplyRegistry.getExperience(slug);

  if (!experience) {
    notFound();
  }

  const all = await supplyRegistry.getAllExperiences();
  const similarExperiences = all
    .filter((e) => e.id !== experience.id && (e.destination.slug === experience.destination.slug || e.category === experience.category))
    .slice(0, 3);

  const heroImage = experience.images[0];
  const secondaryImages = experience.images.slice(1);

  return (
    <div className="pb-24 pt-6">
      {/* Back link & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-terracotta transition">Home</Link>
          <span>/</span>
          <Link href={`/destinations/${experience.destination.slug}`} className="hover:text-terracotta transition">
            {experience.destination.name}
          </Link>
          <span>/</span>
          <span className="text-charcoal font-medium truncate max-w-xs">{experience.title}</span>
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
                {experience.categoryLabel}
              </span>
              <span className="text-xs text-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                {experience.destination.name}, {experience.destination.country}
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-charcoal tracking-tight leading-tight">
              {experience.title}
            </h1>

            {/* Editorial Positioning Hook */}
            <p className="font-serif italic text-lg sm:text-xl text-clay font-normal leading-relaxed">
              &ldquo;{experience.shortHeadline}&rdquo;
            </p>

            {/* Quick Specs */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-charcoal">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-terracotta" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-terracotta" />
                <span>Max {experience.maxGuests} guests ({experience.groupType})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-terracotta" />
                <span>Offered in {experience.languages.join(", ")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold">{experience.rating.score.toFixed(2)}</span>
                <span className="text-muted">({experience.rating.verifiedCount} verified reviews)</span>
              </div>
            </div>
          </div>

          {/* Interactive Save & Share Buttons */}
          <ExperienceDetailClient experience={experience} />
        </div>

        {/* Cinematic Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 rounded-3xl overflow-hidden bg-sand/20 border border-border">
          <div className="md:col-span-2 relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
            {secondaryImages.slice(0, 2).map((img, i) => (
              <div key={i} className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.alt}
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
                The Purience View
              </span>
              <p className="text-sm sm:text-base text-charcoal font-light leading-relaxed">
                {experience.editorialPositioning}
              </p>
            </div>

            {/* Why You'll Love It */}
            <div className="space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                Why you&apos;ll love it
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experience.whyYoullLoveIt.map((item, idx) => (
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
                The experience
              </h2>
              <div className="prose prose-stone text-sm sm:text-base leading-relaxed text-charcoal/90">
                <p>{experience.description}</p>
              </div>
            </div>

            {/* What You'll Do - Timeline */}
            <div className="space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-charcoal">
                What you&apos;ll do
              </h2>
              <div className="space-y-6 relative pl-4 border-l-2 border-border">
                {experience.whatYoullDo.map((step, idx) => (
                  <div key={idx} className="relative space-y-1.5">
                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-terracotta border-2 border-ivory" />
                    <span className="text-[10px] font-bold text-terracotta tracking-wider uppercase">
                      Step {step.step}
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
                Who you&apos;ll meet
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
                        <span>Verified Host</span>
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
                  What&apos;s Included
                </h4>
                <ul className="space-y-2">
                  {experience.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-charcoal">
                      <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-charcoal">
                  What&apos;s Not Included
                </h4>
                <ul className="space-y-2">
                  {experience.notIncluded.map((item, i) => (
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
                Meeting Point
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
                      Coordinates: {experience.meetingPoint.lat.toFixed(4)}, {experience.meetingPoint.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="p-5 rounded-2xl bg-white border border-border space-y-2 text-xs text-charcoal">
              <div className="font-semibold text-terracotta uppercase tracking-wider text-[10px]">
                Cancellation Policy
              </div>
              <p className="text-muted leading-relaxed">
                {experience.cancellationPolicy}
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
                  Continuations
                </span>
                <h3 className="font-editorial text-3xl font-bold text-charcoal">
                  You might also love.
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
    </div>
  );
}
