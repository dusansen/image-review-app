import apiClient from './api';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import Image from '../models/Image';
import { IMAGE_LOADED, IMAGE_LOADING_FAILED, LOAD_IMAGE } from '../store/constants';

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
