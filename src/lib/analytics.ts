export type AnalyticsEventName =
  | 'homepage_view'
  | 'destination_view'
  | 'discover_impression'
  | 'experience_impression'
  | 'experience_click'
  | 'search'
  | 'filter_applied'
  | 'favorite'
  | 'collection_saved'
  | 'share'
  | 'availability_check'
  | 'checkout_started'
  | 'booking_completed'
  | 'booking_cancelled'
  | 'referral_shared'
  | 'referral_visit';

export interface AnalyticsPayload {
  experienceId?: string;
  experienceTitle?: string;
  destination?: string;
  category?: string;
  query?: string;
  currency?: string;
  amountEUR?: number;
  bookingRef?: string;
  sourceProvider?: string;
  shareTarget?: string;
  [key: string]: unknown;
}

class AnalyticsService {
  private eventsQueue: Array<{
    event: AnalyticsEventName;
    payload: AnalyticsPayload;
    timestamp: number;
    url: string;
  }> = [];

  track(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
    if (typeof window === 'undefined') return;

    const record = {
      event,
      payload,
      timestamp: Date.now(),
      url: window.location.href,
    };

    this.eventsQueue.push(record);

    // Development logging for inspection
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Purience Analytics] 📊 ${event}:`, payload);
    }

    // Persist latest events in localStorage for debugging & session attribution
    try {
      const stored = localStorage.getItem('purience_analytics_events');
      const list = stored ? JSON.parse(stored) : [];
      list.push(record);
      if (list.length > 50) list.shift(); // keep last 50
      localStorage.setItem('purience_analytics_events', JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  getRecentEvents() {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('purience_analytics_events');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

export const analytics = new AnalyticsService();
