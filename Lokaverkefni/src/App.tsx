import './App.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Shared/Homepage'

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
