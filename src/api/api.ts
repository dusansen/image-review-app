import axios from 'axios';
import Image from '../models/Image';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
  }
});

export const getRandomImage = async () => {
  try {
    const response = await apiClient.get('/photos/random', {
      params: {
        orientation: 'landscape'
      }
    });
    if (response.status === 200 && response.data) {
      const { data: { id, urls } } = response;
      return {
        id,
        url: urls.regular
      } as Image;
    }
    toast.error('Something went wrong');
    return null;
  } catch (error) {
    toast.error('Something went wrong');
    return null;
  }
};
