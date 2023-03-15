import React, { useState } from "react";
import useHttp, { httpMethod } from "../../hooks/use-http";
import TaskModel from "../../models/TaskModel";
import Section from "../UI/Section";

import TaskForm from "./TaskForm";

type NewTaskProps = {
  onAddTask: (createdTask: TaskModel) => void;
};

const NewTask = function (props: NewTaskProps): JSX.Element {
  const addNewTask = function (taskText: string, data: any) {
    console.log(data);
    console.log(Object.values(data)[0]);
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
  const {
    isLoading,
    error,
    sendRequest: sendTaskHandler,
  } = useHttp(
    {
      url: "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      method: httpMethod.POST,
      body: { text: "taskText" },
      headers: {
        "Content-Type": "application/json",
      },
    },
    addNewTask.bind(null, taskText)
  );

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
