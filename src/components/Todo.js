import { useState, useEffect } from "react";
import "../styles/Todo.css";

export default function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", isComplete: false },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    input === "" ? setIsDisabled(true) : setIsDisabled(false);
  }, [input]);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { id: todos.length + 1, text: input, isComplete: false },
    ]);
    setInput("");
  };

  const deleteTodo = (todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const completeTodo = (todo) => {
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          t.isComplete = !t.isComplete;
        }
        return t;
      })
    );
  };
  return (
    <div className="Todo">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit" disabled={isDisabled}>
          Add
        </button>
      </form>
      <ul className="todo">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isComplete ? "completed" : ""}>
            <a onClick={() => completeTodo(todo)}>
              {todo.isComplete ? (
                <img
                  className="cancel-img"
                  src="https://img.icons8.com/color/48/000000/cancel.png"
                />
              ) : (
                <img
                  className="check-img"
                  src="https://img.icons8.com/color/48/000000/checkmark.png"
                />
              )}
            </a>
            <span>{todo.text}</span>

            <a onClick={() => deleteTodo(todo)}>
              <img
                className="delete-img"
                src="https://img.icons8.com/material/24/000000/delete-forever.png"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
