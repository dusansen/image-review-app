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
  width: ${props => props.theme.imageWidth};
  height: ${props => props.theme.imageHeight};
  background-color: #dcdde1;
  border-radius: ${props => props.theme.imageBorderRadius};

  img {
    width: 10rem;
    height: 10rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  width: ${props => props.theme.imageWidth};
  height: ${props => props.theme.imageHeight};
  border-radius: ${props => props.theme.imageBorderRadius};
  object-fit: cover;
`;
