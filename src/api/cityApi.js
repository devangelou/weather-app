const apiKey = 'HS7PbweakYm+Mh/hJfFVVA==FSGI1u4qQKJXczKx';

export const getCitiesList = async (query) => {
    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/city?name=${query}&limit=30`,
            {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey
                }
            }
        );
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch city data');
    }
};
