import { AnyAction } from 'redux';
import Image from '../models/Image';
import { IMAGE_LOADED, IMAGE_LOADING_FAILED, LOAD_IMAGE } from './constants';

export interface AppState {
  currentImage: Image;
  isLoadingImage: boolean
}

const initialState: AppState = {
  currentImage: { id: '', url: '' },
  isLoadingImage: false
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_IMAGE:
      return { ...state, isLoadingImage: true };
    case IMAGE_LOADED:
      return { ...state, isLoadingImage: false, currentImage: action.payload };
    case IMAGE_LOADING_FAILED:
      return { ...state, isLoadingImage: false, currentImage: { id: '', url: '' } };
    default:
      return state;
  }
};
