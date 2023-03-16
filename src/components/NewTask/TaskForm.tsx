import { FormEventHandler, useRef } from "react";

import styles from "./TaskForm.module.css";

type TaskFormProps = {
  loading: boolean;
  onEnterTask: (enteredValue: string) => void;
};

const TaskForm = function (props: TaskFormProps): JSX.Element {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current!.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
