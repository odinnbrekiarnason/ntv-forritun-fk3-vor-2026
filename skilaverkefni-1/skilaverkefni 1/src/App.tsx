import { useState } from 'react'
import './App.css'
import { Project } from './features/projects/project/project'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <Project/>
  </div>
  )
}

export default App
