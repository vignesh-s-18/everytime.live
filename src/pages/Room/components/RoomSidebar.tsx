import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { Title, Button, Paragraph } from '../../../components';
import { RoomData, StreamConfig } from '../types';

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  background-color: #292929;

  @media only screen and (max-width: 980px) {
    justify-content: center;
    align-items: center;
    grid-column: 1 / -1;
    grid-row: 2 / -1;
  }
`;

const Header = styled.section`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1D1D1D;
`;

const Configurations = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #1D1D1D;

  & > button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1.5%;
    width: 35%;    
  }
`;

const QRCodeWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledQRCode = styled(QRCode)`
  border: 10px solid white;
  border-radius: 5px;
  align-self: center;
  justify-self: center;
`;

interface IProps {
  roomData: RoomData;
  mediaConstraints: StreamConfig;
  setMediaConstraints: (e: any) => void;
};

const SidebarButton = ({
 children,
 onClick,
 icon
}: any) => (
  <Button
    type="transparent"
    animated={false}
    onClick={onClick}
    icon={icon}
  >
    {children}
  </Button>
)

const RoomSidebar: React.FC<IProps> = ({ 
  roomData,
  mediaConstraints,
  setMediaConstraints
}) => {
  const changeMediaConstraints = (type: 'audio' | 'video') => {
    setMediaConstraints({
      ...mediaConstraints,
      [type]: !mediaConstraints[type]
    });
  };

  return (
    <StyledSidebar>
      <Header>
        <Title>{ roomData?.roomId }</Title>
      </Header>
      <Configurations>
        <SidebarButton icon="microphone" onClick={() => changeMediaConstraints("audio")}>
          { mediaConstraints.audio ? 'Disable' : 'Enable' } audio
        </SidebarButton>
        <SidebarButton icon="video" onClick={() => changeMediaConstraints("video")}>
          { mediaConstraints.video ? 'Disable' : 'Enable' } video
        </SidebarButton>
      </Configurations>
      <QRCodeWrapper>
        <StyledQRCode value={window.location.href} />
      </QRCodeWrapper>
  </StyledSidebar>
)};

export default RoomSidebar;
