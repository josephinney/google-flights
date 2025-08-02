"use client"
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatTime, formatDuration } from '@/utils/formatters';
import { FlightLeg, FlightItinerary } from '@/types/flights';
import { ChevronDown, ArrowRight, ChevronUp } from 'lucide-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useFlightStore } from '@/store/flightStore';

interface ItineraryCardProps {
    itinerary: FlightItinerary;
    showPrice?: boolean;
    isReviewMode?: boolean;
}

/**
* Component to display flight leg details.
* Shows each segment and stopovers.
*/
const FlightLegDetails = ({ leg }: { leg: FlightLeg }) => {
    return (
        <div className="bg-white px-4 py-2">
            {leg.segments.map((segment, index) => {
                const isLastSegment = index === leg.segments.length - 1;
                const airline = leg.carriers.marketing[0];

                let layoverDuration = '';
                if (!isLastSegment) {
                    const nextSegment = leg.segments[index + 1];
                    const layoverMinutes = dayjs(nextSegment.departure).diff(dayjs(segment.arrival), 'minute');
                    layoverDuration = formatDuration(layoverMinutes);
                }

                return (
                    <div key={segment.id}>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 border-2 border-black/50 rounded-full bg-white mt-1"></div>
                                <div className="w-[1px] flex-grow border-l-3 border-dotted border-black/50 my-1"></div>
                            </div>
                            <div className="flex-grow pb-4 pt-0.5">
                                <p className="font-semibold text-black text-sm">{formatTime(segment.departure)} · {segment.origin.name}</p>
                                <p className="text-sm text-black/60 pl-6 my-1">Travel time: {formatDuration(segment.durationInMinutes)}</p>
                                <p className="text-xs text-black/60 mt-2">{airline.name} · Economy · {segment.flightNumber}</p>
                            </div>
                        </div>

                        {!isLastSegment && (
                            <div className="pl-8 py-3 my-2 border-y border-black/10">
                                <p className="text-sm text-black/60 font-medium">
                                    {layoverDuration} layover · {segment.destination.name}
                                </p>
                            </div>
                        )}

                        {isLastSegment && (
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-[1px] flex-grow border-l-3 border-dotted border-black/50 my-1"></div>
                                    <div className="w-3 h-3 border-2 border-black/50 rounded-full bg-white mb-1"></div>
                                </div>
                                <div className="flex-grow pt-0.5">
                                    <p className="font-semibold text-black text-sm">{formatTime(segment.arrival)} · {segment.destination.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const ItineraryCard = ({ itinerary, showPrice = true, isReviewMode = false }: ItineraryCardProps) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const [maxHeight, setMaxHeight] = useState('0px');
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleExpansion = () => setIsExpanded(prev => !prev);

    const router = useRouter();
    const setSelectedItinerary = useFlightStore((state) => state.setSelectedItinerary);

    useEffect(() => {
        if (contentRef.current) {
            if (isExpanded) {
                setMaxHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setMaxHeight('0px');
            }
        }
    }, [isExpanded]);

    const outboundLeg = itinerary.legs[0];

    const returnLeg = itinerary.legs.length > 1 ? itinerary.legs[1] : null;

    const handleSelectFlight = () => {
        setSelectedItinerary(itinerary);
        router.push('/flights/booking');
    };

    const renderLegRow = (leg: FlightLeg) => {

        const airline = leg.carriers.marketing[0];

        const CaretIcon = isExpanded ? ChevronUp : ChevronDown;

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
                    {showPrice && (
                        <div className='flex items-center gap-2'>
                            <div className="flex flex-col items-end flex-shrink-0">
                                <p className="font-bold text-lg text-black">{itinerary.price.formatted}</p>
                                <p className="text-xs text-black/60">Round trip</p>
                            </div>
                        </div>
                    )}

                    {/* Caret */}
                    <div className='text-lg '>
                        <CaretIcon className="text-black/60 cursor-pointer border border-black/1 rounded-full hover:bg-black/20" size={24} onClick={toggleExpansion} />
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
                        <p className="text-black/60">{airline.name}</p>
                    </div>

                    {/* Duration - Cities */}
                    <div className="flex flex-col gap-0.5 w-full text-black/60 min-w-[100px]">
                        <p>{formatDuration(leg.durationInMinutes)}</p>
                        <p className="font-medium">{leg.origin.displayCode} – {leg.destination.displayCode}</p>
                    </div>

                    {/* Stops */}
                    <div className="flex flex-col gap-0.5 w-full text-black/60 min-w-[100px]">
                        <p>{leg.stopCount === 0 ? 'Nonstop' : `${leg.stopCount} stop(s)`}</p>
                        {/* <p className="text-xs">1 hr CPH</p> Stop Details */}
                    </div>

                    {/* Price */}
                    {showPrice && (
                        <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-col items-end">
                            <p className="font-bold text-xl text-black">{itinerary.price.formatted}</p>
                            <p className="text-xs text-black/60">Round trip</p>
                        </div>
                    </div>
                    )}

                    {/* Caret */}
                    <div className='text-lg '>
                        <CaretIcon className="text-black/60 cursor-pointer border border-black/1 rounded-full hover:bg-black/20" size={24} onClick={toggleExpansion} />
                    </div>


                </div>
            </>
        );
    };



    return (
        <div className="bg-white p-4 rounded-lg border border-black/10 hover:shadow-md transition-shadow">

            <div className="flex flex-col gap-4">
                {renderLegRow(outboundLeg)}
                {/* {returnLeg && (
                    <>
                        <div className="border-t border-black/10"></div>
                        {renderLegRow(returnLeg)}
                    </>
                )} */}
            </div>

            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out border-t border-black/10"
                style={{
                    maxHeight: maxHeight,
                    opacity: isExpanded ? 1 : 0
                }}
            >
                <div className="pt-0">
                    <FlightLegDetails leg={outboundLeg} />
                    {returnLeg && (
                        <div className="border-t-4 border-black/10">
                            <p className='mt-2 font-bold'>Return</p>
                            <FlightLegDetails leg={returnLeg} />
                        </div>
                    )}

                    <div className="bg-white p-4 flex justify-end">
                        {/* <button 
                            onClick={handleSelectFlight}
                            className={`border border-black/10 bg-blue-600 rounded-full px-2 py-1 text-white font-semibold hover:cursor-pointer hover:opacity-90`}
                        >
                            Select flight
                        </button> */}
                        {!isReviewMode && (
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={handleSelectFlight}
                                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Select flight
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
};






