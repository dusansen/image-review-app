import { useState } from 'react';
import { getRandomImage } from './api/api';
import Image from './models/Image';
import styled from 'styled-components';
import ButtonProps from './models/Button.props';
import { ImagePreview } from './components/ImagePreview';

function App() {
  const [currentImage, setCurrentImage] = useState<Image>({ id: '', url: '' });

  const onGetImageClickHandler = async () => {
    const image = await getRandomImage();
    if (!image) {
      // show error
      return;
    }
    setCurrentImage(image);
  }

  return (
    <StyledWrapper>
      <Header><h3>IMAGE APPROVAL APPLICATION</h3></Header>
      <main>
        <div className="approved-images"></div>
        <ImagePreview image={currentImage} onImageClick={onGetImageClickHandler} />
        <div className="action-buttons">
          <Button onClick={onGetImageClickHandler}>Cancel</Button>
          <Button buttonType='like' onClick={onGetImageClickHandler}>Like</Button>
        </div>
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

export default App;
