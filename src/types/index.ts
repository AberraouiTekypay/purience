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
  countryFr?: string;
  slug: string;
  heroImage: string;
  editorialIntro: string;
  editorialIntroFr?: string;
  curatorQuote: string;
  curatorQuoteFr?: string;
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
  titleFr?: string;
  bio: string;
  bioFr?: string;
  avatar: string;
  verified: boolean;
  experienceYears?: number;
}

export interface ExperienceOption {
  id: string;
  name: string;
  nameFr?: string;
  priceDiffEUR: number; // in EUR (relative to base)
  description: string;
  descriptionFr?: string;
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
  titleFr?: string;
  shortHeadline: string; // One-line editorial hook
  shortHeadlineFr?: string;
  editorialPositioning: string; // Expanded editorial justification
  editorialPositioningFr?: string;
  description: string;
  descriptionFr?: string;
  destination: Destination;
  category: ExperienceCategory;
  categoryLabel: string;
  categoryLabelFr?: string;
  badge?: ExperienceBadge;
  basePriceEUR: number; // Base price in whole EUR
  isFromPrice: boolean;
  duration: string;
  durationFr?: string;
  languages: string[];
  groupType: 'Small Group' | 'Private' | 'Solo Friendly';
  groupTypeFr?: string;
  maxGuests: number;
  images: ExperienceImage[];
  rating: {
    score: number;
    reviewCount: number;
    verifiedCount: number;
  };
  whyYoullLoveIt: string[];
  whyYoullLoveItFr?: string[];
  whatYoullDo: Array<{
    step: string;
    title: string;
    titleFr?: string;
    description: string;
    descriptionFr?: string;
  }>;
  host: HostProfile;
  included: string[];
  includedFr?: string[];
  notIncluded: string[];
  notIncludedFr?: string[];
  meetingPoint: {
    address: string;
    description: string;
    descriptionFr?: string;
    lat: number;
    lng: number;
  };
  accessibility: string[];
  accessibilityFr?: string[];
  cancellationPolicy: string;
  cancellationPolicyFr?: string;
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
  titleFr?: string;
  subtitle: string;
  subtitleFr?: string;
  editorialNote: string;
  editorialNoteFr?: string;
  coverImage: string;
  curator: string;
  curatorRole: string;
  curatorRoleFr?: string;
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
