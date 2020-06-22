import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p<any>`
  font-size: 1rem;
  font-family: 'Inter', sans-serif !important;
  color: var(--font-secondary);
`;

interface IProps {
  children: string & any;
};

const Paragraph: React.FC<IProps> = ({ 
  children 
}) => <StyledParagraph>{children}</StyledParagraph>

export default Paragraph;