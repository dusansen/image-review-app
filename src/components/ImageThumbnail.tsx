import { FC } from 'react';
import styled from 'styled-components';
import ImageThumbnailProps from './../models/ImageThumbnail.props';

export const ImageThumbnail: FC<ImageThumbnailProps> = ({ image }) => {
  return <Thumbnail src={image.url} alt={image.id} />
}

export const Thumbnail = styled.img`
  ${({ theme }) => theme.mixins.imageStyles('8rem', '6rem', theme.imageBorderRadius)}
`;
