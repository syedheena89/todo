import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import TodoList from "./Components/TodoList";
import InvalidAccess from "./Components/InvalidAccess";
import Signup from "./Components/Signup";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  //tasks todo -list state
  const [toDo, setToDo] = useState([
    {
      title: "tasks with tags",
      description: "",
      deadline: null,
      tags: [
        {
          id: 1,
          name: "Important",
        },
        {
          id: 2,
          name: "Work",
        },
      ],
      priority: false,
      image: "",
      completed: false,
      id: "6174b232-fa00-48ce-b53e-9742d6852663",
      createdAt: 1655044887962,
    },
  ]);
  const [taskType, setTaskType] = useState("");
  const [modal, setModal] = useState("");
  //we also need TempState this holds the temporary data that will be added as a new task in taskList
  const [title, setTitle] = useState("");
  //this updateData will hold the task that is being edited
  const [updateData, setUpdateData] = useState("");

  //Add task
  const addTask = (e) => {
    if (title) {
      e.preventDefault();
      let newEntry = {
        title: title,
        description: "",
        deadline: null,
        tags: [],
        priority: false,
        image: "",
        completed: false,
        id: uuidv4(),
        createdAt: null,
      };
      setToDo([...toDo, newEntry]);
      setTitle("");
    }
  };

  //Delete Task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  //mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setToDo(newTask);
  };
  //handle completedTasks here
  const handleTaskCompleted = (id) => {
    setToDo(
      toDo.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };
  const completedTasks = toDo.filter((task) => task.completed);

  const updateTask = (updateData, id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        task = updateData;
        task = { ...task, id: id, title: updateData.title };
        return task;
      }
      return task;
    });
    setToDo(newTask);
    setTitle("");
  };

  return (
    <div className="main-container">
      <header className="app-title">
        <h2>TODO APP</h2>
      </header>

      <div className="components">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/success" element={<TodoList />} />
          <Route path="/invalidAccess" element={<InvalidAccess />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/TodoList"
            element={
              <TodoList
                setTitle={setTitle}
                title={title}
                completedTasks={completedTasks}
                deleteTask={deleteTask}
                markDone={markDone}
                toDo={toDo}
                setToDo={setToDo}
                updateData={updateData}
                setUpdateData={setUpdateData}
                modal={modal}
                setModal={setModal}
                setTaskType={setTaskType}
                taskType={taskType}
                addTask={addTask}
                updateTask={updateTask}
                handleTaskCompleted={handleTaskCompleted}
              />
            }
          />
          []
        </Routes>
      </div>
    </div>
  );
}

export default App;
