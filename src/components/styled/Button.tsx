import styled from 'styled-components';
import ButtonProps from '../../models/Button.props';

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.buttonType === 'like' ? '#273c75' : '#353b48'};
  color: #fff;
  height: min-content;
  padding: 0.8rem 1.2rem;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  min-width: 6rem;
`;