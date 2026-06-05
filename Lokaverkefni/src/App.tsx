import './App.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Shared/pages/Homepage'


//<Route path="/products" element={<ProductsPage />} />

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

