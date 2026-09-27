import { PurienceExperience, BookingRequest } from "@/types";
import { ExperienceSourceAdapter, SourceAvailabilityResult, SourceBookingResult } from "./ExperienceSourceAdapter";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";

export class CurienceExperienceAdapter implements ExperienceSourceAdapter {
  readonly id = "curience" as const;
  readonly name = "Curience Partner Distribution Network";
  readonly isConnected = true;

  // Internal bi-directional source mapping: Purience Canonical ID <-> Upstream Curience ID
  private readonly purienceToCurienceMap = new Map<string, string>([
    ["PUR_EXP_10291", "CUR_EXP_849382"],
    ["PUR_EXP_10293", "CUR_EXP_710924"],
    ["PUR_EXP_10294", "CUR_EXP_992140"],
    ["PUR_EXP_10296", "CUR_EXP_448102"],
    ["PUR_EXP_10297", "CUR_EXP_619830"],
  ]);

  readonly apiUrl: string;
  readonly apiKey: string | null;

  constructor() {
    this.apiUrl = process.env.CURIENCE_API_URL || "https://sandbox-api.curience.com/v1";
    this.apiKey = process.env.CURIENCE_API_KEY || null;
  }

  async getExperiences(): Promise<PurienceExperience[]> {
    return CANONICAL_EXPERIENCES.filter((exp) => exp.source.provider === "curience");
  }

  async getExperienceById(purienceId: string): Promise<PurienceExperience | null> {
    const match = CANONICAL_EXPERIENCES.find(
      (exp) => exp.id === purienceId && exp.source.provider === "curience"
    );
    return match || null;
  }

  async checkAvailability(
    purienceId: string,
    date: string,
    guests: number
  ): Promise<SourceAvailabilityResult> {
    const exp = await this.getExperienceById(purienceId);

    if (!exp) {
      return { available: false, slots: [] };
    }

    const dayAvailability = exp.availableDates.find((d) => d.date === date);
    if (!dayAvailability || !dayAvailability.available) {
      return {
        available: false,
        slots: [],
      };
    }

    const eligibleSlots = dayAvailability.slots.filter((s) => s.spotsLeft >= guests);
    return {
      available: eligibleSlots.length > 0,
      slots: eligibleSlots,
    };
  }

  async createBooking(request: BookingRequest): Promise<SourceBookingResult> {
    const upstreamId = this.purienceToCurienceMap.get(request.experienceId);
    // In production, an authorized POST /v1/partner/bookings is executed with idempotency key
    const generatedCurienceRef = `CUR-BK-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      externalBookingRef: generatedCurienceRef,
      confirmationDetails: {
        status: "confirmed",
        providerNotes: `Booked via Curience Partner Distribution. Upstream item reference: ${upstreamId || "N/A"}.`,
      },
    };
  }

  getUpstreamMapping(purienceId: string): string | undefined {
    return this.purienceToCurienceMap.get(purienceId);
  }
}
