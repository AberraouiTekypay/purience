"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BookingRecord } from "@/types";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Download,
  Compass,
} from "lucide-react";

export default function BookingConfirmationPage() {
  const params = useParams();
  const bookingRef = params.bookingRef as string;

  const [booking] = useState<BookingRecord | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("purience_bookings");
        if (stored) {
          const list: BookingRecord[] = JSON.parse(stored);
          const match = list.find((b) => b.bookingRef === bookingRef);
          return match || null;
        }
      } catch {
        // ignore
      }
    }
    return null;
  });

  const downloadCalendarFile = () => {
    if (!booking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Purience//Travel Experience//EN
BEGIN:VEVENT
SUMMARY:${booking.experience.title}
DESCRIPTION:${booking.experience.shortHeadline}\\nMeeting Point: ${booking.experience.meetingPoint.address}
LOCATION:${booking.experience.meetingPoint.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${booking.bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Confirmation Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-forest-light text-forest flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-forest">
            Reservation Guaranteed
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-charcoal">
            You&apos;re experiencing something extraordinary.
          </h1>
          <p className="text-sm text-muted max-w-md mx-auto">
            A confirmation voucher and meeting point details have been sent to your email.
          </p>
        </div>

        {/* References */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 p-3 rounded-2xl bg-sand/30 border border-border text-xs font-mono">
          <div>
            <span className="text-muted mr-1">Purience Reference:</span>
            <strong className="text-terracotta">{bookingRef}</strong>
          </div>
          {booking?.sourceBookingRef && (
            <div>
              <span className="text-muted mr-1">Provider Ref:</span>
              <strong className="text-charcoal">{booking.sourceBookingRef}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Card */}
      {booking && (
        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-border">
            <div className="relative w-full sm:w-32 aspect-[4/3] rounded-2xl overflow-hidden bg-sand shrink-0">
              <Image
                src={booking.experience.images[0].url}
                alt={booking.experience.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-terracotta">
                {booking.experience.categoryLabel}
              </span>
              <h3 className="font-editorial text-xl font-bold text-charcoal">
                {booking.experience.title}
              </h3>
              <p className="text-xs text-muted">
                {booking.experience.destination.name}, {booking.experience.destination.country}
              </p>
              <p className="text-xs text-charcoal/80 pt-1">
                Hosted by <strong>{booking.experience.host.name}</strong> ({booking.experience.host.title})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-sand/20 border border-border/60 space-y-1">
              <div className="flex items-center gap-1.5 text-muted">
                <Calendar className="w-4 h-4 text-terracotta" />
                <span className="uppercase tracking-wider font-semibold text-[10px]">Date</span>
              </div>
              <div className="font-bold text-charcoal text-sm">{booking.date}</div>
            </div>

            <div className="p-4 rounded-2xl bg-sand/20 border border-border/60 space-y-1">
              <div className="flex items-center gap-1.5 text-muted">
                <Clock className="w-4 h-4 text-terracotta" />
                <span className="uppercase tracking-wider font-semibold text-[10px]">Time</span>
              </div>
              <div className="font-bold text-charcoal text-sm">{booking.time}</div>
            </div>

            <div className="p-4 rounded-2xl bg-sand/20 border border-border/60 space-y-1">
              <div className="flex items-center gap-1.5 text-muted">
                <Users className="w-4 h-4 text-terracotta" />
                <span className="uppercase tracking-wider font-semibold text-[10px]">Party Size</span>
              </div>
              <div className="font-bold text-charcoal text-sm">
                {booking.guests} {booking.guests === 1 ? "Traveler" : "Travelers"}
              </div>
            </div>
          </div>

          {/* Meeting Point Details */}
          <div className="p-5 rounded-2xl bg-sand/30 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal">
              <MapPin className="w-4 h-4 text-terracotta" />
              <span>Meeting Point & Directions</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-charcoal">
              {booking.experience.meetingPoint.address}
            </p>
            <p className="text-xs text-muted leading-relaxed">
              {booking.experience.meetingPoint.description}
            </p>
          </div>

          {/* Actions: Add to calendar / Download voucher */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
            <button
              onClick={downloadCalendarFile}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal hover:bg-terracotta text-white text-xs font-semibold transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Add to Calendar (.ics)</span>
            </button>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-charcoal text-charcoal text-xs font-semibold transition"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Discover more experiences</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
