import { reducer } from '../reducer';
import { LOAD_IMAGE, IMAGE_LOADED, IMAGE_LOADING_FAILED } from './../constants';

const INITIAL_STATE = {
  currentImage: { id: '', url: '' },
  isLoadingImage: false
};

describe('Reducer', () => {
  it(`should handle ${LOAD_IMAGE} action type`, () => {
    const action = { type: LOAD_IMAGE };

    const newState = reducer(INITIAL_STATE, action);

    expect(newState).toEqual({
      ...INITIAL_STATE,
      isLoadingImage: true
    });
  });

  it(`should handle ${IMAGE_LOADED} action type`, () => {
    const payload = { id: '1', url: 'url_1' };
    const action = { type: IMAGE_LOADED, payload };

    const newState = reducer(INITIAL_STATE, action);

    expect(newState).toEqual({
      currentImage: payload,
      isLoadingImage: false
    });
  });

  it(`should handle ${IMAGE_LOADING_FAILED} action type`, () => {
    const action = { type: IMAGE_LOADING_FAILED };

    const newState = reducer(INITIAL_STATE, action);

    expect(newState).toEqual({
      currentImage: { id: '', url: '' },
      isLoadingImage: false
    });
  });

  it('should not change state if unhandled action happen', () => {
    const action = { type: 'some random action' };

    const newState = reducer(INITIAL_STATE, action);

    expect(newState).toEqual(INITIAL_STATE);
  });
});
