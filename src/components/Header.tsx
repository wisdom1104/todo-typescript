import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <>
      <StHeader>
        <StHeaderTitle>My Todo List</StHeaderTitle>
        <span>Olaf</span>
      </StHeader>
    </>
  );
}

export default Header;
const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: 30px;
`;

const StHeaderTitle = styled.h1`
  margin: 0;
`;
