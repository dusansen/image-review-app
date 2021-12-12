import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/styles/theme';
import { ImagePreview } from '../ImagePreview';

describe('ImagePreview component', () => {
  const onImageClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render AddImagePlaceholder', () => {
    const image = {
      id: '',
      url: ''
    };
    

    render(
      <ThemeProvider theme={theme}>
        <ImagePreview image={image} onImageClick={onImageClick} />
      </ThemeProvider>
    );

    expect(screen.getByTestId('add-image-placeholder')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'plus-icon' })).toBeInTheDocument();
  });

  it('should render Image', () => {
    const image = {
      id: '123',
      url: 'some_url'
    };

    render(
      <ThemeProvider theme={theme}>
        <ImagePreview image={image} onImageClick={onImageClick} />
      </ThemeProvider>
    );

    expect(screen.getByRole('img', { name: image.id })).toBeInTheDocument();
  });

  it('should handle click on AddImagePlaceholder', () => {
    const image = {
      id: '',
      url: ''
    };
    
    render(
      <ThemeProvider theme={theme}>
        <ImagePreview image={image} onImageClick={onImageClick} />
      </ThemeProvider>
    );
    const addImagePlaceholder = screen.getByTestId('add-image-placeholder');
    userEvent.click(addImagePlaceholder);

    expect(onImageClick).toHaveBeenCalled();
  });
});

