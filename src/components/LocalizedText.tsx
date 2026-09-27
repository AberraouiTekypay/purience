"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";

interface LocalizedTextProps {
  en: string;
  fr?: string;
  className?: string;
  as?: React.ElementType;
}

export function LocalizedText({ en, fr, className, as: Component }: LocalizedTextProps) {
  const { language } = useLocale();
  const text = (language === "fr" && fr) ? fr : en;

  if (Component) {
    return <Component className={className}>{text}</Component>;
  }

  if (className) {
    return <span className={className}>{text}</span>;
  }

  return <>{text}</>;
}
