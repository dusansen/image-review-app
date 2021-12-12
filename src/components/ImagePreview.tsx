import { FC } from 'react';
import ImagePreviewProps from '../models/ImagePreview.props';
import styled from 'styled-components';
import plusIcon from '../assets/icons/plus.svg';

export const ImagePreview: FC<ImagePreviewProps> = ({
  image: { url, id },
  onImageClick
}) => {
  return !url
    ? (
      <AddImagePlaceholder data-testid="add-image-placeholder" onClick={onImageClick}>
        <img src={plusIcon} alt="plus-icon" />
      </AddImagePlaceholder>
    )
    : <Image src={url} alt={id} />
};

const AddImagePlaceholder = styled.div`
  ${({ theme }) => theme.mixins.imageStyles(theme.imageWidth, theme.imageHeight, theme.imageBorderRadius)}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dcdde1;
  max-width: 100%;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

const Image = styled.img`
  ${({ theme }) => theme.mixins.imageStyles(theme.imageWidth, theme.imageHeight, theme.imageBorderRadius)}
  max-width: 100%;
  object-fit: cover;
`;
