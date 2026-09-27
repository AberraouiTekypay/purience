"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export function Footer() {

  return (
    <footer className="bg-charcoal text-ivory/80 pt-16 pb-12 border-t border-charcoal-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-editorial text-3xl font-bold tracking-tight text-white hover:text-terracotta transition-colors">
                PURIENCE
              </span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-ivory/50 font-medium mt-0.5">
                Pure + Experience
              </span>
            </Link>
            <p className="text-sm text-ivory/70 max-w-sm leading-relaxed">
              We help curious travelers answer: <em className="text-white font-medium">What is actually worth experiencing?</em> We curate authentic workshops, deep sky desert nights, and intimate cultural encounters that cannot be replicated.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-ivory/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>Verified Independent Supply</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-terracotta" />
                <span>Zero Fabricated Signals</span>
              </div>
            </div>
          </div>

          {/* Destinations Column */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
              Curated Hubs
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link href="/destinations/marrakech" className="hover:text-terracotta transition">
                  Marrakech, Morocco
                </Link>
              </li>
              <li>
                <Link href="/destinations/seville" className="hover:text-terracotta transition">
                  Seville, Spain
                </Link>
              </li>
              <li>
                <Link href="/destinations/paris" className="hover:text-terracotta transition">
                  Paris, France
                </Link>
              </li>
              <li>
                <Link href="/destinations/essaouira" className="hover:text-terracotta transition">
                  Essaouira, Morocco
                </Link>
              </li>
              <li>
                <Link href="/destinations/barcelona" className="hover:text-terracotta transition">
                  Barcelona, Spain
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial Collections Column */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
              Editorial Series
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link href="/collections/learn-from-someone-local" className="hover:text-terracotta transition">
                  Learn From Someone Local
                </Link>
              </li>
              <li>
                <Link href="/collections/marrakech-after-dark" className="hover:text-terracotta transition">
                  Marrakech After Dark
                </Link>
              </li>
              <li>
                <Link href="/collections/48-hours-in-marrakech" className="hover:text-terracotta transition">
                  48 Hours in Marrakech
                </Link>
              </li>
              <li>
                <Link href="/collections/worth-waking-up-early-for" className="hover:text-terracotta transition">
                  Worth Waking Up Early For
                </Link>
              </li>
              <li>
                <Link href="/collections/for-two-unhurried-moments" className="hover:text-terracotta transition">
                  For Two
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Transparency Column */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-white">
              Platform & Architecture
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link href="/discover" className="hover:text-terracotta transition">
                  Discovery Feed
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-terracotta transition">
                  Design System Showcase
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-terracotta transition">
                  Supply & Merchandising
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-terracotta transition">
                  Saved Collections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Required EM300.co Company link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Purience Inc.</span>
            <span>•</span>
            {/* Critical requirement: An EM300.co Company link */}
            <span>
              An{" "}
              <a
                href="https://em300.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory font-semibold underline decoration-terracotta underline-offset-4 hover:text-terracotta transition"
              >
                EM300.co
              </a>{" "}
              Company
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-ivory/40">
              Global Multi-Supply Architecture • Canonical Experience Protocol
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
