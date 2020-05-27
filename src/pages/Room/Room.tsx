import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import io from 'socket.io-client';
import styled from 'styled-components';

import { RoomData } from './types';
import { Video } from '../../components/';
import RoomSidebar from './components/RoomSidebar';
import RoomVideos from './components/RoomVideos';

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  background-color: black;

  @media only screen and (max-width: 980px) {
    grid-template-columns: 100%;
    grid-template-rows: 90% 1fr; 
  };
`;

const Room = () => {
  const [roomData, setRoomData] = useState<RoomData>(null);
  const { roomId } =  useParams();

  useEffect(() => {
    setRoomData({ roomId });
    setUpSocketIo();
  }, []);

  /**
   * @todo - Add functionality.
   */
  const setUpSocketIo = () => { /*
    const socket = io('http://localhost:8080/');
    socket.emit('join-room', roomId);
    socket.emit('init-video', null);
    socket.on('test', console.log); */
  };

  return (
    <Wrapper>
      <Helmet>
        <title>{ roomId }</title>
      </Helmet>
      <RoomSidebar roomData={roomData} />
      <RoomVideos>
        <Video />
      </RoomVideos>
    </Wrapper>
  )
};

export default Room;