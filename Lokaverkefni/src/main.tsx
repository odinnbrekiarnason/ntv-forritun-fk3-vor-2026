import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)')

function autoTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
}

autoTheme(colorSchemeMedia.matches)
colorSchemeMedia.addEventListener('change', (event) => {
  autoTheme(event.matches)
})

function RootLayout() {
  const nav = useNavigate()

  return (
    <ClerkProvider 
    publishableKey={key}
    routerPush={(to) => nav(to)}
    routerReplace={(to) => nav(to, {replace: true})}
    >
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout />
    </BrowserRouter>
  </StrictMode>
)
