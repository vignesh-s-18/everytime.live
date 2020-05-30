import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section<any>`
  grid-row: 1 / 2;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${props => props.wideVideos ? '1fr' : '50% 50%'};
  grid-template-rows: 50% 50%;
`;

const VideosSection: React.FC<any> = ({ children }) => {
  return (
    <Wrapper wideVideos={children?.length <= 2}>
      { children }
    </Wrapper>
  )
}

export default VideosSection;