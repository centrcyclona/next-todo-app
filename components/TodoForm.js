import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: uuidv4(),
      text: input,
    });
    setInput("");
  };

  return (
    <form className="form-control mt-4 w-full" onSubmit={handleSubmit}>
      {props.edit ? (
        <div className="relative">
          <input
            className="input-bordered input-ghost input w-full pr-16"
            type="text"
            placeholder="Edit todo"
            value={input}
            name="text"
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button className="btn btn-secondary absolute top-0 right-0 rounded-l-none">
            Edit Todo
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            className="input-bordered input-ghost input w-full pr-16 focus:outline-none"
            type="text"
            placeholder="Learn Chakra-UI & Next.js"
            value={input}
            name="text"
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
            Add Todo
          </button>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
