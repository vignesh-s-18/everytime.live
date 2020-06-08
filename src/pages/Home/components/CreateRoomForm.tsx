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
  onButtonClick: () => void;
  isChecking: boolean;
};

const CreateRoomForm: React.FC<IProps> = ({
  onInputChange,
  inputValue,
  onButtonClick,
  isChecking
}) => {
  return (
    <Form>
      <Input
        required={true}
        disabled={isChecking} 
        value={inputValue} 
        onChange={onInputChange}
        type="text"
        label="Your room ID" 
        id="roomId"
      />
      
      <Button 
        disabled={isChecking} 
        onClick={onButtonClick} 
        type="submit"
      >
        { isChecking ? 'Checking availability...' : 'Create a room -->' }
      </Button>
    </Form>
  )
}

export default CreateRoomForm;