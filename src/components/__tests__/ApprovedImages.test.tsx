import { render, screen } from '@testing-library/react';
import { ApprovedImages } from '../ApprovedImages';
import { ThemeProvider } from 'styled-components';
import { theme } from './../../assets/styles/theme';

const images = [
  { id: '1', url: 'url_1' },
  { id: '2', url: 'url_2' },
  { id: '3', url: 'url_3' },
  { id: '4', url: 'url_4' },
  { id: '5', url: 'url_5' },
  { id: '6', url: 'url_6' },
  { id: '7', url: 'url_6' },
  { id: '8', url: 'url_6' },
  { id: '9', url: 'url_6' },
  { id: '10', url: 'url_6' },
  { id: '11', url: 'url_6' },
];

describe('ApprovedImages component', () => {
  it('should render approved images', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ApprovedImages images={images} />
      </ThemeProvider>
    );

    expect(screen.getByText(`APPROVED IMAGES (${images.length})`)).toBeInTheDocument();
    expect(container.querySelector('.rec-carousel-wrapper')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(images.length);
  });

  it('should not render images carousel when there is no images', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ApprovedImages images={[]} />
      </ThemeProvider>
    );

    expect(screen.getByText('APPROVED IMAGES (0)')).toBeInTheDocument();
    expect(container.querySelector('.rec-carousel-wrapper')).not.toBeInTheDocument();
  });
});
