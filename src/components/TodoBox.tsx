import React from "react";
import styled from "styled-components";
import { Props } from "./Working";

export interface Todo {
  item: Props;
}

function TodoBox({ item }: Todo) {
  return (
    <StTodoBox>
      <StTodBoxText>
        <StTitle>{item.title}</StTitle>
        <StContent>{item.content}</StContent>
      </StTodBoxText>
    </StTodoBox>
  );
}

export default TodoBox;
const StTodoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid steelblue;
  border-radius: 20px;
  width: auto;
  height: auto;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  word-break: break-all;
`;

const StTodBoxText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StTitle = styled.h2`
  margin: 0px;
`;
const StContent = styled.span`
  margin: 20px 0px;
`;
