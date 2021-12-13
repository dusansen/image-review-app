import * as constants from '../constants';

describe('Store constants', () => {
  it('should match snapshot', () => {
    expect(constants).toMatchSnapshot();
  });
});