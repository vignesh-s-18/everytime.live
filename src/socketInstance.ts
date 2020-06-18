import io from 'socket.io-client';

let url  = process.env.REACT_APP_SOCKETIO_URL || 'localhost';
let port = process.env.REACT_APP_SOCKETIO_PORT || '80';

if(window.location.hostname === 'localhost') {
  url = 'localhost';
};

const socket = io(`http://${url}:${port}/`); 

export default socket;
