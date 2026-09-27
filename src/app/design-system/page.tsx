"use client";

import React, { useState } from "react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";
import {
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "components" | "cards">("colors");

  const sampleExperience = CANONICAL_EXPERIENCES[0];

  const colorTokens = [
    { name: "Warm Ivory", hex: "#F7F4EE", role: "Primary Canvas Background (Editorial)" },
    { name: "Deep Charcoal", hex: "#191918", role: "Brand Dark & Primary Typography" },
    { name: "Burnt Terracotta", hex: "#C65D3A", role: "Signature Accent & Primary CTAs" },
    { name: "Desert Clay", hex: "#A96F52", role: "Secondary Earth & Editorial Subtitles" },
    { name: "Sand Surface", hex: "#E9E0D2", role: "Subtle Sections & Filter Pills" },
    { name: "Natural Green", hex: "#40584A", role: "Verified Badges & Nature Accents" },
    { name: "Pure White", hex: "#FFFFFF", role: "Elevated Cards & Containers" },
    { name: "Muted Text", hex: "#6D6A64", role: "Secondary Microcopy & Captions" },
    { name: "Borders", hex: "#DED8CF", role: "Fine Dividing Lines & Structural Outlines" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Purience Design System v1.0</span>
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-charcoal">
          Pure + Experience Design Tokens
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Purience avoids the stereotypical startup SaaS palette (no purple gradients, no glassmorphism, no electric blue). We combine warm ivory, deep charcoal, and burnt terracotta with generous whitespace and human action photography.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border gap-6 text-sm font-semibold">
        {(["colors", "typography", "components", "cards"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition cursor-pointer ${
              activeTab === tab
                ? "text-terracotta border-b-2 border-terracotta"
                : "text-muted hover:text-charcoal"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 1. COLOR TOKENS */}
      {activeTab === "colors" && (
        <section className="space-y-6">
          <h2 className="font-editorial text-2xl font-bold text-charcoal">
            Restrained Editorial Palette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorTokens.map((c) => (
              <div
                key={c.hex}
                className="p-5 rounded-2xl bg-white border border-border flex items-center gap-4 shadow-sm"
              >
                <div
                  className="w-16 h-16 rounded-xl border border-black/10 shrink-0 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-charcoal">{c.name}</h4>
                  <div className="font-mono text-xs text-terracotta">{c.hex}</div>
                  <div className="text-[11px] text-muted leading-tight">{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. TYPOGRAPHY */}
      {activeTab === "typography" && (
        <section className="space-y-8 bg-white p-8 rounded-3xl border border-border">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-terracotta tracking-wider">
              Editorial Serif (Playfair Display)
            </span>
            <div className="font-editorial text-5xl font-bold text-charcoal">
              Find something worth experiencing.
            </div>
            <div className="font-editorial text-3xl font-normal italic text-clay">
              &ldquo;The Marrakech we would show a friend.&rdquo;
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-border">
            <span className="text-xs uppercase font-bold text-terracotta tracking-wider">
              Modern Body Sans (Plus Jakarta Sans)
            </span>
            <p className="font-sans text-base text-charcoal leading-relaxed max-w-2xl">
              Purience is a consumer-first discovery and booking platform for experiences. We help people answer what is actually worth experiencing, rather than merely what tours are available.
            </p>
            <p className="font-sans text-xs text-muted">
              Microcopy & Specifications • 12px / 16px • Tracking 0.05em
            </p>
          </div>
        </section>
      )}

      {/* 3. BUTTONS & CHIPS & BADGES */}
      {activeTab === "components" && (
        <section className="space-y-8">
          {/* Buttons */}
          <div className="bg-white p-6 rounded-3xl border border-border space-y-4">
            <h3 className="font-editorial text-xl font-bold text-charcoal">Button Hierarchy</h3>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded-full bg-terracotta text-white font-medium text-xs hover:bg-terracotta-hover transition shadow-sm">
                Primary CTA (Burnt Terracotta)
              </button>
              <button className="px-6 py-3 rounded-full bg-charcoal text-ivory font-medium text-xs hover:bg-charcoal-muted transition">
                Secondary Dark (Deep Charcoal)
              </button>
              <button className="px-6 py-3 rounded-full border border-border bg-white text-charcoal font-medium text-xs hover:bg-sand/30 transition">
                Outline Standard
              </button>
              <button className="px-4 py-2 rounded-full bg-forest text-white font-medium text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Action</span>
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white p-6 rounded-3xl border border-border space-y-4">
            <h3 className="font-editorial text-xl font-bold text-charcoal">Editorial Badges</h3>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-charcoal text-ivory">
                Purience Pick
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-terracotta text-white">
                Rare Find
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand text-charcoal">
                Limited
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-forest-light text-forest">
                Private Masterclass
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 4. EXPERIENCE CARD PREVIEW */}
      {activeTab === "cards" && (
        <section className="space-y-6">
          <h2 className="font-editorial text-2xl font-bold text-charcoal">
            Canonical Experience Card
          </h2>
          <div className="max-w-sm">
            <ExperienceCard experience={sampleExperience} />
          </div>
        </section>
      )}
    </div>
  );
}
