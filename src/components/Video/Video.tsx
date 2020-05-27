import React from 'react';

interface IProps {
  [key: string]: any;
}

/**
 * This function will render a <video /> element. It's suitable
 * for the video calls.
 * 
 * @todo - Add source param.
 */
const Video: React.FC<IProps> = () => (
  <video
    className="testvideo"
    autoPlay 
    playsInline 
    width="100%" 
    height="100%" 
    style={{ display: 'inline-block', objectFit: 'cover' }}
  />
);

export default Video;