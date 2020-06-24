// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import PIPIcon from '../../../assets/icons/pip-icon.png';
import { Video } from '../../../components';

const StreamWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
`;

const IconWrapper = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: 20px;
  height: auto;
  background: none;
  border: none;
  z-index: 10;

  & > img {
    width: 100%;
    height: 100%;
    color: white;
    background-color: white;
  }
`;

interface IProps {
  peerConnection: RTCPeerConnection;
};

const RemoteStream: React.FC<IProps> = ({ peerConnection }) => {
  const [showPIPIcon, setShowPIPIcon] = useState(true);

  const elemRef: any = useRef();

  useEffect(() => {
    peerConnection.ontrack = (e: RTCTrackEvent) => {
      if(!elemRef.current) return;
      elemRef.current.srcObject = e.streams[0];
    }
  }, [peerConnection]);

  // Calls the picture-in-picture api.
  const handleIconClick = async () => {
    // If the ref isn't defined yet OR the stream isn't
    // being showed yet, do nothing.  
    if(!elemRef.current) return;
    if(elemRef.current.readyState === 0) return;
    
    // If the remote stream is not already in the PIP mode...
    if(elemRef.current !== document.pictureInPictureElement) {
      console.log('Entering PIP mode...');
      setShowPIPIcon(false);
      
      await elemRef.current.requestPictureInPicture();
      return;
    }

    setShowPIPIcon(true); 
    await document.exitPictureInPicture();
  };

  return (
    <StreamWrapper>
      { document.pictureInPictureEnabled && (
          <IconWrapper 
            disabled={!showPIPIcon}
            onClick={handleIconClick} 
            aria-hidden={!showPIPIcon}
            aria-label={'Picture-in-picture'}
          >
            <img 
              src={PIPIcon} 
              alt={'PIP icon'}
              aria-hidden={true}
            />
          </IconWrapper>
      )}
      <Video 
        flipped
        ref={elemRef}
      />
    </StreamWrapper>
)};

export default RemoteStream;