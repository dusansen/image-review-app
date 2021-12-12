import styled from 'styled-components';
import ButtonProps from '../../models/Button.props';

const getButtonBgColor = ({ disabled, buttonType }: ButtonProps) => {
  if (disabled) {
    return '#dddddd';
  }
  return buttonType === 'like' ? '#273c75' : '#353b48';
};

export const Button = styled.button<ButtonProps>`
  background-color: ${props => getButtonBgColor(props)};
  color: #fff;
  height: min-content;
  padding: 0.8rem 1.2rem;
  border-radius: 100px;
  border: none;
  cursor: ${props => props.disabled ? 'initial' : 'pointer'};
  min-width: 6rem;
`;