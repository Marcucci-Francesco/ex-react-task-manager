import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContex"

export default function TaskDetail() {

  const { id } = useParams()
  const { tasks } = useContext(GlobalContext)

  const task = tasks.find(task => task.id === parseInt(id))

  if (!task) {
    return <div className="alert alert-danger">Task non trovata</div>
  }

  const handleDelete = () => {
    console.log(`Deleting task with ID: ${task.id}`);

  }

  return (
    <>
      <div className="container mx-4 my-4">
        <h2 className="text-primary">{task.title}</h2>
        <p><strong>Descrizione:</strong> {task.description || "Nessuna descrizione fornita"}</p>
        <p><strong>Stato:</strong> {task.status}</p>
        <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
        <button className="btn btn-danger" onClick={handleDelete}>Elimina Task</button>
      </div>
    </>
  )
}