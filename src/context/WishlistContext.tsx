"use client";

import React, { createContext, useContext, useState } from "react";
import { analytics } from "@/lib/analytics";

interface WishlistContextType {
  savedIds: string[];
  isSaved: (experienceId: string) => boolean;
  toggleSave: (experienceId: string, title?: string) => void;
  savedCount: number;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("purience_saved_experiences");
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // ignore
      }
    }
    return ["PUR_EXP_10291", "PUR_EXP_10297"];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const isSaved = (experienceId: string) => savedIds.includes(experienceId);

  const toggleSave = (experienceId: string, title?: string) => {
    setSavedIds((prev) => {
      const alreadySaved = prev.includes(experienceId);
      const next = alreadySaved ? prev.filter((id) => id !== experienceId) : [...prev, experienceId];

      try {
        localStorage.setItem("purience_saved_experiences", JSON.stringify(next));
      } catch {
        // ignore
      }

      if (!alreadySaved) {
        showToast(`Saved to your collection: ${title || "Experience"}`);
        analytics.track("favorite", { experienceId, experienceTitle: title });
      } else {
        showToast("Removed from your collection");
      }

      return next;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        savedIds,
        isSaved,
        toggleSave,
        savedCount: savedIds.length,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-charcoal text-ivory px-5 py-3 rounded-full shadow-2xl text-xs sm:text-sm font-medium border border-charcoal-muted animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
