import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${props => props.width || '100%'};
  height: 2.5rem;
  padding-left: 10px;
  border: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  color: white;
  cursor: ${props => props.disabled && 'not-allowed'};

  /* 
    As the app background is black, we have to change 
    the input placeholder color. Otherwise, it won't reach
    the AAA acessibility standards. 
  */
  &::placeholder {
    color: #B0B0B0;
  }
`;

interface IProps {
  placeholder: string;
  disabled?: boolean;
  [key: string]: any;
};

/**
 * Renders a <input /> element.
 * 
 * @param placeholder - The input's placeholder
 * @param disabled - Sets the input's disabled property. 
 * @todo Add custom styles property and formatting options.
 */
const Input: React.FC<IProps> = ({
  placeholder,
  disabled = false,
  ...props
}) => {
  return (
    <StyledInput
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  )
};

export default Input;