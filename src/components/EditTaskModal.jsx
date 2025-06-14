import { useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ task, show, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState(task)
  const editFormRef = useRef();


  const changeEditedTask = (key, event) => {
    setEditedTask(prev => ({ ...prev, [key]: event.target.value }))
  }

  const { title, description, status } = editedTask;

  const handleSubmit = e => {
    e.preventDefault();
    onSave(editedTask);
  }

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit} >
          <label>
            Nome Task:
            <input type="text"
              value={editedTask.title}
              onChange={e => changeEditedTask('title', e)} />
          </label>
          <label>
            Descrizione:
            <textarea
              value={description}
              onChange={e => changeEditedTask('description', e)}
            />
          </label>
          <label>
            Stato:
            <select value={status} onChange={e => changeEditedTask('status', e)}>
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </form>
      }
      confirmText='Salva Modifiche'
      onConfirm={() => editFormRef.current.requestSubmit()}
      show={show}
      onClose={onClose}
    />
  )
}