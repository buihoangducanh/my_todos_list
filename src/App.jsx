import "./App.scss";
import TodosList from "./components/TodosList/TodosList";

function App() {
  return (
    <div className="app">
      <h1 className="app__header">todos</h1>
      <TodosList />
    </div>
  );
}

export default App;
