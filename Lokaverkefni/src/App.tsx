import './App.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Features/Front/Shared/pages/Homepage'
import { StorePage } from './Features/Front/Shared/pages/StorePage'
import { NavBar } from './Features/Front/Shared/navbar/NavBar'
import { ShoppingCart } from './Features/Front/Cart/components/ShoppingCart'
import { UserProfile, useUser } from '@clerk/react'

function App() {
  const user = useUser().isLoaded;
  
  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<StorePage />} />
          { user &&
          <>
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/profile" element={<UserProfile />} />
          </>
          }
      </Routes>
    </div>
  )
}

export default App

