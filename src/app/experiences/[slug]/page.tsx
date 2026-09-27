import React from "react";
import { notFound } from "next/navigation";
import { supplyRegistry } from "@/lib/adapters/SupplyRegistry";
import { ExperienceDetailView } from "./ExperienceDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const experience = await supplyRegistry.getExperience(slug);

  if (!experience) {
    return { title: "Experience Not Found" };
  }

  return {
    title: `${experience.title} — ${experience.destination.name}`,
    description: experience.shortHeadline,
    openGraph: {
      title: `${experience.title} | Purience`,
      description: experience.shortHeadline,
      images: [experience.images[0]?.url || ""],
    },
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const experience = await supplyRegistry.getExperience(slug);

  if (!experience) {
    notFound();
  }

  const all = await supplyRegistry.getAllExperiences();
  const similarExperiences = all
    .filter(
      (e) =>
        e.id !== experience.id &&
        (e.destination.slug === experience.destination.slug ||
          e.category === experience.category)
    )
    .slice(0, 3);

  return (
    <ExperienceDetailView
      experience={experience}
      similarExperiences={similarExperiences}
    />
  );
}
