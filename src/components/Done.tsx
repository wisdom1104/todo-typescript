import TodoBox from "./TodoBox";
import { StTodoPlace, Todos } from "./Working";

function Done({ todos }: Todos) {
  return (
    <>
      <h2>Done...</h2>
      <StTodoPlace>
        {todos.map((item) => {
          return (
            item.isDone === false && (
              <div key={item.id}>
                <TodoBox item={item} />
              </div>
            )
          );
        })}
      </StTodoPlace>
    </>
  );
}

export default Done;
