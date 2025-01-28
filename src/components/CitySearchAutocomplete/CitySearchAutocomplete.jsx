import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import emailjs from "@emailjs/browser";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import AddressSearchAutocomplete from './AddressSearchAutocomplete';
import { Paper } from '@mui/material';

function CitySearchAutocomplete({ setCity, setDepartment, selectedDeliveryMethod }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const apiKey = "6a2a5107ae0390d6178a329dd0d71458";
    const url = "https://api.novaposhta.ua/v2.0/json/";

    const handleInputChange = async (event) => {
        try {
            setLoading(true);

            const cityName = event.target.value;

            const requestData = {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "searchSettlements",
                methodProperties: {
                    "CityName": cityName
                }
            };

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (data.errors.length !== 0 && (data.errors[0] === 'API key incorrect' || data.errors[0] === 'API key expired')) {
                console.log('API key incorrect!!!!');
                
                const formData = {
                    name: 'API Key Error', 
                    message: 'The API key is incorrect. Please check the configuration.'
                };
                
                emailjs.send('service_wmszkiu', 'template_xt9d68p', formData, 'Dtntig-pRWw1ON0vO')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            }

            if (data && data.data && data.data.length > 0) {
                
                const cities = data.data[0].Addresses.map(city => city);
                setOptions(cities);
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
        <>  
            <label className='delivery-city-label'>Місто</label>
             <Autocomplete
                id="city-search"
                options={options}
                getOptionLabel={(option) => option.Present}
                open={open}
                noOptionsText={''} 
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
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
                        name="city"
                        autoComplete={true}
                        {...params}
                        sx={{
                            background: '#fff',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderWidth: 0,
                                fontSize: 14,
                            },
                            fontFamily: "Mulish, serif",
                            '.MuiOutlinedInput-notchedOutline > legend': {
                                fontFamily: "Mulish, serif",
                                fontSize: 14,
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
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                }}
            />
            {(selectedCity && selectedDeliveryMethod === 'Нова Пошта') && <AddressSearchAutocomplete selectedCity={selectedCity} setDepartment={setDepartment}/>}
            {/* {(selectedCity && selectedDeliveryMethod === 'courier') && <StreetSearchAutocomplete selectedCity={selectedCity}/>} */}
        </>
    );
}

export default CitySearchAutocomplete;
