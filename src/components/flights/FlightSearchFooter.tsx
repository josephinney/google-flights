import React from 'react';
import { Globe, MapPin, CreditCard } from 'lucide-react';

const FlightSearchFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Language, Location, Currency */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 sm:gap-8 mb-6">
          {/* Language */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-medium">Language • English (United States)</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Location • United States</span>
          </div>
          
          {/* Currency */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
            <CreditCard className="w-5 h-5" />
            <span className="text-sm font-medium">Currency • USD</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            About
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Privacy
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Terms
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Join user studies
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Feedback
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            Help Center
          </a>
        </div>
        
        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Displayed currencies may differ from the currencies used to purchase flights.{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FlightSearchFooter;