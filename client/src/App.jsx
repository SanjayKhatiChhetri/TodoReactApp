import "./App.css";
import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";

const App = () => {
  const userEmail = "sanjay@todo.com";

  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
      //console.log(json);
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log(tasks);
  //sort tasks by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  useEffect(() => getData, []);

  return (
    <div>
      <div>
        <h1>React Todo App</h1>
      </div>
      <div className="app">
        <ListHeader listName={"Thesis Todo List"} getData={getData} />
        {sortedTasks?.map((task) => (
          <ListItem key={task.id} task={task} getData={getData}/>
        ))}
      </div>
    </div>
  );
};

export default App;
