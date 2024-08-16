import DeleteBtn from "/images/delete.svg";
export default function Item(props) {
  return (
    <div className="w-[40rem] flex justify-between pb-4 pt-4">
      <h1 className="flex">
        <input
          type="checkbox"
          className="w-5"
          checked={props.completed}
          onChange={props.toggle}
        />
        <p
          className="pl-10 text-2xl"
          style={{
            textDecorationLine: props.completed ? "line-through" : "none",
          }}
        >
          {props.todoText}
        </p>
      </h1>
      <button>
        <img
          src={DeleteBtn}
          alt="delete button"
          className="w-8"
          onClick={props.delete}
        />
      </button>
    </div>
  );
}
