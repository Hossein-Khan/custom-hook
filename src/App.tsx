import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import TaskModel from "./models/TaskModel";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const transformTasks = useCallback(function (tasksObj: any) {
    const loadedTasks: TaskModel[] = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    fetchTasks(
      {
        url: "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      },
      transformTasks
    );
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
        onFetch={fetchTasks.bind(
          null,
          {
            url: "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
          },
          transformTasks
        )}
      />
    </React.Fragment>
  );
}

export default App;
