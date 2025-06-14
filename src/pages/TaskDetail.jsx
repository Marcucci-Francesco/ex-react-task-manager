import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../context/GlobalContex"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetail() {

  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, removeTask, updateTask } = useContext(GlobalContext)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const task = tasks.find(task => task.id === parseInt(id))

  if (!task) {
    return <div className="alert alert-danger">Task non trovata</div>
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id)
      alert("Task eliminata con successo!")
      navigate('/')
    } catch {
      console.error(error)
      alert("Errore durante l'eliminazione della task")
    }
  }

  const handleUpdate = async updatedTask => {
    try {
      await updateTask(updatedTask)
    } catch {
      console.error(error)
      alert("Errore durante l'eliminazione della task")
    }
  }


  return (
    <>
      <div className="container mx-4 my-4">
        <h2 className="text-primary">{task.title}</h2>
        <p><strong>Descrizione:</strong> {task.description || "Nessuna descrizione fornita"}</p>
        <p><strong>Stato:</strong> {task.status}</p>
        <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
        <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
        <button className="btn btn-primary ms-4" onClick={() => setShowEditModal(true)}>Modifica Task</button>
        <Modal
          title="Conferma eliminazione"
          content={<p>Sei sicuro di voler eliminare questa task?</p>}
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          confirmText="Elimina" />
        <EditTaskModal
          task={task}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdate} />
      </div>

    </>
  )
}