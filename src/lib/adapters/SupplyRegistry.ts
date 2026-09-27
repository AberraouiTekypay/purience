import { PurienceExperience, BookingRequest, BookingRecord } from "@/types";
import { ExperienceSourceAdapter } from "./ExperienceSourceAdapter";
import { CurienceExperienceAdapter } from "./CurienceExperienceAdapter";
import { PurienceDirectAdapter } from "./PurienceDirectAdapter";
import { CANONICAL_EXPERIENCES } from "@/data/canonicalInventory";

class SupplyRegistry {
  private adapters: Map<string, ExperienceSourceAdapter> = new Map();
  public curienceAdapter: CurienceExperienceAdapter;
  public purienceDirectAdapter: PurienceDirectAdapter;

  constructor() {
    this.curienceAdapter = new CurienceExperienceAdapter();
    this.purienceDirectAdapter = new PurienceDirectAdapter();

    this.registerAdapter(this.curienceAdapter);
    this.registerAdapter(this.purienceDirectAdapter);
  }

  registerAdapter(adapter: ExperienceSourceAdapter) {
    this.adapters.set(adapter.id, adapter);
  }

  getAdapter(providerId: string): ExperienceSourceAdapter | undefined {
    return this.adapters.get(providerId);
  }

  /**
   * Aggregates experiences across all active supply adapters
   */
  async getAllExperiences(): Promise<PurienceExperience[]> {
    const results: PurienceExperience[] = [];

    for (const adapter of this.adapters.values()) {
      try {
        const items = await adapter.getExperiences();
        results.push(...items);
      } catch (err) {
        console.error(`Failed to fetch experiences from supply source [${adapter.name}]:`, err);
      }
    }

    // Default fallback if any error occurs
    return results.length > 0 ? results : CANONICAL_EXPERIENCES;
  }

  /**
   * Fetches an experience by its Canonical Purience ID or Slug across adapters
   */
  async getExperience(idOrSlug: string): Promise<PurienceExperience | null> {
    const all = await this.getAllExperiences();
    const found = all.find((exp) => exp.id === idOrSlug || exp.slug === idOrSlug);
    return found || null;
  }

  /**
   * Execute an end-to-end booking through the appropriate supply adapter
   */
  async processBooking(request: BookingRequest): Promise<BookingRecord> {
    const experience = await this.getExperience(request.experienceId);
    if (!experience) {
      throw new Error(`Experience with ID ${request.experienceId} not found.`);
    }

    const adapter = this.getAdapter(experience.source.provider);
    if (!adapter) {
      throw new Error(`No supply adapter registered for provider ${experience.source.provider}`);
    }

    const sourceResult = await adapter.createBooking(request);
    if (!sourceResult.success) {
      throw new Error("Provider rejected the reservation request.");
    }

    // Find option price if selected
    const selectedOption = experience.options.find((o) => o.id === request.optionId);
    const optionDiffEUR = selectedOption?.priceDiffEUR || 0;
    const pricePerPersonEUR = experience.basePriceEUR + optionDiffEUR;
    const totalAmountEUR = pricePerPersonEUR * request.guests;

    const purienceBookingRef = `PUR-BK-${Math.floor(100000 + Math.random() * 900000)}`;

    const record: BookingRecord = {
      bookingRef: purienceBookingRef,
      experience,
      date: request.date,
      time: request.time,
      guests: request.guests,
      optionName: selectedOption?.name,
      totalAmountEUR,
      paidAmount: totalAmountEUR,
      currency: request.currency,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      guestDetails: request.guestDetails,
      sourceBookingRef: sourceResult.externalBookingRef,
      provider: experience.source.provider,
    };

    return record;
  }
}

export const supplyRegistry = new SupplyRegistry();
