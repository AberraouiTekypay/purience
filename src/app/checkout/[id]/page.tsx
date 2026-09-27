"use client";

import React, { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";
import { useLocale } from "@/context/LocaleContext";
import { supplyRegistry } from "@/lib/adapters/SupplyRegistry";
import { analytics } from "@/lib/analytics";
import {
  ShieldCheck,
  Calendar,
  Clock,
  Users,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { formatCurrency, currency } = useLocale();

  const expId = params.id as string;
  const date = searchParams.get("date") || "2026-10-01";
  const time = searchParams.get("time") || "09:30";
  const optionId = searchParams.get("optionId") || "opt_standard";
  const guests = parseInt(searchParams.get("guests") || "2", 10);

  const experience = CANONICAL_EXPERIENCES.find((e) => e.id === expId || e.slug === expId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple_pay" | "arrival">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!experience) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-editorial text-3xl font-bold text-charcoal">Experience not found</h2>
        <Link href="/discover" className="text-terracotta underline text-sm">
          Return to discovery feed
        </Link>
      </div>
    );
  }

  const selectedOption = experience.options.find((o) => o.id === optionId);
  const priceModifierEUR = selectedOption?.priceDiffEUR || 0;
  const pricePerPersonEUR = experience.basePriceEUR + priceModifierEUR;
  const totalPriceEUR = pricePerPersonEUR * guests;

  const handleCompleteBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setErrorMsg("Please fill in all traveler contact details.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const bookingRecord = await supplyRegistry.processBooking({
        experienceId: experience.id,
        date,
        time,
        optionId,
        guests,
        currency,
        guestDetails: {
          firstName,
          lastName,
          email,
          phone,
          specialRequests,
        },
      });

      // Save booking in local user booking store
      try {
        const stored = localStorage.getItem("purience_bookings");
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(bookingRecord);
        localStorage.setItem("purience_bookings", JSON.stringify(list));
      } catch {
        // ignore
      }

      analytics.track("booking_completed", {
        bookingRef: bookingRecord.bookingRef,
        experienceId: experience.id,
        experienceTitle: experience.title,
        amountEUR: totalPriceEUR,
        currency,
        sourceProvider: experience.source.provider,
      });

      router.push(`/booking/confirmation/${bookingRecord.bookingRef}`);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Booking could not be finalized.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <Link
          href={`/experiences/${experience.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-charcoal mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to experience</span>
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
          Confirm & Reserve
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Your booking is handled via {experience.source.sourceName}. Guaranteed spot confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Traveler Details & Payment Selection */}
        <form onSubmit={handleCompleteBooking} className="lg:col-span-7 space-y-8">
          {/* 1. Traveler Details */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-border shadow-sm space-y-5">
            <h3 className="font-editorial text-xl font-bold text-charcoal">
              1. Lead Traveler Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Sofia"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-sand/10 text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Alami"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-sand/10 text-sm focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-sand/10 text-sm focus:outline-none focus:border-terracotta"
                />
                <span className="text-[10px] text-muted block mt-1">
                  We&apos;ll send your booking confirmation & host directions here.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Phone (for WhatsApp meeting point)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 612 345 678"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-sand/10 text-sm focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Vegetarian, shoe size for boots, accessibility questions..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-sand/10 text-sm focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-border shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl font-bold text-charcoal">
                2. Guarantee & Payment Method
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-muted">
                <Lock className="w-3.5 h-3.5 text-forest" />
                <span>256-bit Encrypted</span>
              </div>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-terracotta bg-terracotta-light/40 font-semibold"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-terracotta" />
                  <div>
                    <div className="text-xs sm:text-sm text-charcoal">Credit or Debit Card</div>
                    <div className="text-[11px] text-muted font-normal">Visa, Mastercard, American Express</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-terracotta flex items-center justify-center">
                  {paymentMethod === "card" && <div className="w-2 h-2 rounded-full bg-terracotta" />}
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod("arrival")}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                  paymentMethod === "arrival"
                    ? "border-terracotta bg-terracotta-light/40 font-semibold"
                    : "border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-forest" />
                  <div>
                    <div className="text-xs sm:text-sm text-charcoal">Hold with Zero Upfront Charge</div>
                    <div className="text-[11px] text-muted font-normal">Pay host directly in local currency on arrival</div>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-terracotta flex items-center justify-center">
                  {paymentMethod === "arrival" && <div className="w-2 h-2 rounded-full bg-terracotta" />}
                </div>
              </label>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-sm font-semibold tracking-wide transition shadow-lg shadow-terracotta/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming reservation with {experience.source.sourceName}...</span>
              ) : (
                <span>Authorize & Complete Booking ({formatCurrency(totalPriceEUR)})</span>
              )}
            </button>
          </div>
        </form>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-border shadow-lg space-y-5">
            <h3 className="font-editorial text-xl font-bold text-charcoal">
              Experience Summary
            </h3>

            <div className="flex gap-4 items-start pb-5 border-b border-border">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-sand shrink-0">
                <Image
                  src={experience.images[0].url}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-terracotta">
                  {experience.categoryLabel}
                </span>
                <h4 className="font-editorial text-sm font-bold text-charcoal leading-snug line-clamp-2">
                  {experience.title}
                </h4>
                <div className="text-xs text-muted">
                  {experience.destination.name}, {experience.destination.country}
                </div>
              </div>
            </div>

            {/* Selected Booking Details */}
            <div className="space-y-3 text-xs text-charcoal">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted">
                  <Calendar className="w-3.5 h-3.5 text-terracotta" />
                  <span>Date</span>
                </span>
                <span className="font-medium font-sans">{date}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted">
                  <Clock className="w-3.5 h-3.5 text-terracotta" />
                  <span>Time</span>
                </span>
                <span className="font-medium font-sans">{time}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted">
                  <Users className="w-3.5 h-3.5 text-terracotta" />
                  <span>Participants</span>
                </span>
                <span className="font-medium font-sans">{guests} travelers</span>
              </div>

              {selectedOption && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted">Option</span>
                  <span className="font-medium text-right max-w-[180px] truncate">
                    {selectedOption.name}
                  </span>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-border space-y-2 text-xs">
              <div className="flex justify-between text-muted">
                <span>
                  {formatCurrency(pricePerPersonEUR)} × {guests} guests
                </span>
                <span className="font-sans font-medium">{formatCurrency(totalPriceEUR)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Booking & Curatorial fee</span>
                <span className="font-sans font-medium text-forest">Included (0.00)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-charcoal pt-2 border-t border-border/80">
                <span>Total Due</span>
                <span className="font-sans text-xl text-terracotta">
                  {formatCurrency(totalPriceEUR)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-forest-light text-forest text-xs space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Purience Booking Guarantee</span>
              </div>
              <p className="text-[11px] text-forest/80 leading-relaxed">
                Full refund if canceled up to 48 hours in advance. Vetted local host standards guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
