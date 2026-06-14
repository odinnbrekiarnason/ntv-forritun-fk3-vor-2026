import './App.css'
import { Route, Routes } from 'react-router'
import { HomePage } from './Features/Front/Shared/components/pages/Homepage'
import { StorePage } from './Features/Front/Shared/components/pages/StorePage'
import { NavBar } from './Features/navigation/NavBar'
import { ShoppingCart } from './Features/Front/Cart/components/ShoppingCart'
import { useUser } from '@clerk/react'
import { useOnLogin } from './Features/Front/Hooks/useAPI/post/postUser'
import { ProductPage } from './Features/Front/Shared/components/pages/ProductPage'
import { UserPage } from './Features/Front/Shared/components/pages/loginRequired/UserPage'
import { CheckoutPage } from './Features/Front/Shared/components/pages/CheckoutPage'

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
            <Route path="/profile" element={<UserPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </>
          }
      </Routes>
    </div>
  )
}

export default App

