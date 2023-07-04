import React, { useState } from "react";
import styled from "styled-components";
import { Todo } from "./Working";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

export interface Props {
  todo: Todo;
}

export interface StBtnProps {
  borderColor?: string;
  margin?: string;
}

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation({
    mutationFn: async (id: Todo["id"]) => {
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

const useCompletTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: completTodo } = useMutation({
    mutationFn: async (complet: Todo) => {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${complet.id}`,
        {
          isDone: complet.isDone,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return { completTodo };
};

function TodoBox({ todo }: Props) {
  const navi = useNavigate();
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);
  const [isEdit, setIsEdit] = useState(false);

  const { deleteTodo } = useDeleteTodo();
  const onDeleteHandler = (id: Todo["id"]) => {
    deleteTodo(todo.id);
  };
  const { editTodo } = useEditTodo();
  const onEditHandler = (edit: Todo) => {
    editTodo(edit);
    setIsEdit(!isEdit);
  };
  const { completTodo } = useCompletTodo();
  const onCompletHandler = (complet: Todo) => {
    completTodo(complet);
  };

  return (
    <StTodoBox>
      {!isEdit ? (
        <>
          <StSubBtn>
            <StBtn
              borderColor={"#ffc95f"}
              onClick={() => {
                navi(`/detail/${todo.id}`);
              }}
            >
              상세페이지
            </StBtn>
          </StSubBtn>
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
            <StBtn
              borderColor={"#83c671"}
              onClick={() => {
                const complet = {
                  id: todo.id,
                  isDone: !todo.isDone,
                };
                onCompletHandler(complet);
              }}
            >
              {todo.isDone ? "취소" : "완료"}
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
  border: 3px solid steelblue;
  border-radius: 20px;
  width: 250px;
  min-height: 200px;
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
  margin: ${(props) => props.margin || "0px"};
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

export const StSubBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
