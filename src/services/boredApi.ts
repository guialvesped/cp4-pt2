import axios from 'axios';

export async function fetchApi() {
    const response = await axios.get('https://bored-api.appbrewery.com/random');
    return response.data;
}