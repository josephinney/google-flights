"use client"
import React, { useMemo, useState } from 'react'
import { SyncAlt, PersonOutlineOutlined, ExpandLess, ExpandMore, ArrowRightAlt, Search } from '@mui/icons-material'
import { textColors, fontSizes } from '@/styles/constant'
import { DatePicker, } from '@mui/x-date-pickers/DatePicker'
import SimpleAirportSelector from './SearchFlights/SimpleAirportSelector'
import RoundTripModal from './SearchFlights/RoundTripModal'
import PassengerModal from './SearchFlights/PassengerModal'
import ClassModal from './SearchFlights/ClassModal'
import { TripType, ClassType } from '@/types/flights'
import { PassengerCounts } from '@/types/flights'
import { useFlightManagement } from '@/hooks/useFlightManagement'
import dayjs, { Dayjs } from 'dayjs';

function SearchFlights() {

    const {
        tripType,
        setTripType,
        classType,
        setClassType,
        passengers,
        setPassengers,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        searchFlights,
        searchAirports
    } = useFlightManagement();

    const [isRoundTripModalOpened, setIsRoundTripModalOpened] = useState(false);
    const [isPassengerModalOpened, setIsPassengerModalOpened] = useState(false);
    const [isClassModalOpened, setIsClassModalOpened] = useState(false);

    const handleTripTypeChange = (newTripType: TripType) => {
        setTripType(newTripType);
        setIsRoundTripModalOpened(false); 
    }
    const hanldeClassTypeChange = (newClassType: ClassType) => {
        setClassType(newClassType);
        setIsClassModalOpened(false);
    }
    const handlePassengerChange = (category: keyof PassengerCounts, value: number) => {
        const newCounts = { ...passengers, [category]: value };
        if (category === 'adults' && newCounts.adults < newCounts.infantsOnLap) {
            newCounts.infantsOnLap = newCounts.adults;
        }
        setPassengers(newCounts);
    };

    const totalPassengers = useMemo(() => {
        // Assuming that babies on laps do not sum
        return passengers.adults + passengers.children + passengers.infantsInSeat;
    }, [passengers]);

    const isHovered = `hover:bg-black/5`

    return (
        <div className={`relative flex flex-col  border border-black/5 w-full max-w-[1024px] rounded-xl shadow-lg bg-white py-[2rem] px-[0.5rem] gap-[0.5rem] ${textColors.textGray}`}>

            {/* Trip - Passengers - Class */}
            <div className={`relative px-[0.5rem] py-[0.5rem] flex flex-row gap-[0.5rem]`}>

                {/* Trip */}
                <div className={`${isHovered} flex flex-row gap-[0.5rem] items-center border border-black/1 px-[0.25rem] py-[0.25rem] rounded-md`}
                    onClick={() => setIsRoundTripModalOpened(!isRoundTripModalOpened)}
                >
                    {
                        (tripType === 'One way') ? <ArrowRightAlt /> : <SyncAlt />
                    }

                    <p className={`${fontSizes.size14}`}>{tripType}</p>

                    {isRoundTripModalOpened ? <ExpandLess /> : <ExpandMore />}
                </div>

                {/* Passenegers */}
                <div className={`${isHovered} flex flex-row gap-[0.5rem] items-center border border-black/1 px-[0.25rem] py-[0.25rem] rounded-md`}
                    onClick={() => setIsPassengerModalOpened(!isPassengerModalOpened)}
                >
                    <PersonOutlineOutlined className={`${textColors.textGray}`} />

                    <p className={`${fontSizes.size14}`}>{totalPassengers}</p>

                    {isPassengerModalOpened ? <ExpandLess /> : <ExpandMore />}
                </div>

                {/* Class */}
                <div className={`${isHovered} flex flex-row gap-[0.5rem] items-center border border-black/1 px-[0.25rem] py-[0.25rem] rounded-md`}
                    onClick={() => setIsClassModalOpened(!isClassModalOpened)}
                >
                    <p className={`${fontSizes.size14}`}>{classType}</p>

                    {isClassModalOpened ? <ExpandLess /> : <ExpandMore />}
                </div>

                {/* Round Trip Modal */}
                {isRoundTripModalOpened && (
                    <div onMouseLeave={() => setIsRoundTripModalOpened(false)}>
                        <RoundTripModal onSelectTripType={handleTripTypeChange} />
                    </div>

                )}

                {/* Passenger Modal */}
                {isPassengerModalOpened && (
                    <div onMouseLeave={() => setIsPassengerModalOpened(false)}>
                        <PassengerModal
                            passengers={passengers}
                            onPassengerChange={handlePassengerChange}
                            onClose={() => setIsPassengerModalOpened(false)}
                            onDone={() => setIsPassengerModalOpened(false)}
                        />
                    </div>
                )}

                {/* Class Trip Modal */}
                {isClassModalOpened && (
                    <div onMouseLeave={() => setIsClassModalOpened(false)}>
                        <ClassModal onSelectClassType={hanldeClassTypeChange} />
                    </div>
                )}
            </div>

            <div className={` flex flex-col gap-2 md:flex-row md:items-center`}>
                {/* Where from? - Where to? */}
                <div className={`md:w-1/2  h-[57px]  flex items-center`}>

                    <SimpleAirportSelector />

                </div>

                {/* Departure date - Return date */}
                <div className={`md:w-1/2  flex flex-row gap-[0.5rem] items-center`}>
                    <DatePicker
                        label="Departure"
                        value={departureDate ? dayjs(departureDate) : null}
                        onChange={(newValue: Dayjs | null) => setDepartureDate(newValue ? newValue.toDate() : null)}
                        minDate={dayjs()}
                        sx={{
                            '& .MuiInputBase-input::before, & .MuiInputBase-input::after': {
                                border: 'none !important'
                            },
                        }}
                    />

                    <DatePicker
                        label="Return"
                        value={returnDate ? dayjs(returnDate) : null}
                        onChange={(newValue: Dayjs | null) => setReturnDate(newValue ? newValue.toDate() : null)}
                        minDate={departureDate ? dayjs(departureDate) : dayjs()}
                        disabled={tripType === 'One way'}
                        sx={{
                            '& .MuiInputBase-input::before, & .MuiInputBase-input::after': {
                                border: 'none !important'
                            },
                        }}
                    />
                </div>
            </div>

            {/* Search Button */}
            <button className={`rounded absolute bottom-[-18] left-1/2 -translate-x-1/2 border rounded-full py-2 px-4 bg-[#1a73e8] text-white
                 flex flex-row items-center gap-1
                `}
                onClick={() => searchFlights()}
            >
                <Search /> <p className='font-semibold text-[18px]'>Search</p>
            </button>


            

            
        </div>
    )
}

export default SearchFlights