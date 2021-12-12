import * as constants from '../constants';

describe('Utils constants', () => {
  it('should match snapshot', () => {
    expect(constants).toMatchSnapshot();
  });
});
