import React from "react";
import styled from "styled-components";
import { Props } from "./Working";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  item: Props;
}

export type Id = number;

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id: Id) => {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return { deleteTodo };
};

function TodoBox({ item }: Todo) {
  const { deleteTodo } = useDeleteTodo();
  const onDeleteHandler = (id: Id) => {
    deleteTodo(id);
  };

  return (
    <StTodoBox>
      <StTodBoxText>
        <StTitle>{item.title}</StTitle>
        <StContent>{item.content}</StContent>
        <StBtn
          onClick={() => {
            onDeleteHandler(item.id);
          }}
        >
          삭제하기
        </StBtn>
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
  width: 250px;
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

export const StBtn = styled.button`
  border: 2px dotted #ff7c92;
  border-radius: 10px;
  padding: 7px 10px;
  &:hover {
    border: 2px solid #ff7c92;
  }
`;
