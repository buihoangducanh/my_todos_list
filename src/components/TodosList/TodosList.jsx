import { useContext, useState } from "react";
import CheckIcon from "../../../icons/CheckIcon";
import Actions from "../Actions/Actions";
import TodoItem from "../TodoItem/TodoItem";
import "./TodosList.scss";
import { ToDosContext } from "../../context/todosContext";
import {
  ADD_TODO,
  TOGGLE_COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED_TODOS,
} from "../../context/actions";

const TodosList = () => {
  const { todos, todosDispatch } = useContext(ToDosContext);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      todosDispatch({
        type: ADD_TODO,
        payload: {
          id: Math.floor(Math.random() * 9999),
          content: input,
          completed: false,
        },
      });
      setInput("");
    }
  };

  const handleCompleteAllTodos = () => {
    todosDispatch({
      type: TOGGLE_COMPLETE_ALL_TODOS,
    });
  };

  const handleClearCompleteAllTodos = () => {
    todosDispatch({
      type: CLEAR_COMPLETED_TODOS,
    });
  };

  const onChangeFilterHandler = (filter) => {
    setFilter(filter);
  };

  const renderTodosByFilter = (filter) => {
    switch (filter) {
      case "all":
        return todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);
      case "completed":
        return todos
          .filter((todo) => todo.completed)
          .map((todo) => <TodoItem todo={todo} key={todo.id} />);
      case "active":
        return todos
          .filter((todo) => !todo.completed)
          .map((todo) => <TodoItem todo={todo} key={todo.id} />);
      default:
        return null;
    }
  };

  const renderActions = () => {
    if (todos.length > 0) {
      return (
        <Actions
          onChangeFilter={onChangeFilterHandler}
          onClearAllCompletedTodos={handleClearCompleteAllTodos}
          todos={todos}
        />
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="todos">
      <CheckIcon onClick={handleCompleteAllTodos} className={`check-icon`} />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="What needs to be done?"
        className="todos__input"
      />
      {renderTodosByFilter(filter)}
      {renderActions()}
    </form>
  );
};

export default TodosList;
