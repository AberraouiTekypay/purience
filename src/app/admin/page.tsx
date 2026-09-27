"use client";

import React, { useState } from "react";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";
import {
  ShieldCheck,
  Database,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {
  const [experiences, setExperiences] = useState(CANONICAL_EXPERIENCES);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const toggleBadge = (id: string) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === id) {
          const nextBadge = exp.badge === "Purience Pick" ? "Rare Find" : "Purience Pick";
          return { ...exp, badge: nextBadge };
        }
        return exp;
      })
    );
    setStatusMessage(`Updated editorial badge for experience ${id}`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            Internal Curatorial Operations
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
            Purience Merchandising & Supply Console
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest-light text-forest text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Multi-Supply Connected</span>
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-forest-light text-forest text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 1. Supply Adapters Health & Architecture Inspection */}
      <section className="bg-white p-6 sm:p-7 rounded-3xl border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-terracotta" />
            <h2 className="font-editorial text-xl font-bold text-charcoal">
              Active Supply Adapters
            </h2>
          </div>
          <span className="text-xs text-muted">
            Separation of Concerns: Purience Core ↔ Adapters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Curience Adapter */}
          <div className="p-5 rounded-2xl bg-sand/20 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-charcoal">CurienceExperienceAdapter</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-forest-light text-forest">
                Operational
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Consumes external Curience Partner API v1. Normalizes upstream items into Canonical Purience Experience objects (`PUR_EXP_...`).
            </p>
            <div className="text-[11px] font-mono text-charcoal/80 pt-1">
              Internal Mapping active: 5 Curience inventory references
            </div>
          </div>

          {/* Purience Direct Adapter */}
          <div className="p-5 rounded-2xl bg-sand/20 border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-charcoal">PurienceDirectAdapter</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-terracotta-light text-terracotta">
                Direct Guild
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Manages direct artisan collaborations (Amina Saffron Harvest, Camille Paris Natural Wine). Prepares independent inventory growth.
            </p>
            <div className="text-[11px] font-mono text-charcoal/80 pt-1">
              Internal Mapping active: 2 Direct exclusives
            </div>
          </div>
        </div>
      </section>

      {/* 2. Experience Merchandising Table */}
      <section className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm space-y-4 p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-terracotta" />
            <h2 className="font-editorial text-xl font-bold text-charcoal">
              Discovery Merchandising
            </h2>
          </div>
          <span className="text-xs text-muted">
            Boost quality without commercial distortion
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border text-[11px] uppercase tracking-wider text-muted">
              <tr>
                <th className="py-3 px-2">Canonical ID</th>
                <th className="py-3 px-2">Title</th>
                <th className="py-3 px-2">Destination</th>
                <th className="py-3 px-2">Supply Source</th>
                <th className="py-3 px-2">Current Badge</th>
                <th className="py-3 px-2 text-right">Editorial Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-charcoal">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-sand/10 transition">
                  <td className="py-3.5 px-2 font-mono font-medium">{exp.id}</td>
                  <td className="py-3.5 px-2 font-medium max-w-xs truncate">{exp.title}</td>
                  <td className="py-3.5 px-2">{exp.destination.name}</td>
                  <td className="py-3.5 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sand/40">
                      {exp.source.provider}
                    </span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-charcoal text-white">
                      {exp.badge || "Standard"}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <button
                      onClick={() => toggleBadge(exp.id)}
                      className="px-3 py-1 rounded-full border border-border hover:border-terracotta text-terracotta font-medium transition cursor-pointer"
                    >
                      Cycle Badge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
