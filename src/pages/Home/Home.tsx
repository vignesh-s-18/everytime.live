import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Header from './components/Header';
import CreateRoomForm from './components/CreateRoomForm';
import AgreementModal from './components/AgreementModal';

import ReactGA from '../../Analytics';

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
  background-color: var(--background-color);
  color: ${props => props.theme.fontSecondary};
`;

const Home: React.FC<any> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [roomName, setRoomName] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);
  
  const location = useLocation();

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
    setIsModalOpen(true);
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

  useEffect(() => {
    ReactGA.pageview('/');
  }, []);

  // Checks if the user comes from the QR code or referral link.
  useEffect(() => {
    if(!location.hash) return;
    
    // Gets the room id from the url hash and formats it.
    const roomIdFromHash = location.hash.split('#')[1];

    setIsModalOpen(true);
    setRoomName(roomIdFromHash);
  }, []);

  return (
    <Wrapper>
      { isModalOpen && (
          <AgreementModal
            isOpen={isModalOpen}
            roomName={roomName} 
            onClose={() => setIsModalOpen(false)} 
          /> 
      )}
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
