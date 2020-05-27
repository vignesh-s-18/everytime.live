import React from 'react';
import CSS from 'csstype';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const StyledButton = styled.button<any>`
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 3px;
  color: ${props => props.type === 'transparent' ? 'white' : 'black'};
  background-color: ${props => props.theme.buttonBackground[props.type]};
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    ${({ animated, theme, type }) => animated && `
      transform: translateY(-3px);
      box-shadow: 0px 3px 0px ${theme.buttonShadow[type]};
      transition: 0.2s;
    `};
  }

  &:active {
    transform: none;
    box-shadow: none;
  }

  &:disabled {
    background-color: gray;

    &:hover {
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  }
`;

interface IProps {
  onClick?: () => void;
  type?: "primary" | "warning" | "error" | "transparent";
  animated?: boolean;
  disabled?: boolean;
  style?: CSS.Properties;
  icon?: string;
  children: any;
  [key: string]: any; 
};

/**
 * Renders a button components. The component supports four diferents types: "error",
 * "primary", "warning" and "transparent". They all have different color schemes that will match
 * the desired type. 
 * 
 * @param disabled - Grays out the button and blocks any interaction with it.
 * @param animated - Defines if the button should be animated or not. 
 * @param type     - Defines the button color scheme by its type. 
 * @param icon     - Display an icon before the button text.
 * @param styles   - Custom styles.
 *  
 * @todo - Add size property. Add transparent mode.  
 */
const Button: React.FC<IProps> = ({
  styles,
  children,
  icon,
  animated = true,
  type = "primary",
  disabled = false,
  ...props 
}) => (
  <StyledButton 
    type={type}
    disabled={disabled} 
    animated={animated} 
    {...props}
  >
    { icon && <FontAwesomeIcon aria-hidden={true} icon={icon as IconName} /> } 
    { children }
  </StyledButton>
);

export default Button;