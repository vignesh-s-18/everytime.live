import React from 'react';
import ReactDOM from 'react-dom';
import axe from 'react-axe';
import adapter from 'webrtc-adapter';

import './socketInstance';
import App from './App';

import * as serviceWorker from './serviceWorker';

// Global styles
import './index.css';

// Icons
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faCircleNotch,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faMicrophoneSlash, 
  faMicrophone,
  faVideoSlash,
  faVideo,
  faCircleNotch,
  faSyncAlt
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if(process.env.NODE_ENV !== 'production') {
  // broken release.
  //axe(React, ReactDOM, 1000, undefined, undefined);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
