import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';

const STabs = styled(Tabs)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const STabList = styled(TabList)`
  width: 100%;
  height: 7.5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;

  .selected {
    color: white;
    border-bottom: 2px solid white;
  } 
`;

const STab = styled(Tab)`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.75);

  &:hover {
    cursor: pointer;
  }
`;

const QRCodeWrapper = styled(TabPanel)`
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

const TabsContainer = () => {
  const { roomId } = useParams();

  return (
    <STabs>
      <STabList>
        <STab selectedClassName={'selected'}>QR Code</STab>
        <STab selectedClassName={'selected'}>Chat</STab>
      </STabList>
      <QRCodeWrapper>
        <StyledQRCode value={`${window.location.host}/#${roomId}`} />
      </QRCodeWrapper>
    </STabs>
  )
};

export default TabsContainer;