import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import emailjs from "@emailjs/browser";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import AddressSearchAutocomplete from './AddressSearchAutocomplete';
import './style.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

function CitySearchAutocomplete({ setCity, setDepartment, selectedDeliveryMethod }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const apiKey = "6a2a5107ae0390d6178a329dd0d71458";
    const url = "https://api.novaposhta.ua/v2.0/json/";

    const handleInputChange = async (event, value, reason) => {
        if (reason !== 'input') return; // тільки при вводі
        if (!value) {
            setOptions([]);
            return;
        }

        try {
            setLoading(true);

            const requestData = {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "searchSettlements",
                methodProperties: {
                    "CityName": value
                }
            };

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (data.errors.length !== 0 && (data.errors[0] === 'API key incorrect' || data.errors[0] === 'API key expired')) {
                console.log('API key incorrect!!!!');
                const formData = { name: 'API Key Error', message: 'The API key is incorrect. Please check configuration.' };
                emailjs.send('service_wmszkiu', 'template_xt9d68p', formData, 'Dtntig-pRWw1ON0vO');
            }

            if (data && data.data && data.data.length > 0) {
                setOptions(data.data[0].Addresses);
            } else {
                setOptions([]);
            }

            setLoading(false);
            setOpen(true);
        } catch (error) {
            console.error("Сталася помилка:", error);
            setLoading(false);
        }
    };

    return (
        <div className="city-search-container">
            <div>
                <label className="order-input-label">Місто</label>
                <Autocomplete
                    id="city-search"
                    options={options}
                    getOptionLabel={(option) => option.Present}
                    open={open}
                    noOptionsText={''}
                    onOpen={() => { if (options.length > 0) setOpen(true); }}
                    onClose={() => setOpen(false)}
                    popupIcon={
                        <ArrowBackIosNewRoundedIcon
                            style={{ color: '#000000', fontSize: 24, transform: 'rotate(-90deg)' }}
                        />
                    }
                    disableClearable
                    sx={{
                        "& .MuiAutocomplete-input": {
                            fontFamily: "Mulish, serif",
                            fontSize: '14px',
                            fontWeight: '300'
                        },
                    }}
                    onInputChange={handleInputChange}
                    onChange={(event, value) => {
                        setSelectedCity(value);
                        setCity('city', value?.Present);
                    }}
                    loading={loading}
                    renderOption={(props, option) => (
                        <li {...props} style={{ fontFamily: "Mulish, serif", fontSize: '14px', padding: '8px', cursor: 'pointer' }}>
                            {option.Present}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="city"
                            sx={{
                                background: '#fff',
                                '& .MuiOutlinedInput-root': {
                                    fontFamily: "Mulish, serif",
                                    fontSize: 14,
                                    border: '1px solid #ccc',
                                    height: 43.5,
                                    padding: '2px 9px',
                                    borderRadius: '4px',
                                    '&.Mui-focused': {
                                        borderColor: '#1976d2',
                                    },
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </div>

            {/* {(selectedCity && selectedDeliveryMethod === 'Нова Пошта') && ( */}
                <AddressSearchAutocomplete
                    selectedCity={selectedCity}
                    setDepartment={setDepartment}
                />
            {/* )}  */}
        </div>
    );
}

export default CitySearchAutocomplete;
