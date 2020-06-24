import io from 'socket.io-client';

// @todo add .env vars
let url  = 'https://geteverytime-backend.herokuapp.com' || 'localhost';
let port;

// if(process.env.NETLIFY) {
//   url = process.env.REACT_APP_P_SOCKETIO_URL;
//   port = '';
// };

// if(window.location.hostname === 'localhost') {
//   url = 'localhost';
// };

const socket = io(`${url}${port ? (':' + port) : ''}/`); 

export default socket;
