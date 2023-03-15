import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import TaskModel, { FetchedTask } from "./models/TaskModel";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const transformTasks = function (tasksObj: any) {
    const loadedTasks: TaskModel[] = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const httpData = useHttp(
    {
      url: "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    },
    transformTasks
  );

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task: TaskModel) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      return updatedTasks;
    });
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
