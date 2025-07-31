"use client"
import React, { useState } from 'react'
import { SyncAlt, PersonOutlineOutlined, ExpandLess, ExpandMore } from '@mui/icons-material'
import { fontSizes } from '@/styles/constant';

function LocationSwapper() {

    const [fromLocation, setFromLocation] = useState<string>();
    const [toLocation, setToLocation] = useState<string>();

    const handleSwap = () => {
        const temp = fromLocation;
        setFromLocation(toLocation);
        setToLocation(temp);
    };

    return (
        <div className={`flex flex-row  items-center w-full gap-[0.5rem]`}>

            <div className='border border-black/10 hover:border-black/30 rounded-md py-2 px-1 w-full'>
                <input
                    className={`${fontSizes.size14} w-full focus:outline-none`}
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                />
            </div>

            <div className='hover:bg-black/10 p-1 rounded-full' onClick={handleSwap}>
                <SyncAlt/>
            </div>

            <div className='border border-black/10 hover:border-black/30 rounded-md py-2 px-1 w-full'>
                <input 
                    className={`${fontSizes.size14} w-full focus:outline-none`}
                    type="text"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)} 
                />
            </div>
        </div>
    )
}

export default LocationSwapper