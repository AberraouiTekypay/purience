export type Currency = 'EUR' | 'MAD' | 'USD';
export type Language = 'en' | 'fr' | 'es' | 'ar';

export type ExperienceBadge =
  | 'Purience Pick'
  | 'Rare Find'
  | 'Limited'
  | 'New'
  | 'Private';

export type ExperienceCategory =
  | 'craft'
  | 'culinary'
  | 'nature'
  | 'after-dark'
  | 'wellness'
  | 'special'
  | 'art'
  | 'ocean';

export interface Destination {
  id: string;
  name: string;
  country: string;
  slug: string;
  heroImage: string;
  editorialIntro: string;
  curatorQuote: string;
  badge?: string;
  lat: number;
  lng: number;
  popularAreas: string[];
}

export interface ExperienceImage {
  url: string;
  alt: string;
  caption?: string;
  isHero?: boolean;
}

export interface HostProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  verified: boolean;
  experienceYears?: number;
}

export interface ExperienceOption {
  id: string;
  name: string;
  priceDiffEUR: number; // in EUR (relative to base)
  description: string;
}

export interface TimeSlot {
  time: string;
  spotsLeft: number;
  priceEUR: number;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  available: boolean;
  slots: TimeSlot[];
}

export interface PurienceExperience {
  id: string; // Canonical Purience ID e.g. PUR_EXP_10291
  slug: string;
  title: string;
  shortHeadline: string; // One-line editorial hook
  editorialPositioning: string; // Expanded editorial justification
  description: string;
  destination: Destination;
  category: ExperienceCategory;
  categoryLabel: string;
  badge?: ExperienceBadge;
  basePriceEUR: number; // Base price in whole EUR
  isFromPrice: boolean;
  duration: string;
  languages: string[];
  groupType: 'Small Group' | 'Private' | 'Solo Friendly';
  maxGuests: number;
  images: ExperienceImage[];
  rating: {
    score: number;
    reviewCount: number;
    verifiedCount: number;
  };
  whyYoullLoveIt: string[];
  whatYoullDo: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  host: HostProfile;
  included: string[];
  notIncluded: string[];
  meetingPoint: {
    address: string;
    description: string;
    lat: number;
    lng: number;
  };
  accessibility: string[];
  cancellationPolicy: string;
  source: {
    provider: 'curience' | 'purience_direct' | 'external';
    externalId: string;
    sourceName: string;
  };
  options: ExperienceOption[];
  availableDates: DayAvailability[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  editorialNote: string;
  coverImage: string;
  curator: string;
  curatorRole: string;
  destinationSlug?: string;
  experienceIds: string[];
}

export interface BookingGuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingRequest {
  experienceId: string;
  date: string;
  time: string;
  optionId?: string;
  guests: number;
  currency: Currency;
  guestDetails: BookingGuestDetails;
  referralCode?: string;
}

export interface BookingRecord {
  bookingRef: string; // e.g. PUR-BK-893012
  experience: PurienceExperience;
  date: string;
  time: string;
  guests: number;
  optionName?: string;
  totalAmountEUR: number;
  paidAmount: number;
  currency: Currency;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  guestDetails: BookingGuestDetails;
  sourceBookingRef: string;
  provider: 'curience' | 'purience_direct' | 'external';
}

export interface FilterState {
  destination?: string;
  category?: ExperienceCategory | 'all';
  date?: string;
  maxPriceEUR?: number;
  duration?: string;
  groupType?: string;
  query?: string;
}
