"use client";

import React, { useEffect } from 'react';
import { useFlightStore } from '@/store/flightStore';
import { useRouter } from 'next/navigation';
import { ItineraryCard } from '@/components/SearchFlights/ItineraryCard';
import { ArrowRight, Briefcase, XCircle } from 'lucide-react';
import Image from 'next/image';
import FlightSearchFooter from '@/components/flights/FlightSearchFooter';

const FlightBookingPage = () => {
    const router = useRouter();
    const { selectedItinerary, departureAirport, arrivalAirport } = useFlightStore();

    useEffect(() => {
        if (!selectedItinerary) {
            router.replace('/flights');
        }
    }, [selectedItinerary, router]);

    
    if (!selectedItinerary) {
        return <div className="flex h-screen items-center justify-center">Loading selection...</div>;
    }

    const outboundItinerary = {
        ...selectedItinerary,
        legs: [selectedItinerary.legs[0]],
    };
   
    const returnItinerary = selectedItinerary.legs[1] ? {
        ...selectedItinerary,
        legs: [selectedItinerary.legs[1]],
    } : null;

    // --- Booking Options for Demo purpose ---
    const bookingOptions = [
        { name: `Book with ${selectedItinerary.legs[0].carriers.marketing[0].name}`, price: selectedItinerary.price.raw, logo: selectedItinerary.legs[0].carriers.marketing[0].logoUrl, type: 'Airline' },
        { name: 'Book with Booking.com', price: selectedItinerary.price.raw + 12, logo: '/booking-logo.png' },
        { name: 'Book with Expedia', price: selectedItinerary.price.raw + 22, logo: '/expedia-logo.webp' },
    ];

    return (
        <div className="bg-white min-h-screen mt-[3.5rem]">
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                
                {/* departure, Arrival and Price */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-4 text-2xl md:text-3xl font-bold">
                            <h1>{departureAirport?.presentation.title || 'Origin'}</h1>
                            <ArrowRight className="text-gray-400 mt-1" />
                            <h1>{arrivalAirport?.presentation.title || 'Destination'}</h1>
                        </div>
                        <p className="text-gray-500 mt-1">Round trip · Economy · 1 passenger</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl md:text-3xl font-bold">{selectedItinerary.price.formatted}</p>
                        <p className="text-sm text-gray-500">Lowest total price</p>
                    </div>
                </div>

                {/* "Selected flights" */}
                <h2 className="text-xl font-bold mb-3">Selected flights</h2>
                <div className="space-y-3 mb-6">
                    <ItineraryCard
                        itinerary={outboundItinerary}
                        showPrice={false}
                        isReviewMode={true}
                    />
                    {returnItinerary && (
                        <ItineraryCard
                            itinerary={returnItinerary}
                            showPrice={false}
                            isReviewMode={true}
                        />
                    )}
                </div>

                {/* Luggage (Simulated ) */}
                <div className="bg-white border border-black/20 rounded-lg p-4 text-sm text-black/60 space-y-2 mb-8">
                    <div className="flex items-center gap-2"><Briefcase size={16} /> 1 free carry-on</div>
                    <div className="flex items-center gap-2"><XCircle size={16} /> No checked bags</div>
                </div>

                {/* "Booking options" */}
                <h2 className="text-xl font-bold mb-3">Booking options</h2>
                <div className="bg-white border border-black/20 rounded-lg divide-y divide-black/20">
                    {bookingOptions.map(opt => (
                        <div key={opt.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                            <div className="flex items-center gap-4">
                                <Image src={opt.logo || '/placeholder.png'} alt={opt.name} width={32} height={32} className="rounded-md" />
                                <div>
                                    <p className="font-semibold">{opt.name}</p>
                                    {opt.type && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{opt.type}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-6 self-end sm:self-center">
                                <p className="font-semibold text-lg">${Math.round(opt.price || 0)}</p>
                                <button
                                    onClick={() => alert('You will be redirected to the booking site.')}
                                    className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Section Footer */}
                <div className='border-t border-black/10 mt-5 w-full max-w-[1024px]'>
                    <FlightSearchFooter />
                </div>
            </div>


        </div>
    );
};

export default FlightBookingPage;