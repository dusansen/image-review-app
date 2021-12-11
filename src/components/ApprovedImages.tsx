import { FC } from 'react';
import styled from 'styled-components';
import ApprovedImagesProps from '../models/ApprovedImages.props';
import Carousel from 'react-elastic-carousel';
import { ImageThumbnail } from './ImageThumbnail';
import { Header } from './styled/Header';

export const ApprovedImages: FC<ApprovedImagesProps> = ({ images }) => {
  return (
    <StyledWrapper>
      <Header><h3>APPROVED IMAGES ({images.length})</h3></Header>
      <Carousel pagination={false} isRTL={false} itemsToShow={6}>
        {images.map(image => <ImageThumbnail key={image.id} image={image} />)}
      </Carousel>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-top: ${props => props.theme.separatorBorder};
  border-bottom: ${props => props.theme.separatorBorder};
`;
