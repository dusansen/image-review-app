import Image from "../../models/Image";
import { DECLINED_IMAGES_KEY, LIKED_IMAGES_KEY } from "../constants";
import { getLikedImagesFromLocalStorage, saveToLocalStorage } from "../storage";
import { getDeclinedImagesFromLocalStorage } from './../storage';

const images = [
  { id: '1', url: 'url_1' }
] as Image[];

const declinedImagesIds = ['1', '2'];

describe('Utils storage', () => {
  const setItemOriginal = window.localStorage.__proto__.setItem;
  const getItemOriginal = window.localStorage.__proto__.getItem;

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    jest.spyOn(window.localStorage.__proto__, 'getItem')
    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    window.localStorage.__proto__.setItem = setItemOriginal;
    window.localStorage.__proto__.getItem = getItemOriginal;
  });

  it('should save item to local storage', () => {
    const key = 'key';

    saveToLocalStorage(key, images);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(images));
  });

  describe('getLikedImagesFromLocalStorage', () => {
    it('should get liked images from local storage', () => {
      window.localStorage.__proto__.getItem.mockImplementationOnce(() => JSON.stringify(images));
      const imagesFromLS = getLikedImagesFromLocalStorage();
  
      expect(window.localStorage.getItem).toHaveBeenCalledWith(LIKED_IMAGES_KEY);
      expect(imagesFromLS).toEqual(images);
    });

    it('should get empty array when there is no liked images in local storage', () => {
      window.localStorage.__proto__.getItem.mockImplementationOnce(() => null);
      const imagesFromLS = getLikedImagesFromLocalStorage();
  
      expect(window.localStorage.getItem).toHaveBeenCalledWith(LIKED_IMAGES_KEY);
      expect(imagesFromLS).toEqual([]);
    });
  });

  describe('getDeclinedImagesFromLocalStorage', () => {
    it('should get declined images from local storage', () => {
      window.localStorage.__proto__.getItem.mockImplementationOnce(() => JSON.stringify(declinedImagesIds));
      const declinedImagesFromLS = getDeclinedImagesFromLocalStorage();
  
      expect(window.localStorage.getItem).toHaveBeenCalledWith(DECLINED_IMAGES_KEY);
      expect(declinedImagesFromLS).toEqual(declinedImagesIds);
    });

    it('should get empty array when there is no liked images in local storage', () => {
      window.localStorage.__proto__.getItem.mockImplementationOnce(() => null);
      const declinedImagesFromLS = getDeclinedImagesFromLocalStorage();
  
      expect(window.localStorage.getItem).toHaveBeenCalledWith(DECLINED_IMAGES_KEY);
      expect(declinedImagesFromLS).toEqual([]);
    });
  });
});