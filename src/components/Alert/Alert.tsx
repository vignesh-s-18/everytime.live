import React from 'react';
import styled from 'styled-components';
import * as CSS from 'csstype';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  height: 10vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #202020;
  z-index: 50;

  @media only screen and (max-width: 920px) {
    flex-direction: column;
    justify-content: space-around;
    height: 20vh;
  };
`;

interface IProps {
  style?: CSS.Properties;
  children: any;
};

const Alert: React.FC<IProps> = ({ children, style }) => {
  return (
    <Wrapper role="alert" style={style}>
      { children }
    </Wrapper>
  );
};

export default Alert;
