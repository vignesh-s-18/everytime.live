import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const LoadingStream = () => {
  return (
    <Wrapper>
      <FontAwesomeIcon icon={"circle-notch"} spin />
    </Wrapper>
)};

export default LoadingStream;