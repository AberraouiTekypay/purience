"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PurienceExperience } from "@/types";
import { useLocale } from "@/context/LocaleContext";
import { Calendar, Users, Clock, ShieldCheck } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface BookingWidgetProps {
  experience: PurienceExperience;
  isStickyMobile?: boolean;
}

export function BookingWidget({ experience, isStickyMobile = false }: BookingWidgetProps) {
  const router = useRouter();
  const { formatCurrency, currency, language } = useLocale();

  const isFr = language === "fr";

  const [selectedDate, setSelectedDate] = useState<string>(
    experience.availableDates[0]?.date || "2026-10-01"
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    experience.availableDates[0]?.slots[0]?.time || "09:30"
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    experience.options[0]?.id || "opt_standard"
  );
  const [guests, setGuests] = useState<number>(2);

  // Available slots for selected date
  const currentDay = experience.availableDates.find((d) => d.date === selectedDate);
  const availableSlots = currentDay?.slots || [];

  // Price calculations
  const selectedOption = experience.options.find((o) => o.id === selectedOptionId);
  const priceModifierEUR = selectedOption?.priceDiffEUR || 0;
  const pricePerPersonEUR = experience.basePriceEUR + priceModifierEUR;
  const totalPriceEUR = pricePerPersonEUR * guests;

  const handleStartBooking = () => {
    analytics.track("checkout_started", {
      experienceId: experience.id,
      experienceTitle: isFr ? (experience.titleFr || experience.title) : experience.title,
      currency,
      amountEUR: totalPriceEUR,
    });

    const params = new URLSearchParams({
      date: selectedDate,
      time: selectedTime,
      optionId: selectedOptionId,
      guests: guests.toString(),
      currency,
    });

    router.push(`/checkout/${experience.id}?${params.toString()}`);
  };

  if (isStickyMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border px-4 py-3 sm:hidden flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[11px] text-muted">
            {isFr
              ? `Total pour ${guests} ${guests === 1 ? "voyageur" : "voyageurs"}`
              : `Total for ${guests} ${guests === 1 ? "guest" : "guests"}`}
          </div>
          <div className="text-lg font-bold font-sans text-charcoal">
            {formatCurrency(totalPriceEUR)}
          </div>
        </div>
        <button
          onClick={handleStartBooking}
          className="bg-terracotta hover:bg-terracotta-hover text-white px-6 py-2.5 rounded-full font-medium text-sm transition shadow-sm"
        >
          {isFr ? "Réserver ma place" : "Reserve Spots"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-border shadow-xl space-y-6">
      {/* Header Pricing */}
      <div className="flex items-baseline justify-between border-b border-border/60 pb-5">
        <div>
          <span className="text-xs text-muted block">
            {isFr ? "Prix de l'expérience" : "Experience Price"}
          </span>
          <span className="font-editorial text-3xl font-bold text-charcoal">
            {formatCurrency(pricePerPersonEUR)}
          </span>
          <span className="text-xs text-muted ml-1">
            {isFr ? "/ personne" : "/ person"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-light text-forest text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isFr ? "Confirmation instantanée" : "Instant Confirmation"}</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal">
          <Calendar className="w-3.5 h-3.5 text-terracotta" />
          <span>{isFr ? "Sélectionner une date" : "Select Date"}</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {experience.availableDates.map((day) => {
            const isSelected = day.date === selectedDate;
            const dateObj = new Date(day.date + "T00:00:00");
            const formattedDate = dateObj.toLocaleDateString(isFr ? "fr-FR" : "en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

            return (
              <button
                key={day.date}
                type="button"
                onClick={() => {
                  setSelectedDate(day.date);
                  if (day.slots[0]) setSelectedTime(day.slots[0].time);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition cursor-pointer ${
                  isSelected
                    ? "border-terracotta bg-terracotta-light text-charcoal font-semibold ring-1 ring-terracotta"
                    : "border-border hover:border-terracotta/40 text-charcoal"
                }`}
              >
                <div className="capitalize">{formattedDate}</div>
                <div className="text-[10px] text-muted mt-0.5">
                  {isFr
                    ? `${day.slots.length} créneau${day.slots.length > 1 ? "x" : ""}`
                    : `${day.slots.length} time slot${day.slots.length > 1 ? "s" : ""}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal">
          <Clock className="w-3.5 h-3.5 text-terracotta" />
          <span>{isFr ? "Créneaux disponibles" : "Available Time Slot"}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {availableSlots.map((slot) => {
            const isSelected = slot.time === selectedTime;
            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => setSelectedTime(slot.time)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? "bg-charcoal text-white border-charcoal"
                    : "border-border hover:border-charcoal text-charcoal"
                }`}
              >
                {slot.time} ({slot.spotsLeft} {isFr ? "restant" + (slot.spotsLeft > 1 ? "s" : "") : "left"})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier Options */}
      {experience.options.length > 1 && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
            {isFr ? "Options & Formules" : "Tier Options"}
          </label>
          <div className="space-y-2">
            {experience.options.map((opt) => {
              const isSelected = opt.id === selectedOptionId;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? "border-terracotta bg-sand/30 font-medium"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-charcoal">{opt.name}</div>
                    <div className="text-[11px] text-muted mt-0.5">{opt.description}</div>
                  </div>
                  {opt.priceDiffEUR > 0 && (
                    <span className="text-[11px] font-bold text-terracotta shrink-0">
                      +{formatCurrency(opt.priceDiffEUR)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Number of Guests */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal">
          <Users className="w-3.5 h-3.5 text-terracotta" />
          <span>{isFr ? "Participants" : "Participants"}</span>
        </label>
        <div className="flex items-center justify-between p-3 rounded-xl border border-border">
          <span className="text-xs font-medium text-charcoal">
            {guests} {isFr ? (guests === 1 ? "Voyageur" : "Voyageurs") : (guests === 1 ? "Traveler" : "Travelers")} ({isFr ? `Max ${experience.maxGuests}` : `Max ${experience.maxGuests}`})
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
              className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-charcoal disabled:opacity-30 hover:bg-sand/30 font-semibold"
            >
              -
            </button>
            <span className="w-6 text-center text-xs font-bold">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(experience.maxGuests, guests + 1))}
              disabled={guests >= experience.maxGuests}
              className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-charcoal disabled:opacity-30 hover:bg-sand/30 font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="pt-4 border-t border-border space-y-2 text-xs">
        <div className="flex justify-between text-muted">
          <span>
            {formatCurrency(pricePerPersonEUR)} × {guests} {isFr ? (guests === 1 ? "voyageur" : "voyageurs") : (guests === 1 ? "guest" : "guests")}
          </span>
          <span className="font-sans font-medium">{formatCurrency(totalPriceEUR)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-charcoal pt-1">
          <span>Total</span>
          <span className="font-sans text-base text-terracotta">
            {formatCurrency(totalPriceEUR)}
          </span>
        </div>
      </div>

      {/* Reserve CTA Button */}
      <button
        type="button"
        onClick={handleStartBooking}
        className="w-full py-4 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-sm font-semibold tracking-wide transition shadow-lg shadow-terracotta/20 cursor-pointer flex items-center justify-center gap-2"
      >
        <span>{isFr ? "Réserver cette expérience" : "Reserve this experience"}</span>
      </button>

      {/* Supply Transparency Note */}
      <div className="text-center text-[11px] text-muted space-y-1">
        <div>
          {isFr
            ? "Aucun paiement immédiat requis pour la demande"
            : "No immediate payment required for inquiry reservation"}
        </div>
        <div className="text-[10px] text-muted/70">
          {isFr
            ? `Opéré via ${experience.source.sourceName} • Standard Purience garanti`
            : `Operated via ${experience.source.sourceName} • Guaranteed Purience standard`}
        </div>
      </div>
    </div>
  );
}
