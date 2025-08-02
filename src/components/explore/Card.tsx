import React from 'react';
import Image from 'next/image';

interface CardProps {
  imageUrl: string;
  destination: string;
  dates: string;
  price: string;
  stops: string;
  flightDuration: string;
  onClick: () => void;
}

function Card({ imageUrl, destination, dates, price, stops, flightDuration, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={destination}
          fill 
          style={{ objectFit: 'cover' }} 
          className="group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        />

      </div>

      {/* Content */}
      <div className="p-4">
        {/* Destination and Price */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-black">{destination}</h3>
          <span className="text-2xl font-bold text-blue-600">{price}</span>
        </div>

        {/* Dates */}
        <p className="text-black/60 mb-3 text-sm">{dates}</p>

        {/* Flight Details */}
        <div className="flex justify-between items-center text-sm text-black/60">
          <span>{stops}</span>
          <span>•</span>
          <span>{flightDuration}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;