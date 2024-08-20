import { useContext } from 'react';
import DeleteBtn from '/images/delete.svg';
import { TodosContext } from '../App';

export default function Item({ todo }) {
  const { deleteTodo, toggleTodo } = useContext(TodosContext);

  return (
    <div className="w-[40rem] flex justify-between pb-4 pt-4">
      <h1 className="flex">
        <input
          type="checkbox"
          className="w-5"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <p
          className="pl-10 text-2xl"
          style={{
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </p>
      </h1>
      <button onClick={() => deleteTodo(todo.id)}>
        <img src={DeleteBtn} alt="delete button" className="w-8" />
      </button>
    </div>
  );
}