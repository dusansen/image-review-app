import Image from "../models/Image";
import { DECLINED_IMAGES_KEY, LIKED_IMAGES_KEY } from "./constants";

export const saveToLocalStorage = (key: string, data: Image[] | String[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLikedImagesFromLocalStorage = (): Image[] => {
  const images = localStorage.getItem(LIKED_IMAGES_KEY);
  return !images ? [] : JSON.parse(images);
};

export const getDeclinedImagesFromLocalStorage = (): String[] => {
  const images = localStorage.getItem(DECLINED_IMAGES_KEY);
  return !images ? [] : JSON.parse(images);
}
