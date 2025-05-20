import axios from 'axios';

const API_KEY = '9170e0e85794088df319259526c55afd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (err) {
    console.error('API error:', err);
    return { cod: '404', message: 'Network error or city not found.' };
  }
};
