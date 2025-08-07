import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask } from "../features/tasks/taskSlice";
import TaskItem from "../components/TaskItem";

const TaskPage = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

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
      {/* 🆕 Filter Buttons */}
      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "filter-btn active" : "filter-btn"}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={
            filter === "completed" ? "filter-btn active" : "filter-btn"
          }
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "filter-btn active" : "filter-btn"}
        >
          Pending
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
};

export default TaskPage;
