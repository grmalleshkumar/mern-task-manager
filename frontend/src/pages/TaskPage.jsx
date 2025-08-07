import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask } from "../features/tasks/taskSlice";
import TaskItem from "../components/TaskItem";

const TaskPage = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title }));
    setTitle("");
  };

  return (
    <div className="task-container">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
};

export default TaskPage;
