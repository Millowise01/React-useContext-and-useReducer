import { useReducer, useState } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { useTheme } from "../context/ThemeContext";
import { LIGHT_THEME } from "../constants/theme";
import styles from "./TaskManager.module.css";

const TaskManager = () => {
  // useReducer takes the reducer function and an initial state (an
  // empty array of tasks). It returns the current state (`tasks`)
  // and a `dispatch` function — calling dispatch with an action
  // object is the ONLY way this component changes `tasks`; there's
  // no direct setter, unlike useState.
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Separate local state just for the text currently typed into the
  // input box. This is UI-only state — it doesn't belong in the
  // reducer because it has nothing to do with the list of tasks itself.
  const [task, setTask] = useState("");

  // Read the current theme so this component can style itself
  // to match — this is the "components interact with context"
  // part of the exercise.
  const { theme } = useTheme();

  const addTask = () => {
    // Dispatching this action runs taskReducer with type "add",
    // which returns a new array with the task appended. React then
    // re-renders this component with the updated `tasks`.
    dispatch({ type: "add", payload: task });
    // Clear the input after adding.
    setTask("");
  };

  return (
    <div className={`${styles.container} ${theme === LIGHT_THEME ? styles.light : styles.dark}`}>
      <h2>Task Manager</h2>

      <input value={task} onChange={(e) => setTask(e.target.value)} />

      {/* Disabled while the input is empty/whitespace, so you can't
          dispatch an "add" action with a blank task. */}
      <button onClick={addTask} disabled={!task.trim()}>
        Add Task
      </button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text}{" "}
            {/* Dispatching "remove" with this task's id filters it out
                of state via taskReducer's remove branch. */}
            <button onClick={() => dispatch({ type: "remove", payload: t.id })}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;