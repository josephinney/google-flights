import React from 'react'
import { PassengerCounts } from '@/types/flights'
import { Add, Remove } from '@mui/icons-material'
import { textColors } from '@/styles/constant'

interface PassengerModalProps {
  passengers: PassengerCounts;
  onPassengerChange: (category: keyof PassengerCounts, value: number) => void;
  onClose: () => void;
  onDone: () => void;
}

const CounterRow: React.FC<{
  label: string;
  description?: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isIncrementDisabled?: boolean;
  isDecrementDisabled?: boolean;
}> = ({ label, description, count, onIncrement, onDecrement, isIncrementDisabled, isDecrementDisabled }) => (

  <div className="flex items-center justify-between gap-[2rem]">
    
    <div>
      <p className={`${textColors.textGray} text-[14px]`}>{label}</p>
      {description && <p className="text-[12px] text-black/50">{description}</p>}
    </div>

    <div className="flex items-center gap-x-4">
      
      <button
        onClick={onDecrement}
        disabled={isDecrementDisabled}
        className="p-1 rounded-md bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Remove fontSize="small" className="text-blue-600" />
      </button>
      
      <span className={`${textColors.textGray} text-[16px] w-4 text-center`}>{count}</span>
      
      <button
        onClick={onIncrement}
        disabled={isIncrementDisabled}
        className="p-1 rounded-md bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Add fontSize="small" className="text-blue-600" />
      </button>
    </div>
  
  </div>
);

function PassengerModal({ passengers, onPassengerChange, onClose, onDone }: PassengerModalProps) {

  const totalPassengers = passengers.adults + passengers.children + passengers.infantsInSeat;
  const MAX_PASSENGERS = 9; // Google flight assumes 9 passengers at most

  const handleIncrement = (category: keyof PassengerCounts) => {
    onPassengerChange(category, passengers[category] + 1);
  };

  const handleDecrement = (category: keyof PassengerCounts) => {
    onPassengerChange(category, passengers[category] - 1);
  };

  return (
    <div className={`absolute z-10 left-35 top-[45] bg-white shadow-md rounded-lg border border-black/5 px-[1rem] py-[1rem] 
    flex flex-col gap-[1rem]`}>

      <div className=''>

        <div className="flex flex-col gap-[1rem]">
          <CounterRow
            label="Adults"
            count={passengers.adults}
            onIncrement={() => handleIncrement('adults')}
            onDecrement={() => handleDecrement('adults')}
            isIncrementDisabled={totalPassengers >= MAX_PASSENGERS}
            isDecrementDisabled={passengers.adults <= 1} // At least one adult is needed
          />
          <CounterRow
            label="Children"
            description="Aged 2-11"
            count={passengers.children}
            onIncrement={() => handleIncrement('children')}
            onDecrement={() => handleDecrement('children')}
            isIncrementDisabled={totalPassengers >= MAX_PASSENGERS}
            isDecrementDisabled={passengers.children <= 0}
          />
          <CounterRow
            label="Infants"
            description="In seat"
            count={passengers.infantsInSeat}
            onIncrement={() => handleIncrement('infantsInSeat')}
            onDecrement={() => handleDecrement('infantsInSeat')}
            isIncrementDisabled={totalPassengers >= MAX_PASSENGERS}
            isDecrementDisabled={passengers.infantsInSeat <= 0}
          />
          <CounterRow
            label="Infants"
            description="On lap"
            count={passengers.infantsOnLap}
            onIncrement={() => handleIncrement('infantsOnLap')}
            onDecrement={() => handleDecrement('infantsOnLap')}
            // Babies on laps can't be greater than adults
            isIncrementDisabled={passengers.infantsOnLap >= passengers.adults}
            isDecrementDisabled={passengers.infantsOnLap <= 0}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-3 py-1 rounded-full text-blue-800 hover:bg-blue-100">
          Cancel
        </button>
        <button onClick={onDone} className="px-3 py-1 rounded-full text-blue-800 hover:bg-blue-100">
          Done
        </button>
      </div>
    </div>
  );
}

export default PassengerModal