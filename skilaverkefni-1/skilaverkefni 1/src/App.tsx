import './App.css'
import { AllProjectsTemplate } from './features/projects/components/pages/allProjectsPage'
import { CreateProjectPage } from './features/projects/components/pages/createProjectPage'
import { SelectedProjectPage } from './features/projects/components/pages/selectedProjectPage'
import { CreateTaskTemplate } from './features/tasks/components/createTask'
import { appstore } from './shared/appStore/appstore'
import { StartPage } from './shared/components/startPage'


function App() {
  const {startPage, createTaskPage, createProjectPage, selectedProjectId} = appstore()
  const baseProjects = {

  }


  return (
    <div>{startPage === true &&
      <StartPage />
    }
      <div />
        <AllProjectsTemplate />
      <div />
      <CreateProjectPage />
      <div />
      <CreateTaskTemplate />
    </div>
 )
}

export default App
