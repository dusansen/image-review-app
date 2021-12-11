const DARK_GRAY = '#dcdde1';

export const theme = {
  pagePadding: '2rem',
  imageBorderRadius: '8px',
  imageWidth: '40rem',
  imageHeight: '25rem',
  separatorBorder: `2px solid ${DARK_GRAY}`,
  colors: {
    darkGray: DARK_GRAY
  },
  mixins: {
    imageStyles: (width: string, height: string, borderRadius: string) =>
      `width: ${width}; height: ${height}; border-radius: ${borderRadius};`,
  },
};
