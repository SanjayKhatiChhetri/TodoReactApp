import "./App.css";
import ListHeader from "./components/ListHeader";

const App = () => {
  return (
    <div>
      <div >
        <h1>React Todo App</h1>
      </div>
      <div className="app">
          <ListHeader listName={"Thesis Todo List"} />
      </div>
    </div>
  );
};

export default App;

