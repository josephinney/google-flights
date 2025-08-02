"use client";

import React, { useMemo, useState } from 'react';
import { useFlightStore } from '@/store/flightStore';
import { ChevronDown, X, RotateCcw } from 'lucide-react';
import { formatDuration } from '@/utils/formatters';

type ActiveModal = 'stops' | 'price' | 'duration' | 'airlines' | null;

const StopsModal = ({ onClose }: { onClose: () => void }) => {

    const { filters, setFilters } = useFlightStore();

    const stopOptions = [
        { label: 'Any number of stops', value: null },
        { label: 'Nonstop only', value: 0 },
        { label: '1 stop or fewer', value: 1 },
        { label: '2 stops or fewer', value: 2 },
    ];

    return (
        <div className="absolute top-full mt-2 w-60 bg-white border border-black/20 rounded-lg shadow-xl p-4 z-20">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Stops</h3>
                <X size={18} className="cursor-pointer text-black/60 hover:text-gray-800" onClick={onClose} />
            </div>
            <div className="space-y-3 text-sm">
                {stopOptions.map(opt => (
                    <label key={opt.label} className="flex items-center gap-3 cursor-pointer text-black/60">
                        <input
                            type="radio"
                            name="stops"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            checked={filters.maxStops === opt.value}
                            onChange={() => { setFilters({ maxStops: opt.value }); onClose(); }}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
};


const PriceModal = ({ maxPrice, onClose }: { maxPrice: number, onClose: () => void }) => {
    const { filters, setFilters } = useFlightStore();

    // Local state for the slider, to not update the store in every move
    const [currentValue, setCurrentValue] = useState(filters.maxPrice ?? maxPrice);

    const handleMouseUp = () => {
        setFilters({ maxPrice: currentValue });
    };

    return (
        <div className="absolute top-full mt-2 w-64 bg-white border border-black/20 rounded-lg shadow-xl p-4 z-20">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Price</h3>
                <X size={18} className="cursor-pointer text-black/60" onClick={onClose} />
            </div>
            <p className="text-sm text-blue-600 font-semibold mb-2">up to ${Math.round(currentValue)}</p>
            <input
                type="range"
                min="0"
                max={maxPrice}
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                className="w-full"
            />
        </div>
    );
};

const DurationModal = ({ maxDuration, onClose }: { maxDuration: number, onClose: () => void }) => {
    const { filters, setFilters } = useFlightStore();
    const [currentValue, setCurrentValue] = useState(filters.maxDuration ?? maxDuration);

    const handleMouseUp = () => {
        setFilters({ maxDuration: currentValue });
    };

    return (
        <div className="absolute top-full mt-2 w-64 bg-white border border-black/20 rounded-lg shadow-xl p-4 z-20">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Duration</h3>
                <X size={18} className="cursor-pointer text-black/60" onClick={onClose} />
            </div>
            <p className="text-sm text-blue-600 font-semibold mb-2">Under {formatDuration(currentValue)}</p>
            <input
                type="range"
                min="0"
                max={maxDuration}
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
                className="w-full"
            />
        </div>
    );
};


const AirlinesModal = ({ onClose }: { onClose: () => void }) => {
    const { itineraries, filters, setFilters } = useFlightStore();

    const availableAirlines = useMemo(() => {
        const airlines = new Map<number, { name: string, logoUrl: string }>();
        itineraries.forEach(it => {
            const airline = it.legs[0].carriers.marketing[0];
            if (!airlines.has(airline.id)) {
                airlines.set(airline.id, { name: airline.name, logoUrl: airline.logoUrl });
            }
        });
        return Array.from(airlines.entries()).map(([id, data]) => ({ id, ...data }));
    }, [itineraries]);

    const handleCheckboxChange = (airlineId: number) => {
        const currentSelection = filters.allowedAirlines || [];
        const newSelection = currentSelection.includes(airlineId)
            ? currentSelection.filter(id => id !== airlineId)
            : [...currentSelection, airlineId];

        setFilters({ allowedAirlines: newSelection.length > 0 ? newSelection : null });
    };

    return (
        <div className="absolute top-full mt-2 w-60 bg-white border border-black/20 rounded-lg shadow-xl p-4 z-20">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Airlines</h3>
                <X size={18} className="cursor-pointer text-black/60" onClick={onClose} />
            </div>
            <div className="space-y-3 text-sm max-h-60 overflow-y-auto">
                {availableAirlines.map(airline => (
                    <label key={airline.id} className="flex items-center gap-3 cursor-pointer text-black/60">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded"
                            checked={filters.allowedAirlines?.includes(airline.id) || false}
                            onChange={() => handleCheckboxChange(airline.id)}
                        />
                        {airline.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

// --- Main Component ---
const FlightFilters = (
    { bounds }: { bounds: { maxPrice: number, maxDuration: number } }
) => {
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const { resetFilters } = useFlightStore();


    const filterButtons = [
        { id: 'stops', label: 'Stops' },
        { id: 'airlines', label: 'Airlines' },
        { id: 'price', label: 'Price' },
        { id: 'duration', label: 'Duration' },
    ] as const;

    const handleButtonClick = (modalId: ActiveModal) => {
        setActiveModal(current => (current === modalId ? null : modalId));
    };

    const handleClearFilters = () => {
        resetFilters();
        setActiveModal(null);
    };

    return (
        <div className="w-full max-w-5xl">
            <div className="flex flex-wrap items-center gap-2 text-sm">

                <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <RotateCcw size={14} className="text-gray-600" />
                    <p className='text-black/60'>Clear filters</p>
                </button>


                {filterButtons.map(btn => (
                    <div key={btn.id} className="relative">
                        <button
                            onClick={() => handleButtonClick(btn.id as ActiveModal)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <span className='text-black/60'>{btn.label}</span>
                            <ChevronDown size={14} className="text-black/60" />
                        </button>

                        {activeModal === btn.id && (
                            <>
                                {btn.id === 'stops' && <StopsModal onClose={() => setActiveModal(null)} />}
                                {btn.id === 'price' && <PriceModal maxPrice={bounds.maxPrice} onClose={() => setActiveModal(null)} />}
                                {btn.id === 'duration' && <DurationModal maxDuration={bounds.maxDuration} onClose={() => setActiveModal(null)} />}
                                {btn.id === 'airlines' && <AirlinesModal onClose={() => setActiveModal(null)} />}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightFilters;