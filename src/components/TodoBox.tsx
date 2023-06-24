import React, { useState } from "react";
import styled from "styled-components";
import { Todo } from "./Working";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Props {
  todo: Todo;
}

export interface StBtnProps {
  borderColor: string;
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

const useEditTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: editTodo } = useMutation({
    mutationFn: async (edit: Todo) => {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${edit.id}`,
        {
          title: edit.title,
          content: edit.content,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return { editTodo };
};

function TodoBox({ todo }: Props) {
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);
  const [isEdit, setIsEdit] = useState(false);

  const { deleteTodo } = useDeleteTodo();
  const onDeleteHandler = (id: Id) => {
    deleteTodo(id);
  };
  const { editTodo } = useEditTodo();
  const onEditHandler = (edit: Todo) => {
    editTodo(edit);
    setIsEdit(!isEdit);
  };

  return (
    <StTodoBox>
      {!isEdit ? (
        <>
          <StTodBoxText>
            <StTitle>{todo.title}</StTitle>
            <StContent>{todo.content}</StContent>
          </StTodBoxText>
          <StBtnPlace>
            <StBtn
              borderColor={"#ff7c92"}
              onClick={() => {
                onDeleteHandler(todo.id);
              }}
            >
              삭제하기
            </StBtn>
            <StBtn
              borderColor={"#5fc4ff"}
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              수정하기
            </StBtn>
          </StBtnPlace>
        </>
      ) : (
        <>
          <StInput
            maxLength={15}
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
          <StInput
            maxLength={50}
            style={{ margin: "20px 0px" }}
            type="text"
            value={editContent}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
          />
          <StBtnPlace>
            <StBtn
              borderColor={"#ff7c92"}
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              수정취소
            </StBtn>
            <StBtn
              borderColor={"#5fc4ff"}
              onClick={() => {
                const edit = {
                  id: todo.id,
                  title: editTitle,
                  content: editContent,
                };
                onEditHandler(edit);
              }}
            >
              수정완료
            </StBtn>
          </StBtnPlace>
        </>
      )}
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
  min-height: 170px;
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

export const StBtnPlace = styled.div`
  display: flex;
  gap: 7px;
  margin: 0px auto;
`;

export const StBtn = styled.button<StBtnProps>`
  border: 2px dotted ${(props) => props.borderColor};
  border-radius: 10px;
  padding: 7px 10px;
  &:hover {
    border: 2px solid ${(props) => props.borderColor};
  }
`;

export const StInput = styled.input`
  border-radius: 10px;
  border: 2px solid rgb(141, 175, 203);
  height: 30px;
  width: 190px;
  &:hover {
    border: 2px solid steelblue;
  }
`;
