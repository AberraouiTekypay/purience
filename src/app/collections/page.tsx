import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS } from "@/data/collections";
import { LocalizedText } from "@/components/LocalizedText";
import { ArrowRight, Layers } from "lucide-react";

export const metadata = {
  title: "Editorial Collections | Purience",
  description: "Curated playlists of extraordinary moments, assembled around mood, rhythm, and human connection.",
};

export default function CollectionsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <LocalizedText
            en="Curated Playlists"
            fr="Parcours Thématiques"
          />
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal">
          <LocalizedText
            en="Editorial Collections."
            fr="Collections Éditoriales."
          />
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          <LocalizedText
            en="Rather than searching through endless disparate tours, explore cohesive sequences of experiences curated around emotional themes, early mornings, and shared unhurried moments."
            fr="Plutôt que de chercher parmi d'innombrables excursions disparates, explorez des séquences cohérentes d'expériences conçues autour d'émotions partagées et de moments suspendus."
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-sand/40">
              <Image
                src={col.coverImage}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover img-zoom-hover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-charcoal/80 backdrop-blur-md text-white">
                  {col.experienceIds.length}{" "}
                  <LocalizedText en="experiences" fr="expériences" />
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
                  <LocalizedText
                    en={`Curated by ${col.curator}`}
                    fr={`Sélectionné par ${col.curator}`}
                  />
                </span>
                <h3 className="font-editorial text-2xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {col.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-charcoal group-hover:text-terracotta">
                <span>
                  <LocalizedText
                    en="Explore Collection"
                    fr="Découvrir la collection"
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
