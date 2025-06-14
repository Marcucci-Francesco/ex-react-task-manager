import React from 'react'
import { useState, useRef, useMemo, useContext } from 'react'
import { GlobalContext } from '../context/GlobalContex'

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

const AddTask = () => {

  const { addTask } = useContext(GlobalContext)
  const [taskName, setTaskName] = useState('')
  const descriptionRef = useRef()
  const statusRef = useRef()

  const taskNameError = useMemo(() => {
    if (!taskName.trim()) return "Il nome della task è obbligatorio";
    if ([...taskName].some(char => symbols.includes(char))) {
      return "Il nome della task non può contenere caratteri speciali";
    }
  }, [taskName]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (taskNameError)
      return;

    const newTask = {
      title: taskName.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task aggiunta con successo!");
      setTaskName('');
      descriptionRef.current.value = '';
      statusRef.current.value = 'To Do';
    } catch (error) {
      alert(error.message);
    }

    fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Task aggiunta:", data);
        setTaskName('');
        descriptionRef.current.value = '';
        statusRef.current.value = 'To Do';
      })
      .catch(error => console.error("Errore nell'aggiunta della task:", error));
  }

  return (
    <div>
      <h2 className='text-primary mx-4 my-4'>Aggiungi una Task</h2>
      <form className='container m-4' onSubmit={handleSubmit}>
        <div className='row'>
          <label className="form-label">
            Nome Task:
            <input
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              className="form-control" />
          </label>
          {taskNameError && <p className="text-danger">{taskNameError}</p>}
          <label className="form-label">
            Descrizione:
            <textarea ref={descriptionRef}
              className="form-control" ></textarea>
          </label>
          <label className="form-label">
            Stato:
            <select ref={statusRef} defaultValue="To Do"
              className="form-control">
              <option value="to do">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </label>

        </div>

        <button type='submit' disabled={taskNameError} className='btn btn-primary my-4'>
          Aggiungi Task
        </button>
      </form>
    </div>
  )
}

export default AddTask