import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

import { Modal, Paragraph } from '../../../components';
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
        <Paragraph>This is not a complete terms of service nor a privacy police.</Paragraph>
        <br/>
        <Paragraph>
          We just want to be trasparent about the data we collect.
          While this website by itself doesn't collect any data from you,
          our cookies do. These cookies are only used for analytical purposes,
          and the data they collect is important to us so we can check how many people
          are using this app.
          <br />
          <br />
          You have control over the data they collect and you can also disable all
          cookies in this website clicking <Link to="/cookies">here.</Link>
          <br />
          <br />
          We're thankful for your support and understanding.
          <br />
          <br />
          Let's videochat!
        </Paragraph>
      </Wrapper>
    </Modal>
  );
};

export default AgreementModal;