import React from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: cover;
`;

interface IProps {
  [key: string]: any;
}

/**
 * This function will render a <video /> element. It's suitable
 * for the video calls.
 * 
 * @todo - Add ref prop.
 */
const Video = React.forwardRef(
  (props: IProps, ref: any) => (
    <video
      ref={ref}
      className="testvideo"
      autoPlay 
      playsInline 
      width="100%" 
      height="100%" 
      style={{ display: 'inline-block', objectFit: 'cover' }}
    />
));

export default Video;