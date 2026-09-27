import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DESTINATIONS } from "@/data/destinations";
import { supplyRegistry } from "@/lib/adapters/SupplyRegistry";
import { ExperienceCard } from "@/components/ExperienceCard";
import { MapPin } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const destination = DESTINATIONS[slug];
  if (!destination) return { title: "Destination Not Found" };

  return {
    title: `${destination.name}, ${destination.country} — Curated Experiences`,
    description: destination.editorialIntro,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = DESTINATIONS[slug];

  if (!destination) {
    notFound();
  }

  const all = await supplyRegistry.getAllExperiences();
  const destinationExperiences = all.filter((exp) => exp.destination.slug === slug);

  return (
    <div className="pb-24 space-y-16">
      {/* Editorial Destination Hero */}
      <section className="relative aspect-[21/9] min-h-[420px] bg-charcoal flex flex-col justify-end text-ivory overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sand">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span>{destination.country}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            {destination.name}
          </h1>

          <p className="text-base sm:text-lg text-ivory/90 max-w-2xl font-light leading-relaxed">
            {destination.editorialIntro}
          </p>
        </div>
      </section>

      {/* Editorial Essay & Insider Quote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand/30 rounded-3xl p-8 sm:p-12 border border-border space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            Insider Perspective
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal">
            The {destination.name} we would show a friend.
          </h2>
          <blockquote className="text-base sm:text-lg text-charcoal italic border-l-2 border-terracotta pl-4 leading-relaxed font-light">
            &ldquo;{destination.curatorQuote}&rdquo;
          </blockquote>

          {/* Popular Areas / Neighborhoods */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-charcoal mr-2 uppercase tracking-wider text-[10px]">
              Key Neighborhoods:
            </span>
            {destination.popularAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-full bg-white border border-border/80 text-charcoal font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Experiences in Destination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
              Verified Experiences
            </span>
            <h2 className="font-editorial text-3xl font-bold text-charcoal">
              Things worth doing in {destination.name}.
            </h2>
          </div>
          <span className="text-xs text-muted font-medium">
            {destinationExperiences.length} experiences curated
          </span>
        </div>

        {destinationExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {destinationExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-border space-y-3">
            <p className="text-sm text-muted">
              We are actively vetting new independent guild artisans in {destination.name}.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
