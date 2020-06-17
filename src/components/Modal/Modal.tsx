// @ts-nocheck
import React, { useEffect, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { Button } from '../';

const Background = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  width: 30%;
  height: 80%;
  border-radius: 5px;
  background-color: #252323;
  color: white;

  @media only screen and (max-width: 1280px) {
    width: 100%;
    height: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  white-space: nowrap;
  overflow-x: hidden;
  height: 10%;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 10vh;
`;

interface IProps {
  onClose?: () => void;
  buttonText?: string;
  children?: any;
  title: string;
};

const Modal: React.FC<IProps> = ({
  onClose,
  title,
  buttonText,
  children
}) => {
  const modalRef = React.createRef<HTMLDivElement>();
  
  const getFocusableElements: HTMLElement[] = () => {
    // The possibleElements string includes every focusable element.
    const possibleElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalRef.current.querySelectorAll(possibleElements);
    
    return focusableElements;
  };
  
  const onModalOpen = () => {
    const focusableElements = getFocusableElements();

    // A11Y: Focus on the first element of the 
    // dialog when it opens.
    focusableElements[0].focus();
    return;
  };

  const handleKeyboardNavigation = (e: KeyboardEvent<any>) => {
    if(!modalRef.current) return;
    
    const focusableElements = getFocusableElements();
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // If the first possible focusable element is active,
    // disables the default behavior of the shift + tab navigation. 
    if(document.activeElement === firstElement) {
      if(!e.shiftKey) return;
      lastElement.focus();
    };
    
    // If the endmost focusable element was the last one active,
    // focus on the first one in the dialog.
    if(document.activeElement === lastElement) {
      if(e.shiftKey) return;
      firstElement.focus();
    };
  };

  const handleKeyDown = (e: KeyboardEvent<any>) => {
    if(!e.keyCode) return;
    
    const listenerFunction = listeners.get(e.keyCode);

    if(!listenerFunction) return;
    listenerFunction(e);
  };

  const listeners = new Map([
    // Escape key
    [27, onClose],
    // Tab key
    [9, handleKeyboardNavigation]
  ]);

  
  useEffect(() => {
    onModalOpen();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal((
    <Background>
      <StyledModal ref={modalRef}>
        <Header>
          <Title>{title}</Title>
        </Header>
        { children }
        <Footer>
          <Button>{ buttonText || 'Ok -->' }</Button>
        </Footer>
      </StyledModal>
    </Background>
  ), document.getElementById('modal') as HTMLElement);
};

export default Modal;