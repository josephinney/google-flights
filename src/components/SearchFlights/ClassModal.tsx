import React from 'react'
import { ClassType } from '@/types/flights'

interface ClassModalProps {
  onSelectClassType: (classType: ClassType) => void;
}

function ClassModal({onSelectClassType}: ClassModalProps) {

  const classTypes: ClassType[] = ['economy', 'premiumeconomy', 'business', 'first']

  return (
    <div className={`absolute z-10 left-45 sm:left-56 top-[45] bg-white shadow-md rounded-lg border border-black/5 
            w-[10rem] h-[15rem] py-[1rem]
        `}>
            {classTypes.map((type) => (
                <div key={type} onClick={() => onSelectClassType(type)}
                    className={` h-1/4 flex items-center hover:bg-black/5 text-[16px] px-[0.5rem]`}
                >
                    {type}
                </div>
            ))}
    </div>
  )
}

export default ClassModal