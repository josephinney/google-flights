"use client";

import React from 'react';
import { useFlightStore } from '@/store/flightStore';

const FlightSortBar = () => {
    const { itineraries, sortBy, setSortBy } = useFlightStore();

    const cheapestPrice = React.useMemo(() => {
        if (itineraries.length === 0) return 0;
        const prices = itineraries.map(it => it.price.raw);
        return Math.min(...prices);
    }, [itineraries]);

    const sortDescription = sortBy === 'best' 
        ? 'Ranked based on price and convenience' 
        : 'Ranked based on price (cheapest first)';

    const activeClasses = "border-blue-600 text-blue-600 bg-blue-50/50";
    const inactiveClasses = "border-transparent text-black/60 bg-transparent";

    return (
        <div className="w-full max-w-5xl space-y-4">
            {/* Buttons Best/Cheapest */}
            <div className="flex border border-black/20 rounded-lg overflow-hidden">
                <button
                    onClick={() => setSortBy('best')}
                    className={`flex-1 p-3 text-center font-semibold transition-colors ${sortBy === 'best' ? activeClasses : inactiveClasses}`}
                >
                    Best
                </button>
                <div className="w-px bg-black/20"></div> {/* Vertical divider */}
                <button
                    onClick={() => setSortBy('cheapest')}
                    className={`flex-1 p-3 text-center font-semibold transition-colors ${sortBy === 'cheapest' ? activeClasses : inactiveClasses}`}
                >
                    Cheapest
                    <span className="ml-2 font-normal text-black/60">
                        from <span className='text-green-700 font-semibold'>${Math.round(cheapestPrice)}</span>
                    </span>
                </button>
            </div>
            
            {/* Title and Description */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-black">Top departing flights</h2>
                    <p className="text-sm text-black/60">{sortDescription}</p>
                </div>
                
            </div>
        </div>
    );
};

export default FlightSortBar;