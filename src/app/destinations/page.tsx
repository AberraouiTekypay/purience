import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DESTINATIONS } from "@/data/destinations";
import { LocalizedText } from "@/components/LocalizedText";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Curated Hubs & Destinations",
  description: "Explore Purience destination guides curated through the eyes of local artisans and cultural insiders.",
};

export default function DestinationsIndexPage() {
  const destinationsList = Object.values(DESTINATIONS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <LocalizedText
            en="Curated Geography"
            fr="Géographie Choisie"
          />
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal">
          <LocalizedText
            en="Destinations to feel."
            fr="Des destinations à ressentir."
          />
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          <LocalizedText
            en="We don't catalog the entire globe indiscriminately. We focus on places where craft traditions, deep culinary terroir, and atmospheric human encounters reward the unhurried traveler."
            fr="Nous ne cataloguons pas le monde entier sans discernement. Nous nous concentrons sur les lieux où les traditions artisanales, le terroir culinaire et les rencontres humaines récompensent le voyageur qui prend son temps."
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinationsList.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-sand/40">
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover img-zoom-hover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-charcoal/80 backdrop-blur-md text-white">
                  {dest.country}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-editorial text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted line-clamp-3 leading-relaxed">
                  {dest.editorialIntro}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-charcoal group-hover:text-terracotta">
                <span>
                  <LocalizedText
                    en={`View ${dest.name} curation`}
                    fr={`Explorer la sélection ${dest.name}`}
                  />
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
