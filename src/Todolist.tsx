import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import {
  todosAtom,
  loadingAtom,
  errorAtom,
  getTodosAtom,
  addTodoAtom,
  deleteTodoAtom,
  toggleTodoAtom,
} from "./store/useStore.tsx";

function Todo() {
  const [title, setTitle] = useState("");

  const todos = useAtomValue(todosAtom);
  const loading = useAtomValue(loadingAtom);
  const error = useAtomValue(errorAtom);

  const getTodos = useSetAtom(getTodosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const deleteTodo = useSetAtom(deleteTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await addTodo(name.trim());

    setTitle("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          ++ Add
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: "15px" }}>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => toggleTodo(todo)}
            />

            <span
              style={{
                textDecoration: todo.status
                  ? "line-through"
                  : "none",
                margin: "0 10px",
              }}
            >
              {todo.name}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;