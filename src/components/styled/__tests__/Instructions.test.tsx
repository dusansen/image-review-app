import renderer from 'react-test-renderer';
import { Instructions } from '../Instructions';

describe('Instructions', () => {
  it('should render Instructions with styles', () => {
    const tree = renderer.create(<Instructions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
