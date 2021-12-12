import renderer from 'react-test-renderer';
import { Button } from '../Button';

describe('Button', () => {
  it('should render Button with styles', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
