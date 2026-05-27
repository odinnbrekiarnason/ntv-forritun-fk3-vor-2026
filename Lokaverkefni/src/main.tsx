import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/react'

const key = process.env.VITE_CLERK_PUBLISHABLE_KEY

if(!key) {
  throw new Error("Missing publishable key for Clerk. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={key}>
    <App />
    </ClerkProvider>
  </StrictMode>,
)
