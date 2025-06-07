import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContex'

const TaskList = () => {

  const { tasks } = useContext(GlobalContext)

  return (
    <div>
      <h2 className='my-4 mx-4 text-primary'>Lista delle Task</h2>
      <p className='mx-4'>Mostreremo i Task...</p>
    </div>
  )
}

export default TaskList