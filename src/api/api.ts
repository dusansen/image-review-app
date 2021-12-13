import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
  }
});

export default apiClient;
