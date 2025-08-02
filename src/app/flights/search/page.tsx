"use client";
import React, { useMemo, useState } from 'react';
import { ItineraryCard } from '@/components/SearchFlights/ItineraryCard';
import { useFlightStore } from '@/store/flightStore';
import { CircularProgress } from '@mui/material';
import SearchFlights from '@/components/SearchFlights';
import FlightSortBar from '@/components/flights/FlightSortBar'
import FlightFilters from '@/components/flights/FlightFilters';
import { ChevronDown } from 'lucide-react';
import FlightSearchFooter from '@/components/flights/FlightSearchFooter';

const FlightResultsPage = () => {
    const { itineraries, isSearchingFlights, searchError, filters, sortBy } = useFlightStore();

    // Complete filtering and sorting logic
    const finalItineraries = useMemo(() => {
        if (!itineraries) return [];

        // 1. Filtering
        const filtered = itineraries.filter(itinerary => {
            // Filter based on the outbound leg 
            const leg = itinerary.legs[0];

            // Stop Fiilter
            if (filters.maxStops !== null && leg.stopCount > filters.maxStops) {
                return false;
            }
            // Price Filter
            if (filters.maxPrice !== null && itinerary.price.raw > filters.maxPrice) {
                return false;
            }
            // Duration Filter
            if (filters.maxDuration !== null && leg.durationInMinutes > filters.maxDuration) {
                return false;
            }
            // Airline filter
            if (filters.allowedAirlines && filters.allowedAirlines.length > 0) {
                const airlineId = leg.carriers.marketing[0].id;
                if (!filters.allowedAirlines.includes(airlineId)) {
                    return false;
                }
            }

            return true;
        });

        // 2. Sorting (after filtering)
        return [...filtered].sort((a, b) => {
            if (sortBy === 'cheapest') {
                return a.price.raw - b.price.raw;
            }
            // For "best", I use the 'score' from the mock data. A higher score is better
            return b.score - a.score;
        });

    }, [itineraries, filters, sortBy]);


    const topFlights = finalItineraries.slice(0, 3);
    const otherFlights = finalItineraries.slice(3);

    const [showAllOtherFlights, setShowAllOtherFlights] = useState(false);
    const visibleOtherFlights = showAllOtherFlights ? otherFlights : otherFlights.slice(0, 5);



    const filterBounds = useMemo(() => {
        if (itineraries.length === 0) {
            return { minPrice: 0, maxPrice: 1000, minDuration: 0, maxDuration: 1440 };
        }
        const prices = itineraries.map(it => it.price.raw);
        const durations = itineraries.map(it => it.legs[0].durationInMinutes);

        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
            minDuration: Math.min(...durations),
            maxDuration: Math.max(...durations)
        };
    }, [itineraries]);

    return (
        <div className="min-h-screen px-2 sm:px-4 flex flex-col items-center bg-white pb-10">
            <div className="mt-[3.5rem] flex flex-col items-center w-full max-w-[1440px]">

                <div className="mt-5 w-full flex items-center justify-center">
                    <SearchFlights />
                </div>

                <main className="mt-8 w-full max-w-[1024px]">

                    {itineraries.length > 0 && (
                        <div className={`flex flex-col gap-3 mb-2`}>
                            <FlightFilters bounds={filterBounds} />
                            <FlightSortBar />
                        </div>
                    )}

                    {isSearchingFlights && (
                        <div className="flex justify-center items-center py-10 gap-4">
                            <CircularProgress size={24} />
                            <p className="text-gray-600">
                                Finding the best flights for you...
                            </p>
                        </div>
                    )}
                    {searchError && (
                        <div className="text-center py-10 text-red-600">
                            <p>Error: {searchError}</p>
                        </div>
                    )}

                    {!isSearchingFlights && !searchError && itineraries.length === 0 && (
                        <div className="text-center py-10 text-gray-600">
                            <p>No flights found for this route.</p>
                        </div>
                    )}

                    {!isSearchingFlights && itineraries.length > 0 && (
                        <>
                            {finalItineraries.length > 0 ? (
                                <div className="space-y-6">
                                    {/* --- TOP DEPARTING FLIGHTS --- */}
                                    <div className="space-y-2">
                                        {topFlights.map((itinerary) => (
                                            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                                        ))}
                                    </div>

                                    {/* --- OTHER DEPARTING FLIGHTS --- */}
                                    {otherFlights.length > 0 && (
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-bold text-black pt-4 border-t border-black/10">
                                                Other departing flights
                                            </h2>
                                            {visibleOtherFlights.map((itinerary) => (
                                                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                                            ))}

                                            {/* --- VIEW MORE FLIGHTS --- */}
                                            {otherFlights.length > 5 && !showAllOtherFlights && (
                                                <div className="pt-2">
                                                    <button
                                                        onClick={() => setShowAllOtherFlights(true)}
                                                        className="w-full flex justify-center items-center gap-2 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        View more flights
                                                        <ChevronDown size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                
                                <div className="text-center py-10 text-gray-600">
                                    <p>No flights match your current filters. Try adjusting them.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
            
            {/* Section Footer */}
            <div className='border-t border-black/10 mt-5 w-full max-w-[1024px]'>
                <FlightSearchFooter />
            </div>
        </div>
    );
};

export default FlightResultsPage;