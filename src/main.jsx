import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import TodoContextProvider from "./context/todosContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>
);
