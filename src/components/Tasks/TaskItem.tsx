import React from "react";

import styles from "./TaskItem.module.css";

type TaskItemProps = {
  children?: React.ReactNode;
};

const TaskItem = function (props: TaskItemProps): JSX.Element {
  return <li className={styles.task}>{props.children}</li>;
};

export default TaskItem;
