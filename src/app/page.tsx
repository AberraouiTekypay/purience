import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceCard } from "@/components/ExperienceCard";
import { supplyRegistry } from "@/lib/adapters/SupplyRegistry";
import { DESTINATIONS } from "@/data/destinations";
import { COLLECTIONS } from "@/data/collections";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Layers,
} from "lucide-react";

export default async function HomePage() {
  const experiences = await supplyRegistry.getAllExperiences();

  // Curated segments
  const worthTravellingFor = experiences.slice(0, 3);
  const puriencePicks = experiences.filter((e) => e.badge === "Purience Pick" || e.badge === "Rare Find");
  const craftExperiences = experiences.filter((e) => e.category === "craft");
  const culinaryExperiences = experiences.filter((e) => e.category === "culinary");
  const afterDarkExperiences = experiences.filter((e) => e.category === "after-dark");
  const marrakechSpotlight = experiences.filter((e) => e.destination.slug === "marrakech");

  const destinationsList = Object.values(DESTINATIONS);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 pb-20">
      {/* Editorial Hero */}
      <HeroSection />

      {/* 1. WORTH TRAVELLING FOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent of Destination</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
              Worth travelling for.
            </h2>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Experiences of such singular craft, intimacy, or place that they alone justify packing a bag.
            </p>
          </div>
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-terracotta group transition"
          >
            <span>Explore all experiences</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {worthTravellingFor.map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} priority={idx === 0} />
          ))}
        </div>
      </section>

      {/* 2. PURIENCE PICKS */}
      <section className="bg-sand/35 py-16 border-y border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>Editorially Selected</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
                Purience Picks
              </h2>
              <p className="text-sm text-muted mt-1 max-w-xl">
                Uncompromising on human quality, strictly limited party sizes, and zero mass-tourism cliches.
              </p>
            </div>
            <Link
              href="/discover?badge=pick"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-terracotta group transition"
            >
              <span>View full curation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {puriencePicks.slice(0, 3).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. DESTINATION SPOTLIGHT: UNEXPECTED MARRAKECH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-charcoal text-ivory p-8 sm:p-12 lg:p-16 border border-charcoal-muted shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-terracotta text-white">
              Curated Destination Spotlight
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              The Marrakech we would show a friend.
            </h2>
            <blockquote className="text-sm sm:text-base text-ivory/80 italic border-l-2 border-terracotta pl-4 leading-relaxed font-light">
              &ldquo;{DESTINATIONS.marrakech.curatorQuote}&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed pt-2">
              Beyond the predictable tourist thoroughfares lies a city of extraordinary craft guilds, quiet shaded courtyards, and ancient sensory traditions that reward the unhurried traveler.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/destinations/marrakech"
                className="px-6 py-3 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-sm font-medium transition inline-flex items-center gap-2"
              >
                <span>Explore Marrakech Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/collections/48-hours-in-marrakech"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition"
              >
                Read: 48 Hours in Marrakech
              </Link>
            </div>
          </div>

          {/* Decorative background image overlay */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <Image
              src={DESTINATIONS.marrakech.heroImage}
              alt="Marrakech rooftops and courtyards"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Featured experiences in Marrakech */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {marrakechSpotlight.slice(0, 3).map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* 4. MAKE SOMETHING WITH YOUR HANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Living Heritage</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
              Make something with your hands.
            </h2>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Step inside historic ateliers, pick up traditional tools, and craft something tactile alongside master artisans.
            </p>
          </div>
          <Link
            href="/discover?category=craft"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-terracotta group transition"
          >
            <span>View craft workshops</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {craftExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* 5. EAT DIFFERENTLY & AFTER DARK */}
      <section className="bg-sand/20 py-16 border-y border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-clay mb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>Terroir & Evening Light</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
                Eat differently & After dark.
              </h2>
              <p className="text-sm text-muted mt-1 max-w-xl">
                Open fire cooking, unamplified flamenco in 17th-century patios, and stargazing across mineral deserts.
              </p>
            </div>
            <Link
              href="/discover?category=culinary"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-terracotta group transition"
            >
              <span>Explore evening & culinary</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...culinaryExperiences, ...afterDarkExperiences].slice(0, 3).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. EDITORIAL COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
              Curated Series
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
              Editorial Collections
            </h2>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Hand-assembled playlists of extraordinary moments, designed to be experienced together.
            </p>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-terracotta group transition"
          >
            <span>All collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.slice(0, 3).map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-charcoal flex flex-col justify-end p-6 border border-border shadow-md hover:shadow-xl transition-all"
            >
              <Image
                src={col.coverImage}
                alt={col.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
                  {col.curatorRole}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-sand transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-ivory/80 line-clamp-2">
                  {col.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. TRENDING DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta">
            Visual Geography
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
            Destinations to feel.
          </h2>
          <p className="text-sm text-muted">
            Cities and coastlines where living culture and authentic craftsmanship remain vibrant.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {destinationsList.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-charcoal flex flex-col justify-end p-4 border border-border/70 hover:shadow-lg transition-all"
            >
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-sand">
                  {dest.country}
                </span>
                <h3 className="font-editorial text-xl font-bold text-white group-hover:text-terracotta transition-colors">
                  {dest.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. PURIENCE PHILOSOPHY MANIFESTO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full text-center py-12 border-t border-border">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-muted">
          Our Standard
        </span>
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal mt-3 mb-4">
          Never mass-tourism. Only genuine human encounters.
        </h3>
        <p className="text-sm sm:text-base text-muted leading-relaxed font-light">
          We reject fabricated reviews, commission-first algorithms, and sterile stadium-style tours. Every Purience experience is vetted for intimacy, emotional resonance, and respect for local host autonomy.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/discover"
            className="px-8 py-3.5 rounded-full bg-charcoal hover:bg-terracotta text-ivory text-sm font-medium transition shadow-md"
          >
            Start Discovering
          </Link>
        </div>
      </section>
    </div>
  );
}
