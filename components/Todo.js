import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={`my-2 flex w-full items-center justify-between rounded-sm p-5  ${
        todo.isComplete ? "line-through" : ""
      }`}
      key={index}
    >
      <div className="flex text-[20px]">
        <h1 className="mr-5">{index + 1}.</h1>
        <div key={todo.id} onClick={() => completeTodo(todo.id)}>
          {todo.text}
        </div>
      </div>
      <div className="flex">
        <button>
          <TiEdit
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
            className="btn btn-sm btn-circle btn-ghost mr-2 p-1"
          />
        </button>
        <button>
          <RiCloseCircleLine
            className="btn btn-sm btn-circle btn-ghost p-1"
            onClick={() => removeTodo(todo.id)}
          />
        </button>
      </div>
    </div>
  ));
}

export default Todo;
