import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import Routes from './navigation';
import theme from './constants/theme.json';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Helmet titleTemplate="%s | geteveryti.me" />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
