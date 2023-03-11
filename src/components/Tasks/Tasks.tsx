import React, { MouseEventHandler } from "react";
import TaskModel from "../../models/TaskModel";
import Section from "../UI/Section";
import TaskItem from "./TaskItem";

import styles from "./Tasks.module.css";

type TasksProps = {
  items: TaskModel[];
  loading: boolean;
  error: string | null;
  onFetch: () => Promise<void>;
};

const Tasks = function (props: TasksProps): JSX.Element {
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = <span>Loading tasks...</span>;
  }
  return (
    <Section>
      <div className={styles.container}>{content}</div>
    </Section>
  );
};

export default Tasks;