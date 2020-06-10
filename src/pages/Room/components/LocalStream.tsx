import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Video, LoadingStream, OnlyAudioStream } from '../../../components';
import { StreamConfig } from '../types';

const StreamWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
`;

interface IProps {
  mediaConstraints: StreamConfig;
  peerConnection: RTCPeerConnection;
  [key: string]: any;
};

const LocalStream: React.FC<IProps> = ({ 
  mediaConstraints,
  peerConnection,
  ...props 
}) => {
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [mediaStream, setMediaStream] = useState<MediaStream|null>(null);

  const { audio, video } = mediaConstraints;
  const elemRef: any = useRef();

  const addMediaStreamToPeer = () => {
    if(!mediaStream) return;

    for(const track of mediaStream.getVideoTracks()) {
      if(!mediaConstraints.video) {
        track.enabled = false;
      };

      peerConnection.addTrack(track, mediaStream);
    };

    for(const track of mediaStream.getAudioTracks()) {
      if(!mediaConstraints.audio) {
        track.enabled = false;
      };

      peerConnection.addTrack(track, mediaStream);
    };
  };

  useEffect(() => {
    const getLocalMedia = async () => {
      const stream: MediaStream = await navigator
        .mediaDevices
        .getUserMedia(mediaConstraints);

      return stream;
    };

    getLocalMedia().then((stream: MediaStream) => {
      if(!elemRef.current) return;

      elemRef.current.srcObject = stream;
      setMediaStream(stream);
      setLoadingLocal(false);
    });
  }, [mediaConstraints]);

  useEffect(addMediaStreamToPeer, [mediaStream]);

  /**
   * If the user leaves the /room and navigates to the home screen,
   * the stream won't stop recording. The following function will
   * clean up all the remaining tracks that are still active.
   */
  /*useEffect(() => {
    return function cleanup() {
      if(!mediaStream) return;

      for(const track of mediaStream.getTracks()) {
        if(track.readyState !== 'live') return;
        track.stop();
      }
    } 
  });*/

  return (
    <StreamWrapper>
      <Video
        flipped
        ref={elemRef}
        {...props} 
      />
      { loadingLocal && <LoadingStream />  }
      { audio && !video && <OnlyAudioStream /> }
    </StreamWrapper>
  )
}

export default LocalStream;