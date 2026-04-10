import { useEffect } from 'react'
import './App.css'
import { AllProjectsTemplate } from './features/projects/components/pages/allProjectsPage'
import { CreateProjectPage } from './features/projects/components/pages/createProjectPage'
import { SelectedProjectPage } from './features/projects/components/pages/selectedProjectPage'
import { CreateTaskTemplate } from './features/tasks/components/createTask'
import { appstore } from './shared/appStore/appstore'
import { StartPage } from './shared/components/startPage'
import { getInitialStoreState, useLocalStorage } from './shared/hooks/useLocalStorage'




function App() {
  const {startPage, createTaskPage, createProjectPage, selectedProjectId, allProjectsPage} = appstore()

  useEffect(() => {
    getInitialStoreState('tempKey') 
    }, [])  

  return (
    <div>
    {startPage &&
      <StartPage />
    }
      
      {allProjectsPage && 
      <AllProjectsTemplate />
      }
      
      {createProjectPage && 
      <CreateProjectPage />
      }
      {selectedProjectId !== 0 &&
      <SelectedProjectPage/>
      }
      
      {createTaskPage &&
      <CreateTaskTemplate />
      }
      </div>
    
 )
}

export default App
