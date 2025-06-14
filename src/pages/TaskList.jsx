import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContex'
import TaskRow from '../components/TaskRow'

const TaskList = () => {

  const { tasks } = useContext(GlobalContext)

  return (
    <div>
      <h2 className='my-4 mx-4 text-primary'>Lista delle Task</h2>
      <div className='container mx-4 p-0'>
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Staus</th>
              <th>Data di creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default TaskList