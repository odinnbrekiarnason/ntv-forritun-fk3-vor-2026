import { useStore } from 'zustand'
import './App.css'
import { appstore } from './shared/appStore/appstore'
import { StartPage } from './shared/components/startPage'
import { SelectedProjectTemplate } from './features/projects/components/selectedProjectTemplate'
import { CreateProject } from './features/projects/components/createProject'
import { CreateTaskTemplate } from './features/tasks/components/createTask'

function App() {
 return (
  <div>
    <StartPage/>
    <div/>
    <SelectedProjectTemplate/>
    <div/>
    <CreateProject/>
    <div/>
    <CreateTaskTemplate/>
  </div>
 )
}

export default App
