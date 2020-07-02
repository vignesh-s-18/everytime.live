import React from 'react';
import styled from 'styled-components';
import * as CSS from 'csstype';

const StyledParagraph = styled.p<any>`
  font-size: 1rem;
  font-family: 'Inter', sans-serif !important;
  color: var(--font-secondary);
`;

interface IProps {
  style?: CSS.Properties;
  children: any;
};

/**
 * Renders a text paragraph, useful for any information that 
 * doesn't need to be really evident.
 * 
 * @param style - Custom styles that will be applied to the element. 
 */
const Paragraph: React.FC<IProps> = ({ 
  children,
  style 
}) => <StyledParagraph style={style}>{children}</StyledParagraph>

export default Paragraph;