import { PurienceExperience, BookingRequest } from "@/types";
import { ExperienceSourceAdapter, SourceAvailabilityResult, SourceBookingResult } from "./ExperienceSourceAdapter";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";

export class PurienceDirectAdapter implements ExperienceSourceAdapter {
  readonly id = "purience_direct" as const;
  readonly name = "Purience Direct Exclusive Supply";
  readonly isConnected = true;

  async getExperiences(): Promise<PurienceExperience[]> {
    return CANONICAL_EXPERIENCES.filter((exp) => exp.source.provider === "purience_direct");
  }

  async getExperienceById(purienceId: string): Promise<PurienceExperience | null> {
    const match = CANONICAL_EXPERIENCES.find(
      (exp) => exp.id === purienceId && exp.source.provider === "purience_direct"
    );
    return match || null;
  }

  async checkAvailability(
    purienceId: string,
    date: string,
    guests: number
  ): Promise<SourceAvailabilityResult> {
    const exp = await this.getExperienceById(purienceId);
    if (!exp) return { available: false, slots: [] };

    const day = exp.availableDates.find((d) => d.date === date);
    if (!day || !day.available) return { available: false, slots: [] };

    const eligible = day.slots.filter((s) => s.spotsLeft >= guests);
    return {
      available: eligible.length > 0,
      slots: eligible,
    };
  }

  async createBooking(request: BookingRequest): Promise<SourceBookingResult> {
    const generatedDirectRef = `PUR-DIR-BK-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      externalBookingRef: generatedDirectRef,
      confirmationDetails: {
        status: "confirmed",
        providerNotes: `Direct host reservation confirmed for ${request.guestDetails.firstName} ${request.guestDetails.lastName}. Dedicated Purience concierge assigned.`,
      },
    };
  }
}
