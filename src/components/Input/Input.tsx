import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  width: ${props => props.width || '100%'};
  height: 2.5rem;
  border-radius: 5px;
  border-bottom: 1px solid ${props => ( 
    props.error
      ? props.theme.inputOutline.error
      : props.theme.inputOutline.normal
  )};

  &:focus {
    outline: 1px solid red;
  }
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

  &:focus + label, &:valid + label {
    top: 0;
    transform: none;
    font-size: 12px;
    transition: 0.1s ease-in-out;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  font-size: 1rem;
  transition: .1s;
`;

interface IProps {
  id: string;
  label: string;
  onChange?: (e: any) => void;
  error?: boolean;
  disabled?: boolean;
  [key: string]: any;
};

/**
 * Renders a <input /> element.
 * 
 * @param disabled    - Sets the input's disabled property. 
 * @param id          - ...
 * @param onChange    - A function to be called everytime the input value changes. 
 * @param label       - All input fields must have an appropriated, coherent label value.
 *                      Keep your label as short as possible.
 * @param error       - If true, the input will be highlighted.
 * @todo Add custom styles property and formatting options.
 */
const Input: React.FC<IProps> = ({
  id,
  label,
  onChange,
  error = false,
  disabled = false,
  ...props
}) => {
  if(props.placeholder) {
    const message = 
      "No placeholder is allowed on this component. " +
      "If you still need to add a placeholder, please use the label property. " +
      "Former orientations still apply - keep the label attr as precise and coherent as possible.";

    throw new Error(message);
  };

  return (
    <Wrapper error={error}>
      <StyledInput
        id={id}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
      <StyledLabel htmlFor={id}>
        {label}
      </StyledLabel>
    </Wrapper>
  )
};

export default Input;