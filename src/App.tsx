import { useState } from 'react';
import { getRandomImage } from './api/api';
import Image from './models/Image';
import styled from 'styled-components';
import ButtonProps from './models/Button.props';
import { ImagePreview } from './components/ImagePreview';
import { getLikedImagesFromLocalStorage, getDeclinedImagesFromLocalStorage, saveToLocalStorage } from './utils/storage';
import { DECLINED_IMAGES_KEY, LIKED_IMAGES_KEY } from './utils/constants';

function App() {
  const [currentImage, setCurrentImage] = useState<Image>({ id: '', url: '' });
  const [likedImages, setLikedImages] = useState<Image[]>(getLikedImagesFromLocalStorage());
  const [declinedImages, setDeclinedImages] = useState<String[]>(getDeclinedImagesFromLocalStorage());

  const fetchNewImage = async () => {
    let image;
    let isAlreadyDeclined = false;
    do {
      image = await getRandomImage();
      if (!image) {
        // show error
        return;
      }
      isAlreadyDeclined = declinedImages.includes(image.id);
    } while (isAlreadyDeclined)
    setCurrentImage(image);
  };

  const onLikeClickHandler = () => {
    const newLikedImages = [...likedImages, currentImage];
    saveToLocalStorage(LIKED_IMAGES_KEY, newLikedImages);
    setLikedImages(newLikedImages);
    fetchNewImage();
  };

  const onDeclineClickHandler = () => {
    const newDeclinedImages = [...declinedImages, currentImage.id];
    saveToLocalStorage(DECLINED_IMAGES_KEY, newDeclinedImages);
    setDeclinedImages(newDeclinedImages);
    fetchNewImage();
  }

  return (
    <StyledWrapper>
      <Header><h3>IMAGE APPROVAL APPLICATION</h3></Header>
      <main>
        <div className="approved-images"></div>
        <ImagePreview image={currentImage} onImageClick={fetchNewImage} />
        {
          currentImage.url
            ? (
              <div className="action-buttons">
                <Button onClick={onDeclineClickHandler}>Cancel</Button>
                <Button buttonType='like' onClick={onLikeClickHandler}>Like</Button>
              </div>
            )
            : (
              <Instructions>
                Click on the + to get the image recommendations
              </Instructions>
            )
        }
      </main>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: 100%;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .approved-images {
      background-color: #dcdde1;
      width: 100%;
      height: 2rem;
      margin-bottom: 1rem;
    }
    
    .action-buttons {
      display: flex;
      flex-direction: row;
      gap: 1.2rem;
      margin-top: 1rem;
    }
  }
`;

const Button = styled.button<ButtonProps>`
  background-color: ${props => props.buttonType === 'like' ? '#273c75' : '#353b48'};
  color: #fff;
  height: min-content;
  padding: 0.8rem 1.2rem;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  min-width: 6rem;
`;

const Header = styled.header`
  text-align: left;
  width: 100%;
`;

const Instructions = styled.p`
  font-size: 0.8em;
  color: #a5a5a5;
`;

export default App;
