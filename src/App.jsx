import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import { GlobalProvider } from './context/GlobalContex';
import 'bootstrap/dist/css/bootstrap.css';
import TaskDetail from './pages/TaskDetail';


const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav className='bg-primary py-3'>
          <NavLink to='/' className='btn text-dark mx-4' style={{ backgroundColor: 'white' }}>Lista Task</NavLink>
          <NavLink to='/add' className='btn text-dark' style={{ backgroundColor: 'white' }}>Aggiungi Task</NavLink>
        </nav>

        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/add' element={<AddTask />} />
          <Route path='/Task/:id' element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App