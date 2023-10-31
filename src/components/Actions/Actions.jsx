import { useState } from "react";
import "./Actions.scss";

const Actions = ({ todos, onClearAllCompletedTodos, onChangeFilter }) => {
  const [active, setActive] = useState("all");
  const onActiveHandler = (e) => {
    setActive(e.target.name);
    onChangeFilter(e.target.name);
  };

  const qtyLeft = todos.reduce((total, item) => {
    if (!item.completed) return total + 1;

    return total;
  }, 0);

  return (
    <div className="actions">
      <span className="actions__items-left">{qtyLeft} items left</span>
      <div className="actions__buttons">
        <button
          onClick={onActiveHandler}
          className={active === "all" ? `active` : ``}
          name="all"
        >
          All
        </button>
        <button
          onClick={onActiveHandler}
          className={active === "active" ? `active` : ``}
          name="active"
        >
          Active
        </button>
        <button
          className={active === "completed" ? `active` : ``}
          onClick={onActiveHandler}
          name="completed"
        >
          Completed
        </button>
      </div>
      <span
        onClick={onClearAllCompletedTodos}
        className="actions__clear-completed"
      >
        Clear completed
      </span>
    </div>
  );
};

export default Actions;
