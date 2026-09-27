"use client";

import React from "react";
import { LocaleProvider } from "@/context/LocaleContext";
import { WishlistProvider } from "@/context/WishlistContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </LocaleProvider>
  );
}
