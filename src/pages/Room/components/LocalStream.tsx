import React, { useRef, useEffect, useState } from 'react';

import { Video, LoadingStream, OnlyAudioStream } from 'components';
import { StreamConfig } from '../types';
import styled from 'styled-components';
import socket from 'socketInstance';

const StreamWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
`;

interface IProps {
  getLocalMedia: any;
  mediaConstraints: StreamConfig;
  [key: string]: any;
};

const LocalStream: React.FC<IProps> = ({ 
  getLocalMedia, 
  mediaConstraints,
  ...props 
}) => {
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [peerConnection, setPC] = useState<RTCPeerConnection|null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream|null>(null);

  const { audio, video } = mediaConstraints as MediaStreamConstraints;
  const elemRef: any = useRef();

  const handlePCOffer = async () => {
    if(!peerConnection) return;
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);    
  }

  const initLocalPeer = () => {
    const pc = new RTCPeerConnection();
    setPC(pc);

    if(!mediaStream) return;
    for(const track of mediaStream.getTracks()) {
      pc.addTrack(track);
    };
  };

  useEffect(initLocalPeer, [mediaStream]);

  useEffect(() => {
    getLocalMedia().then((stream: MediaStream) => {
      elemRef.current.srcObject = stream;
      setMediaStream(stream);
      setLoadingLocal(false);
    });
  }, [mediaConstraints]);

  return (
    <StreamWrapper>
      <Video
        ref={elemRef}
        {...props} 
      />
      { loadingLocal && <LoadingStream />  }
      { audio && !video && <OnlyAudioStream /> }
    </StreamWrapper>
  )
}

export default LocalStream;