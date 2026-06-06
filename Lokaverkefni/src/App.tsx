import './App.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Shared/pages/Homepage'
import { StorePage } from './Shared/pages/StorePage'
import { NavBar } from './Shared/components/NavBar'


//<Route path="/products" element={<ProductsPage />} />

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<StorePage />} />
      </Routes>
    </div>
  )
}

export default App

