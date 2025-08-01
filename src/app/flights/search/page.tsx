"use client";

import React from 'react';
import Image from 'next/image';
import { useFlightStore } from '@/store/flightStore';
import { CircularProgress } from '@mui/material';
import SearchFlights from '@/components/SearchFlights';
import { formatTime, formatDuration } from '@/utils/formatters';
import { FlightLeg, FlightItinerary } from '@/types/flights';
import { ChevronDown, ArrowRight } from 'lucide-react';

const ItineraryCard = ({ itinerary }: { itinerary: FlightItinerary }) => {


    const renderLegRow = (leg: FlightLeg) => {
        const airline = leg.carriers.marketing[0];

        return (
            <>
                {/* --- Movil (390px - 768px) --- */}
                <div className="md:hidden flex flex-row gap-2 items-start w-full">
                    {/* Logo */}
                    <div className="flex-shrink-0 pt-1">
                        <Image src={airline.logoUrl} alt={airline.name} width={24} height={24} />
                    </div>

                    {/* Times - Cities - Stops - Airline */}
                    <div className="flex-grow flex flex-col gap-1 text-sm">

                        <div className="flex items-center gap-1 font-semibold text-black">
                            <span>{formatTime(leg.departure)}</span>
                            <ArrowRight size={14} className="text-black/60" />
                            <span>{formatTime(leg.arrival)}</span>

                        </div>

                        <div className="flex gap-22 text-xs font-medium text-black/60">
                            <span>{leg.origin.displayCode}</span>
                            <span>{leg.destination.displayCode}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-black/60">
                            <span>{leg.stopCount === 0 ? 'Nonstop' : `${leg.stopCount} stop(s)`}</span>
                            <span>·</span>
                            <span>{formatDuration(leg.durationInMinutes)}</span>
                            <span>·</span>
                            <span>{airline.name}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className='flex items-center gap-2'>
                        <div className="flex flex-col items-end flex-shrink-0">
                            <p className="font-bold text-lg text-gray-900">{itinerary.price.formatted}</p>
                            <p className="text-xs text-black/60">Round trip</p>
                        </div>
                        <ChevronDown className="text-black/60" size={24} />
                    </div>
                </div>

                {/* --- Desktop/Tablet (768px) --- */}
                <div className="hidden md:flex flex-row gap-3 items-center w-full text-sm">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Image src={airline.logoUrl} alt={airline.name} width={32} height={32} />
                    </div>

                    {/* Times - Airline */}
                    <div className="flex flex-col gap-0.5 min-w-[140px] w-full">
                        <p className="font-semibold text-sm text-black">{formatTime(leg.departure)} – {formatTime(leg.arrival)}</p>
                        <p className="text-gray-600">{airline.name}</p>
                    </div>

                    {/* Duration - Cities */}
                    <div className="flex flex-col gap-0.5 w-full text-gray-600 min-w-[100px]">
                        <p>{formatDuration(leg.durationInMinutes)}</p>
                        <p className="font-medium">{leg.origin.displayCode} – {leg.destination.displayCode}</p>
                    </div>

                    {/* Stops */}
                    <div className="flex flex-col gap-0.5 w-full text-gray-600 min-w-[100px]">
                        <p>{leg.stopCount === 0 ? 'Nonstop' : `${leg.stopCount} stop(s)`}</p>
                        {/* <p className="text-xs">1 hr CPH</p> Stop Details */}
                    </div>

                    {/* Price and Caret */}
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col items-end">
                            <p className="font-bold text-xl text-gray-900">{itinerary.price.formatted}</p>
                            <p className="text-xs text-black/60">Round trip</p>
                        </div>
                    </div>

                    {/* Caret */}
                    <div className='text-lg'>
                        <ChevronDown className="text-black/60" size={24} />
                    </div>
                    

                </div>
            </>
        );
    };

    const outboundLeg = itinerary.legs[0];
    const returnLeg = itinerary.legs.length > 1 ? itinerary.legs[1] : null;

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4">
                {renderLegRow(outboundLeg)}
                {returnLeg && (
                    <>
                        <div className="border-t border-gray-200"></div>
                        {renderLegRow(returnLeg)}
                    </>
                )}
            </div>
        </div>
    );
};


const FlightResultsPage = () => {
    const { itineraries, isSearchingFlights, searchError } = useFlightStore();

    return (
        <div className="min-h-screen px-2 sm:px-4 flex flex-col items-center bg-gray-50 pb-10">
            <div className="mt-[3.5rem] flex flex-col items-center w-full max-w-[1440px]">
                <div className="mt-5 w-full flex items-center justify-center">
                    <SearchFlights />
                </div>
                <main className="mt-8 w-full max-w-5xl">
                    {isSearchingFlights && (
                        <div className="flex justify-center items-center py-10 gap-4">
                            <CircularProgress size={24} />
                            <p className="text-gray-600">Finding the best flights for you...</p>
                        </div>
                    )}
                    {searchError && (
                        <div className="text-center py-10 text-red-600"><p>Error: {searchError}</p></div>
                    )}
                    {!isSearchingFlights && !searchError && itineraries.length === 0 && (
                        <div className="text-center py-10 text-gray-600"><p>No flights found for this route.</p></div>
                    )}
                    {!isSearchingFlights && itineraries.length > 0 && (
                        <div className="space-y-2">
                            {itineraries.map((itinerary) => (
                                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default FlightResultsPage;