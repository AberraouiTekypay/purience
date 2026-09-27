"use client";

import React, { useState } from "react";
import { PurienceExperience } from "@/types";
import { Check, Copy, MessageCircle, Mail, X } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface ShareModalProps {
  experience: PurienceExperience;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ experience, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const experienceUrl = typeof window !== "undefined" ? window.location.href : `https://purience.com/experiences/${experience.slug}`;
  const shareText = `Check out this extraordinary experience on Purience: ${experience.title}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(experienceUrl);
    setCopied(true);
    analytics.track("share", {
      experienceId: experience.id,
      shareTarget: "copy_link",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    analytics.track("share", {
      experienceId: experience.id,
      shareTarget: "whatsapp",
    });
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + experienceUrl)}`,
      "_blank"
    );
  };

  const handleEmail = () => {
    analytics.track("share", {
      experienceId: experience.id,
      shareTarget: "email",
    });
    window.open(
      `mailto:?subject=${encodeURIComponent(experience.title)}&body=${encodeURIComponent(
        shareText + "\n\n" + experienceUrl
      )}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-border shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-sand/40 text-muted hover:text-charcoal"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta">
            Share Discovery
          </span>
          <h3 className="font-editorial text-2xl font-bold text-charcoal">
            Send this experience
          </h3>
          <p className="text-xs text-muted line-clamp-1">
            {experience.title}
          </p>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleEmail}
            className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-sand/40 hover:bg-sand text-charcoal text-xs font-semibold border border-border transition cursor-pointer"
          >
            <Mail className="w-4 h-4 text-muted" />
            <span>Email</span>
          </button>
        </div>

        {/* Link Copy Box */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-muted">
            Direct Link
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-sand/20 border border-border">
            <input
              type="text"
              readOnly
              value={experienceUrl}
              className="bg-transparent text-xs text-charcoal flex-1 truncate focus:outline-none px-1"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg bg-charcoal hover:bg-terracotta text-white text-xs font-medium flex items-center gap-1.5 transition shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
