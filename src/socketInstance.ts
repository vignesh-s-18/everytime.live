import io from 'socket.io-client';

let url = '192.168.0.46';

if(window.location.hostname === 'localhost') {
  url = 'localhost';
};

const socket = io(`http://${url}:7070/`); 

export default socket;