import "./App.css";
import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";

const App = () => {
  const userEmail = "sanjay@todo.com";

  const [tasks, setTasks] = useState(null);

  const authToken = false;

  const getData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
      //console.log(json);
    } catch (err) {
      console.error(err.message);
    }
  };

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  return (
    <div>
      <div>
        <h1>React Todo App</h1>
      </div>
      <div className="app">
        {!authToken && <Auth />}
        {authToken && (
          <>
            <ListHeader listName={"Thesis Todo List"} getData={getData} />
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
