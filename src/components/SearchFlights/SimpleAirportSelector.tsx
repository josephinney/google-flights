'use client';

import React from 'react';
import { Autocomplete, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { LocationOn, FlightTakeoff, SyncAlt } from '@mui/icons-material';
import { useFlightManagement } from '@/hooks/useFlightManagement';
import { AirportSuggestion } from '@/types/flights';
import { debounce } from '@mui/material/utils';

const getIcon = (type?: string) => {
    switch (type) {
        case 'CITY':
            return <LocationOn sx={{ color: 'text.secondary', fontSize: 20 }} />;
        case 'AIRPORT':
            return <FlightTakeoff sx={{ color: 'text.secondary', fontSize: 20 }} />;
        default:
            return <LocationOn sx={{ color: 'text.secondary', fontSize: 20 }} />;
    }
};

interface AirportAutocompleteProps {
    value: AirportSuggestion | null;
    onChange: (airport: AirportSuggestion | null) => void;
    placeholder?: string;
}

interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
    type?: 'recent' | 'anywhere' | 'airport';
}


const AirportSelector = ({ value, onChange, placeholder }: AirportAutocompleteProps) => {

    const { searchAirports, airportSuggestions, isSearchingAirports } = useFlightManagement();

    const debouncedSearch = React.useMemo(
        () => debounce((query: string) => {
            searchAirports(query);
        }, 400),
        [searchAirports]
    );

    return (
        <Autocomplete
            options={airportSuggestions}
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            onInputChange={(_, newInputValue) => {
                debouncedSearch(newInputValue);
            }}
            loading={isSearchingAirports}
            getOptionLabel={(option) => option.presentation?.suggestionTitle || ''}
            isOptionEqualToValue={(option, val) => option.navigation.entityId === val.navigation.entityId}
            filterOptions={(x) => x} 
            disablePortal
            fullWidth
            noOptionsText="Type to search for an airport"
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.navigation.entityId} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, px: 2 }}>
                    {getIcon(option.navigation.entityType)}
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {option.presentation.suggestionTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {option.presentation.subtitle}
                        </Typography>
                    </Box>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    variant="outlined"
                    slotProps={{
                        input: { 
                            ...params.InputProps, 
                            endAdornment: (
                                <>
                                    {isSearchingAirports ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps?.endAdornment}
                                </>
                            ),
                        }
                    }}
                    sx={{
                        height: '100%',
                        '& .MuiOutlinedInput-root': {
                            height: '100%',
                            paddingX: '10px',
                            fontSize: '15.5px',
                            color: 'rgba(0, 0, 0, 0.65)',
                            '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '6px',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.8)',
                            },
                        },
                        '& .MuiInputBase-input': {
                            padding: '8.5px 4px',
                            width: '100%',
                        },

                        '& .MuiAutocomplete-endAdornment': {
                            display: 'none',
                        },
                    }}
                />
            )}
            sx={{
                height: '100%',
                width: '100%',
                '& .MuiAutocomplete-popup': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
                zIndex: 0
            }}
        />
    );
};


const SimpleAirportSelector = () => {

    const {
        departureAirport,
        arrivalAirport,
        setDepartureAirport,
        setArrivalAirport,
        swapAirports
    } = useFlightManagement();

    return (
        <div className="flex flex-row self-stretch w-full gap-[0.5rem]">
            {/* Departure Airport */}
            <div className="w-full">
                <AirportSelector
                    value={departureAirport}
                    onChange={setDepartureAirport}
                    placeholder="Where from?"
                />
            </div>

            {/* Swap Button */}
            <div
                onClick={swapAirports}
                className="flex items-center justify-center p-1 rounded-full hover:bg-black/10 cursor-pointer"
            >
                <SyncAlt className="text-gray-600" />
            </div>

            {/* Arrival Airport */}
            <div className="w-full">
                <AirportSelector
                    value={arrivalAirport}
                    onChange={setArrivalAirport}
                    placeholder="Where to?"
                />
            </div>
        </div>
    );
};

export default SimpleAirportSelector;