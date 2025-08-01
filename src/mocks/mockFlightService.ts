import {
    SearchAirportPayload,
    AirportSuggestion,
    SearchFlightsPayload,
    SearchFlightsResponse
} from '@/types/flights';
import { mockAirportApiResponse } from './mockAirportResponse';
import { mockFlightApiResponse } from './mockFlightResponse';

const mockFlightService = {
    
    
    async searchAirport(payload: SearchAirportPayload): Promise<AirportSuggestion[]> {
        console.log('[MOCK FlightService] searchAirport called with:', payload);
        await new Promise(resolve => setTimeout(resolve, 300));

        const results = mockAirportApiResponse.data.filter(suggestion =>
            suggestion.presentation.suggestionTitle.toLowerCase().includes(payload.query.toLowerCase())
        );
        return Promise.resolve(results);
    },

    async searchFlights(payload: SearchFlightsPayload): Promise<SearchFlightsResponse> {
        console.log('[MOCK FlightService] searchFlights called with:', payload);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return Promise.resolve(mockFlightApiResponse);
    }
};

export default mockFlightService;