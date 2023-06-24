import styled from "styled-components";
import TodoBox from "./TodoBox";

export interface Todo {
  id: number;
  title: string;
  content: string;
  isDone?: boolean;
}

export interface Todos {
  todos: Todo[];
}

function Working({ todos }: Todos) {
  return (
    <>
      <h2>Working...</h2>
      <StTodoPlace>
        {todos.map((item) => {
          return (
            item.isDone === false && (
              <div key={item.id}>
                <TodoBox todo={item} />
              </div>
            )
          );
        })}
      </StTodoPlace>
    </>
  );
}

export default Working;
export const StTodoPlace = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
