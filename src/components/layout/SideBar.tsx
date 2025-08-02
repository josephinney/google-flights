"use client"
import React, { useState } from 'react'
import {
    Flight,
    Hotel,
    Luggage,
    House,
    Menu,
    TravelExplore,
    Language,
    EditLocationOutlined,
    Timeline,
    AttachMoney,
    SettingsOutlined,
    HelpOutlineOutlined,
    FeedbackOutlined
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideBar() {


    const pathname = usePathname()


    const isActive = (path: string) => {
        
        if (path === '/') {
            return pathname === path;
        }
        return pathname === path || pathname.startsWith(path + '/');
    }

    const [isModalLanguageOpened, setisModalLanguageOpened] = useState(false);
    const [isModalCurrencyOpened, setisModalCurrencyOpened] = useState(false);
    const [isModalLocationOpened, setisModalLocationOpened] = useState(false);

    // Styles
    const isActiveStyles = 'text-[#1967d2] bg-[#1967d2]/10 border-[#1967d2]/5 border-r rounded-r-full'
    const isHovered = 'hover:bg-[#1967d2]/5'

    return (
        <div className='min-h-screen w-[18rem] shadow-md bg-white py-[0.5rem] flex flex-col gap-[1rem] text-[#3c4043]'>

            {/* Element - 1 */}
            <Link href={'/travel'} className={`${isActive('/travel') ? isActiveStyles : ''} w-[90%]`}>
                <div className={`px-[2rem] w-full h-10 flex items-center `}>
                    <div className='flex w-full flex-row items-center justify-start'>
                        <Luggage className='mr-7' /> <p>Travel</p>
                    </div>
                </div>
            </Link>

            {/* Element - 2 */}
            <Link href={'/explore'} className={`${isActive('/explore') ? isActiveStyles : ''} w-[90%]`}>
                <div className={`px-[2rem]  w-full h-10 flex items-center `}>
                    <div className='flex  w-full flex-row items-center justify-start'>
                        <TravelExplore className='mr-7 ' /> <p>Explore</p>
                    </div>
                </div>
            </Link>

            {/* Element - 3 */}
            <Link href={'/flights'} className={`${isActive('/flights') ? isActiveStyles : ''} w-[90%]`}>
                <div className={` px-[2rem]  w-full h-10 flex items-center `}>
                    <div className='flex w-full flex-row items-center justify-start'>
                        <Flight className='mr-7 rotate-45' /> <p>Flights</p>
                    </div>
                </div>
            </Link>

            {/* Element - 4 */}
            <Link href={'/hotels'} className={`${isActive('/hotels') ? isActiveStyles : ''} w-[90%]`}>
                <div className={` px-[2rem]  w-full h-10 flex items-center `}>
                    <div className='flex  w-full flex-row items-center justify-start'>
                        <Hotel className='mr-7' /> <p>Hotels</p>
                    </div>
                </div>
            </Link>


            {/* Element - 5 */}
            <Link href={'/vacation-rentals'} className={`${isActive('/vacation-rentals') ? isActiveStyles : ''} w-[90%]`}>
                <div className={` px-[2rem]  w-full h-10 flex items-center `}>
                    <div className='flex w-full flex-row items-center justify-start'>
                        <House className='mr-7' /> <p>Vacation rentals</p>
                    </div>
                </div>
            </Link>

            {/* Line  */}
            <div className='w-full border-t border-t-black/30'></div>

            {/* Element - 6 */}
            <Link href={'/tracked-flight-prices'} className={`${isActive('/tracked-flight-prices') ? isActiveStyles : ''} w-[90%]`}>
                <div className={` px-[2rem]  w-full h-10 flex items-center `}>
                    <div className='flex w-full flex-row items-center justify-start'>
                        <Timeline className='mr-7' /> <p>Tracked flight prices</p>
                    </div>
                </div>
            </Link>

            {/* Language */}
            <div className={` px-[2rem]  w-full h-10 flex items-center `}
                onClick={() => setisModalLanguageOpened(!isModalLanguageOpened)}
            >
                <div className='flex w-full flex-row items-center justify-start'>
                    <Language className='mr-7' /> <p>Change language</p>
                </div>
            </div>

            {/* Currency */}
            <div className={` px-[2rem]  w-full h-10 flex items-center `}
                onClick={() => setisModalCurrencyOpened(!isModalCurrencyOpened)}
            >
                <div className='flex w-full flex-row items-center justify-start'>
                    <AttachMoney className='mr-7' /> <p>Change currency</p>
                </div>
            </div>

            {/* Location */}
            <div className={` px-[2rem]  w-full h-10 flex items-center `}
                onClick={() => setisModalLocationOpened(!isModalLocationOpened)}
            >
                <div className='flex w-full flex-row items-center justify-start'>
                    <EditLocationOutlined className='mr-7' /> <p>Change location</p>
                </div>
            </div>

            {/* Line  */}
            <div className='w-full border-t border-t-black/30'></div>

            {/* Flight Settings */}
            <div className={` px-[2rem]  w-full h-10 flex items-center `}

            >
                <div className='flex w-full flex-row items-center justify-start'>
                    <SettingsOutlined className='mr-7' /> <p>Flight Settings</p>
                </div>
            </div>

            {/* Feedback */}
            <div className={` px-[2rem]  w-full h-10 flex items-center `}

            >
                <div className='flex w-full flex-row items-center justify-start'>
                    <FeedbackOutlined className='mr-7' /> <p>Feedback</p>
                </div>
            </div>

            {/* Help */}
            <div className={` px-[2rem]  w-full h-10 flex items-center `}

            >
                <div className='flex w-full flex-row items-center justify-start'>
                    <HelpOutlineOutlined className='mr-7' /> <p>Help</p>
                </div>
            </div>



            {/* Modals */}
            {isModalLanguageOpened && (<div>Modals</div>)}

        </div>

    )
}

export default SideBar