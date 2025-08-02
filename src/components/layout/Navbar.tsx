"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SideBar from './SideBar'
import {
  Flight,
  Hotel,
  Luggage,
  House,
  Menu,
  TravelExplore
} from '@mui/icons-material';


function Navbar() {

    const pathname = usePathname()
    
    const isActive = (path: string) => {
        
        if (path === '/') {
            return pathname === path;
        }
        return pathname === path || pathname.startsWith(path + '/');
    }

    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    // Styles
    const isActiveStyles = 'text-[#1967d2] bg-[#1967d2]/10 border-[#1967d2]/5'
    const isHovered = 'hover:bg-[#1967d2]/5'

    return (
        <div className={`z-1600 sticky bg-white w-full absolute top-0 left-0 h-[3.5rem] flex flex-row px-[2rem] py-[1rem] xl:px-[2rem] xl:py-[1.5rem] items-center justify-start border-b border-b-black/10 text-[#3c4043]`}>

            <div id='container' className='w-full justify-start flex flex-row items-center gap-[1.5rem] xl:justify-start'>

                <Menu onClick={() => setIsSideBarOpen(!isSideBarOpen)} className='h-[24px] w-[24px]'/>

                {/* Logo */}
                <div className='flex items-center '>
                    <Link href={'/flights'}>
                        <picture className=''>
                            {/* Desktop */}
                            <source
                                media="(min-width: 1280px)"
                                srcSet="/assets/svgs/Google_2015_logo.svg.webp"
                                width="74"
                                height="24"
                                className=''


                            />
                            {/* Tablet */}
                            <source
                                media="(min-width: 768px)"
                                srcSet="/assets/svgs/Google_2015_logo.svg.webp"
                                width="74"
                                height="24"
                                className=''
                            />
                            {/* Mobile (fallback) */}
                            <Image
                                src="/assets/svgs/Google_2015_logo.svg.webp"
                                alt="Image1"
                                width={74}
                                height={24}
                                className=""
                                quality={100}
                                priority
                            />
                        </picture>
                    </Link>
                </div>
                

                {/* Rutas  */}
                <div className={`flex hidden lg:flex flex-row items-center justify-center gap-[1rem]`}>

                    <Link href={'/travel'} className={`${isActive('/travel') ? isActiveStyles : ''} flex flex-row items-center justify-center
                        border border-black/10  rounded-full px-4 py-1.5 ${isHovered}
                    `}>
                       <Luggage className='mr-2 text-[#1967d2]'/> <p>Travel</p>
                    </Link>

                    <Link href={'/explore'} className={`${isActive('/explore') ? isActiveStyles : ''} flex flex-row items-center justify-center
                        border border-black/10  rounded-full px-4 py-1.5 ${isHovered}
                    `}>
                        <TravelExplore className='mr-2 text-[#1967d2]'/> <p>Explore</p>
                    </Link>
                    
                    <Link href={'/flights'} className={`${isActive('/flights') ? isActiveStyles : ''} flex flex-row items-center
                        border border-black/10 rounded-full px-4 py-1.5 ${isHovered}
                    `}>
                       <Flight className='mr-2 rotate-45 text-[#1967d2]'/>  <p>Flights</p>
                    </Link>

                    <Link href={'/hotels'} className={`${isActive('/hotels') ? isActiveStyles : ''} flex flex-row items-center justify-center
                        border border-black/10  rounded-full px-4 py-1.5 ${isHovered}
                    `}>
                        <Hotel className='mr-2 text-[#1967d2]'/> <p>Hotels</p>
                    </Link>

                    <Link href={'/vacation-rentals'} className={`${isActive('/vacation-rentals') ? isActiveStyles : ''} flex flex-row items-center justify-center
                        border border-black/10  rounded-full px-4 py-1.5 ${isHovered}
                    `}>
                        <House className='mr-2 text-[#1967d2]'/> <p>Vacation rentals</p>
                    </Link>

                    
                </div>

            </div>

            {/* SideBar Component */}
            <div className={`absolute top-[3.5rem] left-0 transform transition-transform duration-300 ease-in-out ${
                isSideBarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <SideBar />
            </div>

        </div>


    )
}

export default Navbar