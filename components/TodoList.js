import React, { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import useLocalStorage from "../hooks/useLocalStorage";

function TodoList() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, [theme]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return (
    <>
      <div className="m-auto flex min-h-[100vh] max-w-[800px] flex-col items-center justify-center px-4">
        <div className="flex w-[100%] items-center justify-between align-bottom">
          <h1 className="text-5xl">Welcome!</h1>
          <div className="flex">
            {!theme ? (
              <FiSun
                onClick={() => setTheme(true)}
                className="btn btn-ghost btn-circle btn-sm"
                data-set-theme="cyberpunk"
              />
            ) : (
              <IoMdMoon
                onClick={() => setTheme(false)}
                className="btn btn-ghost btn-circle btn-sm"
                data-set-theme="black"
              />
            )}
          </div>
        </div>
        <TodoForm onSubmit={addTodo} />
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </>
  );
}

export default TodoList;
