import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// components & customs handlers
import { Home, Room } from '../pages';
import { CookieConsentAlert } from '../components';
import ReactGA, { trackingCode } from '../Analytics';

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: ${window.innerHeight}px;
`;

const Routes = () => {
  // resposible for the cookie consent alert answer, so
  // if true, the user has already answered it.
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    // Checks if the user already consented the cookie usage.
    const consentFromLS = localStorage.getItem('cookieConsent');

    // If the user has already answered the consent alert, set the state as true 
    // and don't show the cookie alert. 
    // The localStorage only accepts 'true', 'false' (strings types, not bools) 
    // or null (if no data is found).
    if(consentFromLS) {
      setHasAnswered(true);
      return;
    }

    setHasAnswered(false);
    return;
  }, []);

  const handleAlertAnswer = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted.toString());
    
    // If the user has accepted the cookies alert,
    // start tracking them.
    if(accepted) {
      ReactGA.initialize(trackingCode);
    };

    setHasAnswered(true);
  };

  return (
    <Router>
      { !hasAnswered && (
          <CookieConsentAlert 
            onAcceptAll={() => handleAlertAnswer(true)}
            onDisableAll={() => handleAlertAnswer(false)}
          />
      )}
      <Wrapper>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room/:roomId' component={Room} />
        </Switch>
      </Wrapper>
    </Router>
)};

export default Routes;