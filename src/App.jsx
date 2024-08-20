import { createContext, useContext, useEffect, useState } from "react";
import Item from "./components/Item";
import Add from "/images/add.svg";
import "./App.css";

const TodosContext = createContext({
  todos: [],
  setTodos: () => {},
  inputValue: "",
  setInputValue: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
});

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newTodos = [...todos, { id: Date.now(), text: inputValue }];
      setTodos(newTodos);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, inputValue, setInputValue, addTodo, toggleTodo, deleteTodo }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-9xl text-gray-300 font-extrabold pt-10 pb-8">
          todos
        </h1>
        <TodoForm />
        <div className="flex flex-col divide-y-2">
          <TodoList />
        </div>
      </div>
    </TodosContext.Provider>
  );
}

function TodoForm() {
  const context = useContext(TodosContext);
  const { inputValue, setInputValue, addTodo } = context;

  return (
    <form onSubmit={addTodo} className="flex justify-between pb-10">
      <input
        className="w-[40rem] px-3 py-5 border shadow-xl text-2xl rounded-2xl"
        type="text"
        placeholder="Add a todo item..."
        name="todo"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <img className="w-10" src={Add} alt="Add button" onClick={addTodo} />
    </form>
  );
}

function TodoList() {
  const context = useContext(TodosContext);
  const { todos, toggleTodo, deleteTodo } = context;

  return (
    <>
      {todos.map((todo) => (
        <Item
          key={todo.id}
          todoText={todo.text}
          completed={todo.completed}
          delete={() => deleteTodo(todo.id)}
          toggle={() => toggleTodo(todo.id)}
        />
      ))}
    </>
  );
}

export default App;