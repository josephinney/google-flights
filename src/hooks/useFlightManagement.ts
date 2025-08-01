import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useFlightStore } from '@/store/flightStore';
import flightService from '@/services/flightService';
import { SearchFlightsPayload, SearchAirportPayload } from '@/types/flights';
import toast from 'react-hot-toast';
import mockFlightService from '@/mocks/mockFlightService';
import { useRouter } from 'next/navigation';

const formatDate = (date: Date | null): string | undefined => {
    if (!date) return undefined;
    return date.toISOString().split('T')[0];
};

/**
 * Custom hook to manage all flight-related logic and state.
 * It integrates the flight service (API calls) with the flight store (Zustand state).
 */
export const useFlightManagement = () => {
    
    const IS_MOCK_ACTIVE = true;
    const service = IS_MOCK_ACTIVE ? mockFlightService : flightService;

    useEffect(() => {
        if (IS_MOCK_ACTIVE) {
            console.warn("⚠️ MODO MOCK ⚠️");
        }
    }, [IS_MOCK_ACTIVE]);
    
    const router = useRouter()
    const store = useFlightStore();

    // --- MUTATIONS ---

    // Mutation for searching airports (for autocompletion)
    const airportSearchMutation = useMutation({
        mutationFn: (payload: SearchAirportPayload) => service.searchAirport(payload),
        onMutate: () => {
            store.setIsSearchingAirports(true);
        },
        onSuccess: (data) => {
            store.setAirportSuggestions(data);
        },
        onError: (error) => {
            console.error("Airport search failed:", error);
            toast.error("Could not fetch airport suggestions.");
            store.setAirportSuggestions([]); 
            store.setIsSearchingAirports(false);
        },
    });

    // Mutation for the main flight search
    const flightSearchMutation = useMutation({
        mutationFn: (payload: SearchFlightsPayload) => service.searchFlights(payload),
        onMutate: () => {
            store.setIsSearchingFlights(true);
        },
        onSuccess: (response) => {

            if (response.data && response.data.itineraries.length > 0) {
                 store.setItineraries(response.data.itineraries);
                 toast.success(`${response.data.itineraries.length} flights found!`);
            } else {
                store.setItineraries([]);
                toast('No flights found for the selected criteria.');
            }

            router.push('/flights/search')
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "An error occurred while searching for flights.";
            store.setSearchError(errorMessage);
            toast.error(errorMessage);
            router.push('/flights/search')
        },
    });


    // --- PUBLIC FUNCTIONS (to be called from UI components) ---

    /**
     * Triggers the airport search mutation.
     * Wrapped in useCallback for performance optimization.
     * @param query The search term entered by the user.
     */
    const searchAirports = useCallback((query: string) => {
        if (query && query.length > 2) {
            airportSearchMutation.mutate({ query });
        } else {
            // Clear suggestions if query is too short
            store.setAirportSuggestions([]);
        }
    }, [airportSearchMutation, store.setAirportSuggestions]);

    /**
     * Gathers all parameters from the store, builds the payload,
     * and triggers the main flight search mutation.
     */
    const searchFlights = useCallback(() => {
        const { departureAirport, arrivalAirport, departureDate, returnDate, tripType, classType, passengers } = store;


        // --- Validation ---
        if (!departureAirport || !arrivalAirport) {
            toast.error('Please select departure and arrival airports.');
            return;
        }
        if (!departureDate) {
            toast.error('Please select a departure date.');
            return;
        }
        if (tripType === 'Round trip' && !returnDate) {
            toast.error('Please select a return date for a round trip.');
            return;
        }

        const payload: SearchFlightsPayload = {
            originSkyId: departureAirport.navigation.relevantFlightParams.skyId,
            destinationSkyId: arrivalAirport.navigation.relevantFlightParams.skyId,
            originEntityId: departureAirport.navigation.relevantFlightParams.entityId,     
            destinationEntityId: arrivalAirport.navigation.relevantFlightParams.entityId,
            date: formatDate(departureDate)!,
            returnDate: tripType === 'Round trip' ? formatDate(returnDate) : undefined,
            cabinClass: classType,
            adults: passengers.adults,
            currency: 'USD',
            market: 'en-US',
            countryCode: 'US', 
            sortBy: 'best',
        };
        
        flightSearchMutation.mutate(payload);

    }, [store, flightSearchMutation]);


    return {
        
        ...store,

        searchAirports,
        searchFlights,
        
    };
};