import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import Header from './components/Header';
import CreateRoomForm from './components/CreateRoomForm';
import { RouteComponentProps } from 'react-router-dom';

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

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [hasError, setHasError] = useState(false);
  const [roomName, setRoomName] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);
  
  /**
   * @todo - Add room name validation.
   */
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setIsChecking(true);

    // Validates the form name. If the name isn't available or if
    // it doesn't fit the requirements, the app will alert the user.
    const validation = isValidId();

    if(!validation) {
      setHasError(true);
      setIsChecking(false);
      return;
    };

    setIsChecking(false);
    history.push('/room/' + roomName);
  };

  /**
   * This function handles the room ID/name validation.
   * The ID must have only letters and numbers and it can't
   * be longer than 5 characters. 
   * 
   * @todo Add more detailed error messages.
   */
  const isValidId = () => {
    if(!roomName) return false;
    if(roomName.length > 5) return false;
    
    return true;
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
        onFormSubmit={handleFormSubmit}
        isChecking={isChecking}
        hasError={hasError} 
      />
    </Wrapper>
  )
};

export default Home;
