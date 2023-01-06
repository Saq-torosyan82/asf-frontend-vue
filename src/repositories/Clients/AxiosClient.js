import axios from 'axios';

// const apiUrl = 'https://api.asf.nextus.ro/v1/';
const apiUrl = 'https://api.sportsfi.com/v1';

export default axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
});
