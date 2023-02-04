import React from "react";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ title, setTitle, addTask }) => {
  return (
    <div>
      <form onSubmit={addTask} className="task-input-container">
        <input
          type="text"
          placeholder="add Task todo ..."
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
            console.log(title);
            return title;
            setTitle('');
          }}
          required
          value={title}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
