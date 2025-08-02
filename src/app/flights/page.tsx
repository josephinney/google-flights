"use client"
import React from 'react'
import Image from 'next/image'
import { fontSizes } from '@/styles/constant'
import SearchFlights from '@/components/SearchFlights'
import ExploreDestinations from '@/components/ExploreDestinations'
import FlightSearchFooter from '@/components/flights/FlightSearchFooter'


function Flights() {

  return (
    <div className={`min-h-screen px-4 flex flex-col items-center`}>

      <div id='container' className={` flex flex-col gap-5 items-center h-[100px] w-full max-w-[1440px]`}>

        <Image
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
          alt="Image1"
          width={0}
          height={0}
          className="w-auto h-auto"
          quality={100}
          priority
        />

        {/* Title */}
        <h1 className={`${fontSizes.size56} md:font-sans`}>Flights</h1>

        {/* Search Flights Component */}
        <div className={`mt-5 w-full flex items-center justify-center`}>
          <SearchFlights />
        </div>
        
        {/* Explore destinations */}
        <div className=' border-black/10 mt-5 w-full max-w-[1024px]'>
          <ExploreDestinations />
        </div>

        {/* Section Footer */}
        <div className='border-t border-black/10 mt-5 w-full max-w-[1024px]'>
          <FlightSearchFooter />
        </div>

        
      </div>



    </div>
  )
}

export default Flights 