import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { useWeather } from '../hooks/useWeather'

const Weather = () => {
    const {
        value,
        weather,
        filteredCities,
        error,
        fetchCitiesList,
        handleChange,
        handleSearch,
    } = useWeather();

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <AutoComplete
                    value={value}
                    suggestions={filteredCities.map(city => city.name)}
                    completeMethod={fetchCitiesList}
                    onChange={handleChange}
                    placeholder="Enter city"
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weather && (
                <div>
                    <h2>Weather in {value}</h2>
                    <p>Temperature: {weather.temp}°C</p>
                    <p>Weather: {weather.weather}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
