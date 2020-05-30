import React from 'react';
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = styled(FontAwesomeIcon)`
  position: fixed;
  width: 5%;
  height: 5%;
`;

const OnlyAudioStream = () => (
  <StyledIcon icon="microphone" />
)

export default OnlyAudioStream;