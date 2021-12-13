import { getRandomImage } from '../unsplash';
import apiClient from '../api';
import { IMAGE_LOADED, IMAGE_LOADING_FAILED, LOAD_IMAGE } from '../../store/constants';
import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

jest.mock('../api');
jest.mock('react-toastify');

describe('Unsplash api', () => {
  const dispatch = jest.fn();

  it('should get random image successfully', async () => {
    const image = {
      id: '1',
      urls: {
        regular: 'regular_url',
      },
    };
    
    apiClient.get.mockResolvedValue({ status: 200, data: image });

    getRandomImage(dispatch, []);
    
    expect(dispatch).toHaveBeenCalledWith({ type: LOAD_IMAGE });
    expect(apiClient.get).toHaveBeenCalledWith('/photos/random', {
      params: {
        orientation: 'landscape',
      },
    });
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: IMAGE_LOADED, payload: { id: '1', url: image.urls.regular }
      });
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle error while getting random image', async () => {
    apiClient.get.mockRejectedValue(new Error('error'));

    getRandomImage(dispatch, []);

    expect(dispatch).toHaveBeenCalledWith({ type: LOAD_IMAGE });
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: IMAGE_LOADING_FAILED });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
    
  });
});
