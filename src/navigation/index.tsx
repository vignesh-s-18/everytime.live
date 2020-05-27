import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, Room } from '../pages';

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: ${window.innerHeight}px;
`;

const Routes = () => {
  return (
    <Router>
      <Wrapper>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room/:roomId' component={Room} />
        </Switch>
      </Wrapper>
    </Router>
)};

export default Routes;