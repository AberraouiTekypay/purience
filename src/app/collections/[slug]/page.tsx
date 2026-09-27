import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { COLLECTIONS } from "@/data/collections";
import { supplyRegistry } from "@/lib/adapters/SupplyRegistry";
import { ExperienceCard } from "@/components/ExperienceCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.title} — Purience Collection`,
    description: collection.subtitle,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const all = await supplyRegistry.getAllExperiences();
  const experiences = all.filter((e) => collection.experienceIds.includes(e.id));

  return (
    <div className="pb-24 space-y-16">
      {/* Hero */}
      <section className="relative aspect-[21/9] min-h-[380px] bg-charcoal flex flex-col justify-end text-ivory overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sand">
            <span>Editorial Collection</span>
            <span>•</span>
            <span>Curated by {collection.curator}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white tracking-tight">
            {collection.title}
          </h1>

          <p className="text-base sm:text-lg text-ivory/90 max-w-2xl font-light leading-relaxed">
            {collection.subtitle}
          </p>
        </div>
      </section>

      {/* Curator Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sand/30 rounded-3xl p-8 sm:p-12 border border-border space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            Curator&apos;s Manifesto
          </span>
          <p className="text-base sm:text-lg text-charcoal italic border-l-2 border-terracotta pl-4 leading-relaxed font-light">
            &ldquo;{collection.editorialNote}&rdquo;
          </p>
        </div>
      </section>

      {/* Included Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
              Assembled Experiences
            </span>
            <h2 className="font-editorial text-3xl font-bold text-charcoal">
              Included in this collection.
            </h2>
          </div>
          <span className="text-xs text-muted font-medium">
            {experiences.length} experiences
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>
    </div>
  );
}
