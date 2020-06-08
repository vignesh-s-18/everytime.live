import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: ${props => props.width || '100%'};
  height: 2.5rem;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.3);
`;

const StyledInput = styled.input<any>`
  width: ${props => props.width || '100%'};
  height: 2rem;
  padding-left: 10px;
  border: none;
  background-color: transparent;
  color: white;
  outline: none;
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

const StyledLabel = styled.label`
  position: relative;
  left: 10px;
  font-size: 12px;
`;

interface IProps {
  id: string;
  label: string;
  disabled?: boolean;
  [key: string]: any;
};

/**
 * Renders a <input /> element.
 * 
 * @param disabled    - Sets the input's disabled property. 
 * @param id          - ... 
 * @param label       - All input fields must have an appropriated, coherent label value.
 *                      Keep your label as short as possible.
 * 
 * @todo Add custom styles property and formatting options.
 */
const Input: React.FC<IProps> = ({
  id,
  label,
  disabled = false,
  ...props
}) => {
  return (
    <Wrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        disabled={disabled}
        {...props}
      />
    </Wrapper>
  )
};

export default Input;