import axios from 'axios';
import Image from '../models/Image';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { IMAGE_LOADED, IMAGE_LOADING_FAILED, LOAD_IMAGE } from '../store/constants';

const apiClient = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
  }
});

export const getRandomImage = async (dispatch: Dispatch, imagesThatAppeared: String[]) => {
  try {
    let image;
    let imageAlreadyAppeared = false;
    dispatch({ type: LOAD_IMAGE });
    do {
      const response = await apiClient.get('/photos/random', {
        params: {
          orientation: 'landscape'
        }
      });
      if (response.status === 200 && response.data) {
        const { data: { id, urls } } = response;
        image = { id, url: urls.regular } as Image;
        imageAlreadyAppeared = imagesThatAppeared.includes(id);
      }
    } while(imageAlreadyAppeared);
    dispatch({ type: IMAGE_LOADED, payload: image });
  } catch (error) {
    toast.error('Something went wrong');
    dispatch({ type: IMAGE_LOADING_FAILED });
  }
};
