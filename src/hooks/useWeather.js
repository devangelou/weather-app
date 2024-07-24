import { useState } from 'react';
import { getCitiesList } from '../api/cityApi';
import { getWeather } from '../api/weatherApi';

export const useWeather = () => {
    const [value, setValue] = useState('');
    const [weather, setWeather] = useState(null);
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);
    const [error, setError] = useState(null);

    const fetchCitiesList = async (e) => {
        try {
            const data = await getCitiesList(e.query);
            getCityName(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const getCityName = (data) => {
        if (Array.isArray(data)) {
            setFilteredCities(
                data.map((city) => ({
                    name: `${city.name}, ${city.country}`,
                    lat: city.latitude,
                    lon: city.longitude
                }))
            );
        } else {
            setFilteredCities([]);
        }
    };

    const handleChange = (e) => {
        const selectedCity = filteredCities.find(city => city.name === e.value);
        setSelectedCoordinates(selectedCity ? { lat: selectedCity.lat, lon: selectedCity.lon } : null);
        setValue(e.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!selectedCoordinates) {
            setError('Please select a valid city from the suggestions.');
            return;
        }
        try {
            const { lat, lon } = selectedCoordinates;
            const data = await getWeather(lat, lon);
            setWeather(data);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        value,
        weather,
        filteredCities,
        error,
        fetchCitiesList,
        handleChange,
        handleSearch,
    };
};
