import { FC } from 'react';
import styled from 'styled-components';
import ApprovedImagesProps from '../models/ApprovedImages.props';
import Carousel from 'react-elastic-carousel';
import { ImageThumbnail } from './ImageThumbnail';

export const ApprovedImages: FC<ApprovedImagesProps> = ({ images }) => {
  return (
    <StyledWrapper>
      <Carousel pagination={false} isRTL={false} itemsToShow={6}>
        {images.map(image => <ImageThumbnail key={image.id} image={image} />)}
      </Carousel>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: calc(100% - 6rem);
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #dcdde1;
`;
