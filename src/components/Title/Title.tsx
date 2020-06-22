import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1<any>`
  font-family: 'Quicksand', sans-serif !important;
  font-size: 2.5rem;
  color: var(--font-primary);
`;

interface IProps {
  children: string | undefined;
};

const Title: React.FC<IProps> = ({ 
  children 
}) => <StyledTitle>{children}</StyledTitle>

export default Title;