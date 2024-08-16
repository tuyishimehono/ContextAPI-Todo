import { useEffect, useState } from "react";
import Item from "./components/Item";
import Add from "/images/add.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleChange(event) {
    setInputValue(event.target.value);
  }
  function addTodo(e) {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newTodos = [...todos, { id: Date.now(), text: inputValue }];
      setTodos(newTodos);
      setInputValue("");
    }
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-9xl text-gray-300 font-extrabold pt-10 pb-8">
          todos
        </h1>
        <form onSubmit={addTodo} className="flex justify-between pb-10">
          <input
            className="w-[40rem] px-3 py-5 border shadow-xl text-2xl rounded-2xl"
            type="text"
            placeholder="Add a todo item..."
            name="todo"
            onChange={handleChange}
            value={todos.todo}
          />
          <img className="w-10" src={Add} alt="Add button" onClick={addTodo} />
        </form>
        <div className="flex flex-col divide-y-2">
          {todos.map((todo) => (
            <Item
              key={todo.id}
              todoText={todo.text}
              completed={todo.completed}
              delete={() => deleteTodo(todo.id)}
              toggle={() => toggleTodo(todo.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
