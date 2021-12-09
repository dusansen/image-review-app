import { useState } from 'react';
import './App.css';
import { getRandomImage } from './api/api';
import Image from './models/Image';

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
    <div className="App">
      <button onClick={onGetImageClickHandler}>Get Image</button>
      {currentImage.url && <img src={currentImage.url} alt='random image' />}
    </div>
  );
}

export default App;
