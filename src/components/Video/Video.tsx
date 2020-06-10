import React from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video<any>`
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: cover;

  ${props => props.flipped && `
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  `};
`;

interface IProps {
  flipped?: string;
  [key: string]: any;
}

/**
 * This function will render a <video /> element. It's suitable
 * for the video calls.
 * 
 * @param flipped - Flips the video horizontally.
 * @todo          - Add ref prop.
 */
const Video = React.forwardRef(
  (props: IProps, ref: any) => (
    <StyledVideo
      ref={ref}
      autoPlay 
      playsInline
      flipped={props.flipped}
      className="testvideo"
    />
));

export default Video;