import React from 'react'
import { TripType } from '@/types/flights'

interface RoundTripModalProps {
    onSelectTripType: (tripType: TripType) => void;
}

function RoundTripModal({ onSelectTripType }: RoundTripModalProps) {

    const tripTypes: TripType[] = ['Round trip', 'One way', 'Multi-city'];

    return (
        <div className={`absolute z-10 left-0 top-[45] bg-white shadow-md rounded-lg border border-black/5
            w-[10rem] h-[15rem] flex flex-col py-[1rem]
        `}>
            {tripTypes.map((type) => (
                <div key={type} onClick={() => onSelectTripType(type)}
                    className={` h-1/3 flex items-center hover:bg-black/5 text-[16px] px-[0.5rem]`}
                >
                    {type}
                </div>
            ))}
        </div>
    )
}

export default RoundTripModal