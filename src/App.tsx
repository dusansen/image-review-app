import { useState, useMemo } from 'react';
import { getRandomImage } from './api/unsplash';
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
import { useAppDispatch, useAppSelector } from './store';

function App() {
  const { currentImage, isLoadingImage } = useAppSelector(state => state);
  const [likedImages, setLikedImages] = useState<Image[]>(getLikedImagesFromLocalStorage());
  const [declinedImages, setDeclinedImages] = useState<String[]>(getDeclinedImagesFromLocalStorage());
  const imagesThatAppeared = useMemo(
    () => [...declinedImages, ...likedImages.map(({ id }) => id)],
    [likedImages, declinedImages]
  );
  const dispatch = useAppDispatch();

  const fetchNewImage = () => getRandomImage(dispatch, imagesThatAppeared);

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
                <Button disabled={isLoadingImage} onClick={onDeclineClickHandler}>Cancel</Button>
                <Button disabled={isLoadingImage} buttonType='like' onClick={onLikeClickHandler}>Like</Button>
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
  padding: 0 ${({ theme }) => theme.pagePadding} ${({ theme }) => theme.pagePadding} ${({ theme }) => theme.pagePadding} ;
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
