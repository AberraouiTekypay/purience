import { PurienceExperience, BookingRequest } from "@/types";

export interface SourceAvailabilityResult {
  available: boolean;
  slots: Array<{
    time: string;
    spotsLeft: number;
    priceEUR: number;
  }>;
}

export interface SourceBookingResult {
  success: boolean;
  externalBookingRef: string;
  confirmationDetails?: {
    status: 'confirmed' | 'pending';
    providerNotes?: string;
  };
}

export interface ExperienceSourceAdapter {
  readonly id: 'curience' | 'purience_direct' | 'external';
  readonly name: string;
  readonly isConnected: boolean;

  /**
   * Fetches experiences provided by this supply partner and normalizes
   * them into the canonical PurienceExperience model.
   */
  getExperiences(): Promise<PurienceExperience[]>;

  /**
   * Fetches a single experience by its internal Purience ID or maps it.
   */
  getExperienceById(purienceId: string): Promise<PurienceExperience | null>;

  /**
   * Checks real-time availability with the underlying provider.
   */
  checkAvailability(
    purienceId: string,
    date: string,
    guests: number
  ): Promise<SourceAvailabilityResult>;

  /**
   * Books the experience with the upstream provider.
   */
  createBooking(request: BookingRequest): Promise<SourceBookingResult>;
}
