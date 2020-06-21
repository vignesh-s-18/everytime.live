import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import socket from '../../socketInstance';
import pcConfig from '../../constants/pcConfig.json';

import { RoomData, StreamConfig } from './types';
import RoomSidebar from './components/RoomSidebar';
import RoomVideos from './components/RoomVideos';
import LocalStream from './components/LocalStream';
import RemoteStream from './components/RemoteStream';
import ReactGA from '../../Analytics';

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
  const [peerConnection,] = useState(new RTCPeerConnection(pcConfig as RTCConfiguration));
  const [mediaConstraints, setMediaConstraints] = useState<StreamConfig>({
    video: true,
    audio: true
  });
  
  const { roomId } =  useParams();
  
  // WEBRTC FUNCTIONS
  
  /**
   * This function will create the peer offer, attach 
   * it to its local description and also send it to
   * the signaling server.
   */
  const handleOfferCreation = async () => {
    //console.warn('--- CREATING AND SENDING OFFER ---');    

    const offer = await peerConnection.createOffer();    
    const sessionDescription = new RTCSessionDescription(offer);
    await peerConnection.setLocalDescription(sessionDescription);
    
    socket.emit('offer', offer);
    return;
  };

  const handleReceivedOffer = async (data: any) => {
    //console.warn('--- OFFER RECEIVED ---');

    const sessionDescription = new RTCSessionDescription(data);
    await peerConnection.setRemoteDescription(sessionDescription);
    //console.warn('--- ADDED REMOTE DESC ---');
    
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer);
  };

  const handleReceivedAnswer = async (data: any) => {
    //console.warn('--- ANSWER RECEIVED ---');

    const sessionDescription = new RTCSessionDescription(data);
    await peerConnection.setRemoteDescription(sessionDescription);

    // As both peers need to create offers,
    // the following block will ensure that
    // every user receives and sends the required
    // data.
    handleOfferCreation();
  };

  const handleLocalIceCandidate = () => {
    peerConnection.addEventListener('icecandidate', e => {
      socket.emit('candidate', e.candidate);
    });
  };

  const handleReceivedIceCandidate = async (msg: any) => {
    if(!msg) return;

    console.log('--- RECEIVED ICE CANDIDATE ---');
    const iceCandidate = new RTCIceCandidate(msg);
    await peerConnection.addIceCandidate(iceCandidate);
  };
  
  /**
   * @todo - Add functionality.
   */
  const setUpSocketIo = () => {
    socket.emit('join-room', roomId);
    socket.emit('init-video', null);
    
    socket.on('user-joined', handleOfferCreation);
    socket.on('offer', handleReceivedOffer);
    socket.on('answer', handleReceivedAnswer);
    socket.on('candidate', handleReceivedIceCandidate);
  };
  
  useEffect(() => {
    setRoomData({ roomId });
    setUpSocketIo();
    
    handleLocalIceCandidate();
  }, [roomId]);

  // ANALYTICS FUNCTIONS

  // This function will send a time event to the 
  // GA every 2 seconds. This helps us to sum up
  // how much time is being spent on our app.
  const sendTimeSpent = () => {
    ReactGA.timing({
      category: 'Room',
      variable: 'time-spent',
      value: 2000
    });
  };

  // Sends a pageview to the analytics.
  useEffect(() => {
    ReactGA.pageview('/room', undefined, roomId);

    const timingInterval = setInterval(sendTimeSpent, 2000);

    return () => {
      clearInterval(timingInterval);
    };
  }, [roomId]);
  
  return (
    <Wrapper>
      <Helmet>
        <title>{ roomId }</title>
      </Helmet>
      <RoomSidebar 
        roomData={roomData}
        setMediaConstraints={setMediaConstraints}
        mediaConstraints={mediaConstraints} 
      />
      <RoomVideos>
        <LocalStream
          peerConnection={peerConnection}
          mediaConstraints={mediaConstraints}
        />
        <RemoteStream peerConnection={peerConnection} />
      </RoomVideos>
    </Wrapper>
  )
};

export default Room;