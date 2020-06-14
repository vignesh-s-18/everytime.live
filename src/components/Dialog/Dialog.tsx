import React from 'react';
import ReactDOM from 'react-dom';
//import styled from 'styled-components';

/*import { Dialog } from '@reach/dialog';

const StyledDialog = styled(Dialog)`
  position: absolute;
  top: 0;
  padding: 2rem;
  background-color: #C3C3C3;
`;

const CustomDialog: React.FC<any> = (props) => {
  return (
    <StyledDialog isOpen={true}>
      <h1>Test</h1>
    </StyledDialog>
  );
};*/

export default (props: any) => {
  return ReactDOM.createPortal(
    <dialog {...props} />,
    document.body
  );
};