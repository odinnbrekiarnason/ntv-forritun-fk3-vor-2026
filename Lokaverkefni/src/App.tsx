import './App.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Features/Front/Shared/pages/Homepage'
import { StorePage } from './Features/Front/Shared/pages/StorePage'
import { NavBar } from './Features/Front/Shared/navbar/NavBar'
import { ShoppingCart } from './Features/Front/Cart/components/ShoppingCart'
import { UserProfile, useUser } from '@clerk/react'
import { useOnLogin } from './Features/Front/useAPI/post/postUser'
import { ProductPage } from './Features/Front/Shared/pages/ProductPage'

function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  useOnLogin(isLoaded, isSignedIn, user);
  
  return (
    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div><h1>About Page - Under Construction</h1></div>} />
          <Route path="/products" >
            <Route index element={<StorePage />} />
            <Route path=":productId" element={<ProductPage />} />
          </Route>
          { isSignedIn &&
          <>
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/checkout" element={<div><h1>Checkout Page - Under Construction</h1></div>} />
          </>
          }
      </Routes>
    </div>
  )
}

export default App

