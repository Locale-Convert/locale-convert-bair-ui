import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import emailjs from "@emailjs/browser";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

function StreetSearchAutocomplete({ selectedCity, setDepartment }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiKey = "6a2a5107ae0390d6178a329dd0d71458";
    const url = "https://api.novaposhta.ua/v2.0/json/";

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!selectedCity) return;

            try {
                setLoading(true);

                const requestData = {
                    apiKey: apiKey,
                    modelName: "Address",
                    calledMethod: "searchSettlementStreets",
                    methodProperties: {
                        'StreetName': 'велика кільцева',
                        "SettlementRef": selectedCity.Ref
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
                    const addresses = data.data.map(address => address.Addresses[0]);
                    setOptions([addresses]);
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

        fetchAddresses();
    }, [selectedCity]);


    return (
        <Autocomplete
            id="department-search"
            options={options}
            getOptionLabel={(option) =>  option}
            open={open}
            noOptionsText={"Немає варіантів"}
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
            onChange={(event, value) => {
                setDepartment('department', value);
            }}
            loading={loading}
            renderOption={(props, option) => (
                <li key={option} {...props} style={{ fontFamily: "Mulish, serif", fontSize: '14px', padding: '8px', cursor: 'pointer' }}>
                    {option}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    name="department"
                    {...params}
                    label="Адреса"
                    sx={{
                        mt: 2,
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
        />
    );
}

export default StreetSearchAutocomplete;
