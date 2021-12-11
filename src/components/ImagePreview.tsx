import { FC } from 'react';
import ImagePreviewProps from '../models/ImagePreview.props';
import styled from 'styled-components';
import plusIcon from '../assets/icons/plus.svg';

export const ImagePreview: FC<ImagePreviewProps> = ({
  image: { url },
  onImageClick
}) => {
  return !url
    ? (
      <AddImagePlaceholder onClick={onImageClick}>
        <img src={plusIcon} alt='add image' />
      </AddImagePlaceholder>
    )
    : <Image src={url} alt='photo' />
};

const AddImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 25rem;
  background-color: #dcdde1;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  width: 40rem;
  height: 25rem;
  object-fit: cover;
`;
