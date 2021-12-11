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
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border-top: 2px solid #dcdde1;
  border-bottom: 2px solid #dcdde1;
`;
