import renderer from 'react-test-renderer';
import { Header } from '../Header';

describe('Header', () => {
  it('should render Header with styles', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
