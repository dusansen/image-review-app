import { FC } from 'react';
import styled from 'styled-components';
import ImageThumbnailProps from './../models/ImageThumbnail.props';

export const ImageThumbnail: FC<ImageThumbnailProps> = ({ image }) => {
  return <Thumbnail src={image.url} alt={image.id} />
}

const Thumbnail = styled.img`
  width: 8rem;
  height: 6rem;
`;
