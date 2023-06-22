import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Working from "../components/Working";
import Done from "../components/Done";

const useGetTodos = () => {
  const {
    data: todos,
    isError,
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/todos`
      );
      return response.data;
    },
  });
  return { todos, isError, isLoading };
};
function Home() {
  const { isLoading, isError, todos } = useGetTodos();

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <>
      <Header />
      <div>Home</div>
      <Form />
      <Working todos={todos} />
      <Done todos={todos} />
    </>
  );
}

export default Home;
