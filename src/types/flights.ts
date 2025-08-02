
// ===== TYPES FOR UI STATE =====

export type TripType = 'Round trip' | 'One way' | 'Multi-city';

export type ClassType = 'economy' | 'premiumeconomy' | 'business' | 'first'

export interface PassengerCounts {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

export type SortByType = 'best' | 'cheapest';

export interface FlightFilters {
  maxStops: number | null;
  maxPrice: number | null;
  maxDuration: number | null; 
  allowedAirlines: number[] | null; 
}


// ===== TYPES FOR API PAYLOADS REQUESTS =====

export interface SearchAirportPayload {
  query: string;
  locale?: string;
}

export interface SearchFlightsPayload {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  adults?: number;
  cabinClass?: ClassType;
  currency?: string;
  countryCode?: string;
  market?: string;
  sortBy?: 'best' | 'price' | 'duration';
}

export interface FlightSegment {
  id: string;
  origin: {
    flightPlaceId: string;
    name: string;
    type: string;
  };
  destination: {
    flightPlaceId: string;
    name: string;
    type: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
}

// ===== TYPES FOR API RESPONSES =====

// --- For searchAirport Endpoint ---
export interface AirportSuggestion {
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: 'CITY' | 'AIRPORT' | 'COUNTRY';
    localizedName: string;
    relevantFlightParams: {
        skyId: string;
        entityId: string;
        flightPlaceType: 'CITY' | 'AIRPORT';
        localizedName: string;
    }
  };
}

export type SearchAirportResponse = {
  status: boolean;
  timestamp: number;
  data: AirportSuggestion[];
}


// --- For searchFlights Endpoint ---

export interface Price {
  raw: number;
  formatted: string;
}

export interface MarketingCarrier {
  id: number;
  logoUrl: string;
  name: string;
}

export interface FlightLeg {
    id: string;
    origin: {
      id: string;
      name: string;
      displayCode: string;
    };
    destination: {
      id: string;
      name: string;
      displayCode: string;
    };
    durationInMinutes: number;
    stopCount: number;
    departure: string; 
    arrival: string;   
    carriers: {
      marketing: MarketingCarrier[];
    };
    segments: FlightSegment[]; 
}

export interface FlightItinerary {
  id: string;
  price: Price;
  legs: FlightLeg[];
  tags: string[];
  score: number;
  isSelfTransfer: boolean;
}

export interface SearchFlightsResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: 'incomplete' | 'complete';
      totalResults: number;
    };
    itineraries: FlightItinerary[];
    filterStats?: any; 
  };
}


