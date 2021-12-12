import { render, screen } from '@testing-library/react';
import { ImageThumbnail } from '../ImageThumbnail';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../assets/styles/theme';

describe('ImageThumbnail component', () => {
  it('should render image thumbnail with correct styles', () => {
    const image = {
      id: '123',
      url: 'some_url'
    };

    render(
      <ThemeProvider theme={theme}>
        <ImageThumbnail image={image} />
      </ThemeProvider>
    );
    const thumbnail = screen.getByRole('img');
    
    expect(thumbnail).toHaveStyle('width: 8rem; height: 6rem; border-radius: 8px');
  });
});
