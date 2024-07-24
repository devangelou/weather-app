const apiKey = 'HS7PbweakYm+Mh/hJfFVVA==FSGI1u4qQKJXczKx';

export const getWeather = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`,
            {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                }
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
};
