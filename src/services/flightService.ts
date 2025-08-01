import { apiClient } from './apiClient';
import {
    SearchAirportPayload,
    SearchAirportResponse,
    SearchFlightsPayload,
    SearchFlightsResponse,
    AirportSuggestion 
} from '@/types/flights';

/**
 * The FlightService class encapsulates all API calls related to flights.
 * It uses the pre-configured apiClient to make requests.
 */
class FlightService {
    private readonly baseUrl = '/flights';

    /**
     * Searches for airports based on a query string.
     * It also transforms the API response to a simpler format expected by the UI component.
     * @param payload - The search query and locale.
     * @returns A promise that resolves to an array of simplified airport objects.
     */
    async searchAirport(payload: SearchAirportPayload): Promise<AirportSuggestion[]> {
        const response = await apiClient.get<SearchAirportResponse>(`${this.baseUrl}/searchAirport`, {
            params: payload, 
        });
        return response.data.data;
    }

    /**
     * Searches for flights based on the specified criteria.
     * @param payload - The flight search criteria (origin, destination, dates, etc.).
     * @returns A promise that resolves to the full flight search response.
     */
    async searchFlights(payload: SearchFlightsPayload): Promise<SearchFlightsResponse> {
        
        const cleanPayload: { [key: string]: any } = { ...payload };

        
        Object.keys(cleanPayload).forEach(key => {
            if (cleanPayload[key] === undefined || cleanPayload[key] === null || cleanPayload[key] === '') {
                delete cleanPayload[key];
            }
        });
        
        
        const response = await apiClient.get<SearchFlightsResponse>(`${this.baseUrl}/searchFlights`, {
            params: cleanPayload,
        });

        return response.data;
    }
}


export default new FlightService();