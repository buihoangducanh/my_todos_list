import { useReducer } from "react";
import { createContext } from "react";
import {
  ADD_TODO,
  TOGGLE_COMPLETE_TODO,
  DELETE_TODO,
  TOGGLE_COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED_TODOS,
  EDIT_TODO,
} from "./actions";
export const ToDosContext = createContext();

const todosReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TOGGLE_COMPLETE_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    case TOGGLE_COMPLETE_ALL_TODOS:
      return state.map((todo) => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    case CLEAR_COMPLETED_TODOS:
      return state.filter((todo) => !todo.completed);
    case EDIT_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            content: action.payload.content,
          };
        }
        return todo;
      });
    default:
      return state;
  }
};

const TodoContextProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  const valueToShare = {
    todos,
    todosDispatch,
  };

  return (
    <ToDosContext.Provider value={valueToShare}>
      {children}
    </ToDosContext.Provider>
  );
};

export default TodoContextProvider;
