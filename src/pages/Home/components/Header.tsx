import React from 'react';
import styled from 'styled-components';

import { Title, Paragraph } from '../../../components';

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: auto;
`;

const AppInfo = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Header = () => {
  return (
    <StyledHeader>
      <AppInfo>
        <Title>
          everyti.me
        </Title>
        <Paragraph>
          We're an open-source, loginless <br />
          video conference app.
        </Paragraph>
      </AppInfo>
    </StyledHeader>
)};

export default Header;