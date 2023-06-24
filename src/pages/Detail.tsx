import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Todo } from "../components/Working";
import styled from "styled-components";

const useGetTodos = () => {
  const {
    data: todos,
    isError,
    isLoading,
  } = useQuery(["todos"], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/todos`
    );
    return response.data;
  });

  return { todos, isError, isLoading };
};

function Sub() {
  const { isLoading, isError, todos } = useGetTodos();
  const { id } = useParams();
  const subTodo = todos?.find((item: Todo) => {
    return item.id === Number(id);
  });

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  return (
    <StSub>
      <StSubBox>
        <StBack>
          <Link to="/">돌아가기</Link>
        </StBack>
        <StSubBoxText> ID:{id}</StSubBoxText>
        <StSubBoxText>제목: {subTodo.title}</StSubBoxText>
        <StSubBoxText>내용: {subTodo.content}</StSubBoxText>
      </StSubBox>
    </StSub>
  );
}

export default Sub;

export const StSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StBack = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StSubBox = styled.div`
  border: 5px solid steelblue;
  border-radius: 50px;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 40px;
`;

export const StSubBoxText = styled.span`
  font-size: 20px;
  line-height: 30px;
  word-break: break-all;
`;
