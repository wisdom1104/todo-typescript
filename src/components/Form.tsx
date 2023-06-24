import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

interface NewTodo {
  title: string;
  content: string;
  isDone: boolean;
}
const useAddTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: addTodo } = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return { addTodo };
};

function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addTodo } = useAddTodo();
  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      title,
      content,
      isDone: false,
    };
    addTodo(newTodo);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <StForm onSubmit={onSubmitFormHandler}>
        <StInputBox>
          <span>제목: </span>
          <StInput
            maxLength={15}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <span> 내용: </span>
          <StInput
            maxLength={50}
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </StInputBox>
        <StFormBtn type="submit" value="추가하기">
          추가하기
        </StFormBtn>
      </StForm>
    </>
  );
}

export default Form;

const StForm = styled.form`
  display: flex;
  width: 98%;
  height: 70px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(141, 175, 203);
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 20px;
  margin-bottom: 20px;
`;

const StInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StInput = styled.input`
  border-radius: 10px;
  border: 2px solid rgb(141, 175, 203);
  height: 30px;
  width: 190px;
  &:hover {
    border: 2px solid steelblue;
  }
`;

const StFormBtn = styled.button`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  padding: 7px 20px;
  &:hover {
    border: 2px solid steelblue;
  }
`;
