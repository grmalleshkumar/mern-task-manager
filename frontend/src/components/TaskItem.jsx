import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(
      updateTask({ id: task._id, data: { completed: !task.completed } })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <div className="task-item">
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <button onClick={handleDelete}>❌</button>
    </div>
  );
};

export default TaskItem;
