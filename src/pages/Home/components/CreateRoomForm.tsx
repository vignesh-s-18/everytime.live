import React from 'react';
import styled from 'styled-components';

import { Input, Button } from '../../../components';

const Form = styled.form`
  width: 100%;
  height: 10vh;
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 5vw;

  @media only screen and (max-width: 980px) {
    grid-template-columns: 50% 50%;
  }
`;

interface IProps {
  onInputChange: (e: any) => void;
  inputValue: string | null;
  onFormSubmit: (e: any) => void;
  isChecking: boolean;
  hasError: boolean;
};

const CreateRoomForm: React.FC<IProps> = ({
  onInputChange,
  inputValue,
  onFormSubmit,
  isChecking,
  hasError
}) => {
  return (
    <Form onSubmit={onFormSubmit}>
      <Input
        error={hasError}
        required={true}
        disabled={isChecking} 
        value={inputValue} 
        onChange={onInputChange}
        type="text"
        name="roomName"
        label="Your room ID" 
        id="roomId"
      />
      
      <Button 
        disabled={isChecking} 
        type="submit"
      >
        { isChecking ? 'Checking availability...' : 'Create a room -->' }
      </Button>
    </Form>
  )
}

export default CreateRoomForm;