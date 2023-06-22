import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface NewTodo {
  title: string;
  content: string;
  isDone: boolean;
}
const useAddTodo = () => {
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return { addComment };
};

function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { addComment } = useAddTodo();
  const onSubmitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      title,
      content,
      isDone: false,
    };
    addComment(newTodo);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <form onSubmit={onSubmitFormHandler}>
        <div>
          <span>제목: </span>
          <input
            maxLength={15}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <span> 내용: </span>
          <input
            maxLength={50}
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button type="submit" value="추가하기">
          추가하기
        </button>
      </form>
    </>
  );
}

export default Form;
