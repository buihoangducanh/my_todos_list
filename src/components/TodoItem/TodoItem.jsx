import { useState, useContext } from "react";
import CircleCheckItem from "../../../icons/CircleCheckItem";
import {
  TOGGLE_COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from "../../context/actions";
import { ToDosContext } from "../../context/todosContext";
import CircleCheckedIcon from "../../../icons/CircleCheckedIcon";
import "./TodoItem.scss";

const TodoItem = ({ todo }) => {
  const [mouseEntered, setMouseEntered] = useState(false);
  const { todosDispatch } = useContext(ToDosContext);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(todo.content);

  const handleDeleteTodo = (id) => {
    todosDispatch({
      type: DELETE_TODO,
      payload: id,
    });
  };

  const handleCompleteTodo = (id) => {
    todosDispatch({
      type: TOGGLE_COMPLETE_TODO,
      payload: id,
    });
  };

  const editTodoHandler = (e) => {
    if (!input) return;
    else {
      if (e.key === "Enter") {
        setEditing(false);
        todosDispatch({
          type: EDIT_TODO,
          payload: {
            id: todo.id,
            content: input,
          },
        });
      }
    }
  };
  return (
    <span
      onDoubleClick={() => setEditing(true)}
      onMouseLeave={() => setMouseEntered(false)}
      onMouseEnter={() => setMouseEntered(true)}
      className="item-container"
    >
      {!editing && (
        <CircleCheckItem
          onClick={() => handleCompleteTodo(todo.id)}
          className={`icon-circle-check`}
        />
      )}

      {todo.completed && (
        <CircleCheckedIcon
          onClick={() => handleCompleteTodo(todo.id)}
          className={`icon-circle-checked`}
        />
      )}
      {!editing && (
        <input
          disabled
          value={todo.content}
          type="text"
          className={`item-container__input ${todo.completed && `done`}`}
        />
      )}
      {mouseEntered && !editing && (
        <i
          onClick={() => handleDeleteTodo(todo.id)}
          className="fi fi-bs-cross icon-delete"
        ></i>
      )}
      {editing && (
        <input
          autoFocus
          onKeyUp={editTodoHandler}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className={`item-container__input ${todo.completed && `done`}`}
          // onFocus={() => setMouseEntered(true)}
          onBlur={() => setEditing(false)}
        />
      )}
    </span>
  );
};

export default TodoItem;
