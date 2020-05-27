import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Header from './components/Header';
import CreateRoomForm from './components/CreateRoomForm';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.section<any>`
  flex: 1;
  height: 100%;
  padding: 10vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Quicksand';
  font-size: 1.5rem;
  background-color: #090909;
  color: ${props => props.theme.fontSecondary};
`;

const Home: React.FC<any> = () => {
  const [roomName, setRoomName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  
  /**
   * @todo - Add room name validation.
   */
  const handleButtonClick = () => {
    setIsChecking(true);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header />
      <CreateRoomForm 
        onInputChange={(e: any) => setRoomName(e.target.value)}
        inputValue={roomName}
        onButtonClick={handleButtonClick}
        isChecking={isChecking} 
      />
    </Wrapper>
  )
};

export default Home;
