import { FC } from 'react';
import ImagePreviewProps from '../models/ImagePreview.props';
import styled from 'styled-components';

export const ImagePreview: FC<ImagePreviewProps> = ({
  image: { url },
  onImageClick
}) => {
  return !url
    ? <AddImagePlaceholder onClick={onImageClick} />
    : <Image src={url} alt='photo' />
};

const AddImagePlaceholder = styled.div`
  width: 40rem;
  height: 25rem;
  background-color: #dcdde1;
`;

const Image = styled.img`
  width: 40rem;
  height: 25rem;
`;
