import { useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err))
  }, []);

  const addTask = async newTask => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    const { succes, message, task } = await response.json();
    if (!success) {
      throw new Error(message);
    }
    setTasks(prevTasks => [...prevTasks, task]);
  }

  const removeTask = async taskId => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });

    const { success, message } = await response.json();
    if (!success) {
      throw new Error(message);
    }

    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }
  const updateTask = async updatedTask => {
    const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    const { success, message, task } = await response.json();
    if (!success) {
      throw new Error(message);
    }

    setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t));

  }
  return { tasks, addTask, removeTask, updateTask };
}