import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

// Components
import Routes from './navigation';

// Theming
import theme from './constants/theme.json';
import useTheming from './hooks/useTheming';

function App() {
  useTheming();

  return (
    <ThemeProvider theme={theme}>
      <Helmet titleTemplate="%s | geteveryti.me" />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
