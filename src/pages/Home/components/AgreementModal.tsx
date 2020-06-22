import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../../components';
import ReactGA from '../../../Analytics';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface IProps {
  onClose: () => void;
  roomName: string;
  isOpen: boolean;
};

const AgreementModal: React.FC<IProps> = ({
  onClose,
  roomName,
  isOpen
}) => {
  const history = useHistory();

  const handleModalClose = () => {
    ReactGA.event({ category: 'Terms', action: 'Denied' });
    onClose();
  };

  const handleConfirmation = () => {
    ReactGA.event({ category: 'Terms', action: 'Accepted' });

    // The user cannot open the room directly, he must be redirected to the room.
    // Otherwise, some connections problems may occur.
    // The history state - {allow:true} - will make the app work as expected.
    history.push('room/' + roomName, { allow: true });
  };

  useEffect(() => {
    ReactGA.modalview('read-terms-and-conditions');
  }, []);

  return (
    <Modal
      onConfirm={handleConfirmation}
      onClose={handleModalClose}
      title={"Before you enter the room..."}
      aria-hidden={!isOpen}
      aria-modal={isOpen}
    >
      <Wrapper>
      </Wrapper>
    </Modal>
  );
};

export default AgreementModal;