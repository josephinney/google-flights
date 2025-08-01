import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
    AirportSuggestion,
    FlightItinerary,
    PassengerCounts,
    TripType,
    ClassType
} from '@/types/flights';

// Interface for the state managed by the store
interface FlightState {
    // --- Search Parameters ---
    tripType: TripType;
    departureAirport: AirportSuggestion | null;
    arrivalAirport: AirportSuggestion | null;
    departureDate: Date | null;
    returnDate: Date | null;
    passengers: PassengerCounts;
    classType: ClassType;

    // --- State for Airport Autocomplete ---
    airportSuggestions: AirportSuggestion[];
    isSearchingAirports: boolean;

    // --- State for Flight Search Results ---
    itineraries: FlightItinerary[];
    isSearchingFlights: boolean;
    searchError: string | null;

    // --- Actions to modify the state ---
    setTripType: (type: TripType) => void;
    setDepartureAirport: (airport: AirportSuggestion | null) => void;
    setArrivalAirport: (airport: AirportSuggestion | null) => void;
    setDepartureDate: (date: Date | null) => void;
    setReturnDate: (date: Date | null) => void;
    setPassengers: (passengers: PassengerCounts) => void;
    setClassType: (type: ClassType) => void;
    swapAirports: () => void;

    setAirportSuggestions: (suggestions: AirportSuggestion[]) => void;
    setIsSearchingAirports: (loading: boolean) => void;

    setItineraries: (results: FlightItinerary[]) => void;
    setIsSearchingFlights: (loading: boolean) => void;
    setSearchError: (error: string | null) => void;

    resetSearch: () => void;
}

// Initial State
const initialState = {
    tripType: 'Round trip' as TripType,
    departureAirport: null,
    arrivalAirport: null,
    departureDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Default to a week from now
    passengers: {
        adults: 1,
        children: 0,
        infantsInSeat: 0,
        infantsOnLap: 0,
    },
    classType: 'economy' as ClassType,
    airportSuggestions: [],
    isSearchingAirports: false,
    itineraries: [],
    isSearchingFlights: false,
    searchError: null,
};

export const useFlightStore = create<FlightState>()(
    devtools(
        (set, get) => ({
            ...initialState,

            // --- Parameter Actions ---
            setTripType: (type) => set({ tripType: type }, false, 'setTripType'),

            setDepartureAirport: (airport) => set(
                { departureAirport: airport },
                false,
                'setDepartureAirport'
            ),

            setArrivalAirport: (airport) => set(
                { arrivalAirport: airport },
                false,
                'setArrivalAirport'
            ),

            setDepartureDate: (date) => set(
                { departureDate: date },
                false,
                'setDepartureDate'
            ),

            setReturnDate: (date) => set(
                { returnDate: date },
                false,
                'setReturnDate'
            ),

            setPassengers: (passengers) => set(
                { passengers },
                false,
                'setPassengers'
            ),

            setClassType: (type) => set(
                { classType: type },
                false,
                'setClassType'
            ),

            swapAirports: () => set((state) => (
                {
                    departureAirport: state.arrivalAirport,
                    arrivalAirport: state.departureAirport
                }),
                false,
                'swapAirports'
            ),

            // --- Airport Autocomplete Actions ---
            setAirportSuggestions: (suggestions) => set(
                { airportSuggestions: suggestions, isSearchingAirports: false },
                false,
                'setAirportSuggestions'
            ),

            setIsSearchingAirports: (loading) => set(
                { isSearchingAirports: loading },
                false,
                'setIsSearchingAirports'
            ),

            // --- Flight Search Actions ---
            setItineraries: (results) => set(
                {
                    itineraries: results,
                    isSearchingFlights: false,
                    searchError: null
                },
                false,
                'setItineraries'
            ),

            setIsSearchingFlights: (loading) => set(
                { 
                    isSearchingFlights: loading, 
                    searchError: null 
                }, 
                false, 
                'setIsSearchingFlights'
            ),

            setSearchError: (error) => set(
                { 
                    searchError: error, 
                    isSearchingFlights: false, 
                    itineraries: [] 
                }, 
                false, 
                'setSearchError'
            ),

            // --- Reset Action ---
            resetSearch: () => set(initialState, false, 'resetSearch'),
        }),
        {
            name: 'flight-search-store',
        }
    )
);