import { useStore } from 'zustand'
import './App.css'
import { appstore } from './shared/appStore/appstore'
import { StartPage } from './shared/components/startPage'

function App() {
 return (
  <div>
    <StartPage/>
  </div>
 )
}

export default App
