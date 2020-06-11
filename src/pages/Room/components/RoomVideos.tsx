import React, { useState } from 'react';
import styled from 'styled-components';

type TOrientation = 'horizontal' | 'vertical'; 

const Wrapper = styled.div<any>`
  grid-row: 1 / 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${props => props.orientation === 'horizontal' ? '1fr' : '50% 50%'};
  grid-template-rows: ${props => props.orientation === 'horizontal' ? '50% 50%' : '100%'};
`;

const RoomVideos: React.FC<any> = ({ children }) => {
  const [orientation, setOrientation] = useState<TOrientation>('vertical');

  return (
    <Wrapper orientation={orientation}>
      { children }
    </Wrapper>
  )
}

export default RoomVideos;