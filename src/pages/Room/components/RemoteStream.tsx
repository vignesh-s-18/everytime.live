import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { Video } from '../../../components';

const StreamWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
`;

interface IProps {
  peerConnection: RTCPeerConnection;
};

const RemoteStream: React.FC<IProps> = ({ peerConnection }) => {
  const elemRef: any = useRef();

  useEffect(() => {
    peerConnection.ontrack = (e: RTCTrackEvent) => {
      if(!elemRef.current) return;
      elemRef.current.srcObject = e.streams[0];
    }
  }, [peerConnection]);

  return (
    <StreamWrapper>
      <Video 
        ref={elemRef}
      />
    </StreamWrapper>
)};

export default RemoteStream;