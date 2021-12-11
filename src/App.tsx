import { useState } from 'react';
import { getRandomImage } from './api/api';
import Image from './models/Image';
import styled from 'styled-components';
import { ImagePreview } from './components/ImagePreview';
import { getLikedImagesFromLocalStorage, getDeclinedImagesFromLocalStorage, saveToLocalStorage } from './utils/storage';
import { DECLINED_IMAGES_KEY, LIKED_IMAGES_KEY } from './utils/constants';
import { ApprovedImages } from './components/ApprovedImages';
import { Button } from './components/styled/Button';
import { Header } from './components/styled/Header';
import { Instructions } from './components/styled/Instructions';
import { ToastContainer } from 'react-toastify';

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
        <ApprovedImages images={likedImages} />
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: calc(100% - 4rem);
  padding: 0 ${props => props.theme.pagePadding};
  height: 100%;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    .action-buttons {
      display: flex;
      flex-direction: row;
      gap: 1.2rem;
      margin-top: 1rem;
    }
  }
`;

export default App;
