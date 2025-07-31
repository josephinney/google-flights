import React from 'react'
import { SyncAlt, PersonOutlineOutlined, ExpandLess, ExpandMore } from '@mui/icons-material'
import {textColors, fontSizes} from '@/styles/constant'
import LocationSwapper from './SearchFlights/LocationSwapper'

function SearchFlights() {


  const isHovered = `hover:bg-black/5 hover:border hover:border-black/1 hover:rounded-md hover:px-[0.25rem] hover:py-[0.25rem]`

  return (
    <div className={`h-[190px] flex flex-col border border-black/5 w-full max-w-[1024px] rounded-xl shadow-lg bg-white py-[1rem] px-[0.5rem] gap-[0.5rem] ${textColors.textGray}`}>
        
        {/* Trip - Passengers - Class */}
        <div className={`h-[60px] px-[0.5rem] py-[0.5rem] flex flex-row gap-[0.5rem]`}>
            
            <div className={`${isHovered} flex flex-row gap-[0.5rem] items-center`}>
                <SyncAlt className={`${textColors.textGray}`}/>

                <p className={`${fontSizes.size14}`}>Round trip</p>

                <ExpandMore/>
            </div>
            
            <div className={`${isHovered} flex flex-row gap-[0.5rem] items-center`}>
                <PersonOutlineOutlined className={`${textColors.textGray}`}/>

                <p className={`${fontSizes.size14}`}>1</p>

                <ExpandMore />
            </div>
            
            <div className={`${isHovered} flex flex-row gap-[0.5rem] items-center`}>
                <p className={`${fontSizes.size14}`}>Economy</p>

                <ExpandMore/>
            </div>
        </div>

        {/* Where from? - Where to? */}
        <div className={` h-[60px] flex items-center w-full`}>
            <LocationSwapper/>
        </div>

        {/* Departure date - Return date */}
        <div className={`border h-[60px]`}>Elemento3</div>
    </div>
  )
}

export default SearchFlights