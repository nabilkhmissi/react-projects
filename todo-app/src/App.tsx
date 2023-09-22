import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Layout from './pages/layout'
import Home from './pages/home'
import Todos from './pages/todos'
import AddTodo from './pages/add-todo'
import NotFound from './pages/not-found'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='add-todo' element={<AddTodo />} />
          <Route path='update-todo/:id' element={<AddTodo />} />
          <Route path='todos' element={<Todos />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
