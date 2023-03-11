import React, { useState } from "react";
import TaskModel from "../../models/TaskModel";
import Section from "../UI/Section";

import TaskForm from "./TaskForm";

type NewTaskProps = {
  onAddTask: (createdTask: TaskModel) => void;
};

const NewTask = function (props: NewTaskProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const enterTaskHandler = async (taskText: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        {
          method: "POST",
          body: JSON.stringify({ text: taskText }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      setError((err as Error).message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
