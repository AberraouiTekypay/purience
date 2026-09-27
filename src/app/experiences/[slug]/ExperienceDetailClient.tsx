"use client";

import React, { useState } from "react";
import { PurienceExperience } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { ShareModal } from "@/components/ShareModal";
import { Bookmark, Share2 } from "lucide-react";

export function ExperienceDetailClient({ experience }: { experience: PurienceExperience }) {
  const { isSaved, toggleSave } = useWishlist();
  const [shareOpen, setShareOpen] = useState(false);

  const saved = isSaved(experience.id);

  return (
    <>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => toggleSave(experience.id, experience.title)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition cursor-pointer ${
            saved
              ? "bg-terracotta border-terracotta text-white"
              : "bg-white border-border text-charcoal hover:border-charcoal"
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-white" : ""}`} />
          <span>{saved ? "Saved" : "Save"}</span>
        </button>

        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:border-charcoal text-xs font-semibold text-charcoal transition cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-muted" />
          <span>Share</span>
        </button>
      </div>

      <ShareModal
        experience={experience}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </>
  );
}
