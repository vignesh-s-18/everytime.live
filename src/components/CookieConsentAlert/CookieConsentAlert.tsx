import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Alert, Paragraph, Button } from '..';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;

  @media only screen and (max-width: 980px) {
    width: 80%;
  }
`;

interface IProps {
  onAcceptAll: () => any;
  onDisableAll: () => any;
};

const CookieConsentAlert: React.FC<any> = ({
  onAcceptAll,
  onDisableAll
}) => {
  return (
    <Alert>
      <Paragraph style={{ color: 'white' }}>
        This page uses cookies.
      </Paragraph>
      <ButtonWrapper>
        <Button 
          style={{ width: '30%' }} 
          variant="transparent" 
          animated={false}
          onClick={onDisableAll}
        >
          Disable all cookies
        </Button>
        <Button 
          style={{ width: '60%' }}
          onClick={onAcceptAll}
        >
          Accept all cookies
        </Button>
      </ButtonWrapper>
    </Alert>
  );
};

export default CookieConsentAlert;