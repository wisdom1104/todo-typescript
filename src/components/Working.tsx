import styled from "styled-components";
import TodoBox from "./TodoBox";

export interface Props {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}

export interface Todos {
  todos: Props[];
}

function Working({ todos }: Todos) {
  console.log(todos);

  return (
    <>
      <h2>Working...</h2>
      <StTodoPlace>
        {todos.map((item) => {
          return (
            item.isDone === false && (
              <>
                <div key={item.id}>
                  <TodoBox item={item} />
                </div>
              </>
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
