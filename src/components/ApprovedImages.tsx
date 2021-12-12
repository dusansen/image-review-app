import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import ApprovedImagesProps from '../models/ApprovedImages.props';
import Carousel from 'react-elastic-carousel';
import { ImageThumbnail } from './ImageThumbnail';
import { Header } from './styled/Header';
import { useWindowSize } from '../hooks/useWindowSize';

const INITIAL_NUMBER_OF_IMAGES_TO_SHOW = 6;

export const ApprovedImages: FC<ApprovedImagesProps> = ({ images }) => {
  const [numberOfImagesToShow, setNumberOfImagesToShow] = useState(INITIAL_NUMBER_OF_IMAGES_TO_SHOW);
  const size = useWindowSize();

  useEffect(() => {
    setNumberOfImagesToShow(Math.floor(size.width / 200));
  }, [size]);

  return (
    <StyledWrapper>
      <Header><h3>APPROVED IMAGES ({images.length})</h3></Header>
      {
        images.length
          ? (
            <Carousel pagination={false} isRTL={false} itemsToShow={numberOfImagesToShow}>
              {images.map(image => <ImageThumbnail key={image.id} image={image} />)}
            </Carousel>
          )
          : null
      }
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
