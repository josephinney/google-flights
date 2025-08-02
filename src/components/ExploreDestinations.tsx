"use client"

import React, { useMemo } from 'react';
import Card from '@/components/explore/Card';
import { mockFlightApiResponse } from '@/mocks/mockFlightResponse';
import { formatDuration } from '@/utils/formatters';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useFlightStore } from '@/store/flightStore';

function ExploreDestinations() {

  const router = useRouter(); 
  const setSelectedItinerary = useFlightStore((state) => state.setSelectedItinerary);

  
  const handleCardClick = (itineraryId: string) => {
    
    const clickedItinerary = mockFlightApiResponse.data.itineraries.find(it => it.id === itineraryId);

    if (clickedItinerary) {
      
      setSelectedItinerary(clickedItinerary);
      router.push('/flights/booking');
    } else {
      console.error("Itinerary not found in mock data!");
    }
  };

  const destinations = useMemo(() => {
    return mockFlightApiResponse.data.itineraries.slice(0, 4).map((itinerary, index) => {
      const outboundLeg = itinerary.legs[0];
      const returnLeg = itinerary.legs[1];

      const departureDate = dayjs(outboundLeg.departure).format('MMM D');
      const returnDate = returnLeg ? dayjs(returnLeg.departure).format('MMM D') : '';
      const dateString = returnLeg ? `${departureDate} — ${returnDate}` : departureDate;
      const stopsString = outboundLeg.stopCount === 0 ? 'Nonstop' : `${outboundLeg.stopCount} stop${outboundLeg.stopCount !== 1 ? 's' : ''}`;

      
      const localImages = [
        '/assets/images/ny-1.jpeg',
        '/assets/images/ny-2.jpeg',
        '/assets/images/ny-3.jpeg',
        '/assets/images/ny-4.jpg',
      ];

      return {
        id: itinerary.id,
        imageUrl: localImages[index], 
        destination: outboundLeg.destination.name.split(',')[0],
        dates: dateString,
        price: itinerary.price.formatted,
        stops: stopsString,
        flightDuration: formatDuration(outboundLeg.durationInMinutes),
      };
    });
  }, []);


  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      {/* Main Container */}
      <div className="flex flex-col gap-6 sm:gap-8">

        {/* ROW 1: Text Section (sin cambios) */}
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Find cheap flights from London to New York
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Discover amazing destinations with the best flight deals.
            Compare prices and find your perfect getaway.
          </p>
        </div>

        {/* ROW 2: Map Section (sin cambios) */}
        <div className="w-full h-64 sm:h-80 lg:h-96">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* World Map Placeholder */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 sm:grid-cols-12 grid-rows-6 sm:grid-rows-8 h-full w-full">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="border border-blue-300 sm:block hidden"></div>
                ))}
                {[...Array(96)].map((_, i) => (
                  <div key={i + 48} className="border border-blue-300 hidden sm:block"></div>
                ))}
              </div>
            </div>

            {/* Central Button */}
            <button className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              Explore destinations
            </button>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute top-12 right-8 w-2 h-2 bg-blue-500 rounded-full opacity-40"></div>
            <div className="absolute bottom-8 left-12 w-4 h-4 bg-blue-300 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-600 rounded-full opacity-70"></div>
          </div>
        </div>

        {/* ROW 3: Mapeo de los datos transformados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              imageUrl={destination.imageUrl}
              destination={destination.destination}
              dates={destination.dates}
              price={destination.price}
              stops={destination.stops}
              flightDuration={destination.flightDuration}
              onClick={() => handleCardClick(destination.id)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default ExploreDestinations;

