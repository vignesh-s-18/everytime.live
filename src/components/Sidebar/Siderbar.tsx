import React from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 10%;
  height: 100%;
  background-color: black;
`;

const Sidebar = () => {
  return (
    <StyledSidebar />
)};

export default Sidebar;