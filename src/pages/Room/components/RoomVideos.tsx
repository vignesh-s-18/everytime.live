import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type TOrientation = 'horizontal' | 'vertical'; 

const Wrapper = styled.div<any>`
  position: relative;
  grid-row: 1 / 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${props => props.orientation === 'horizontal' ? '1fr' : '50% 50%'};
  grid-template-rows: ${props => props.orientation === 'horizontal' ? '50% 50%' : '100%'};
`;

const FlipOrientationIcon = styled<any>(FontAwesomeIcon)`
  position: absolute;
  margin: 0;
  padding: 0;
  color: white;
  top: 10px;
  left: 10px;
  z-index: 20;

  &:hover {
    cursor: pointer;
  }
`;

const RoomVideos: React.FC<any> = ({ children }) => {
  const [orientation, setOrientation] = useState<TOrientation>('vertical');

  const handleIconClick = (e: KeyboardEvent) => {
    // If the key pressed isn't the space or the enter key,
    // do nothing.
    if(e.keyCode !== 32 && e.keyCode !== 13) return;
    
    setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <Wrapper orientation={orientation}>
      { children.length <= 2 && (
          <FlipOrientationIcon
            tabIndex={0}
            icon="sync-alt"
            onClick={handleIconClick}
            onKeyDown={handleIconClick} 
          /> 
      )}
      { children }
    </Wrapper>
  )
}

export default RoomVideos;