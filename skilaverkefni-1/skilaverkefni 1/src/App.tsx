import './App.css'
import { AllProjectsTemplate } from './features/projects/components/pages/allProjectsPage'
import { CreateProjectPage } from './features/projects/components/modals/createProject'
import { SelectedProjectPage } from './features/projects/components/pages/selectedProjectPage'
import { CreateTaskTemplate } from './features/tasks/components/modals/createTask'
import { appstore } from './shared/appStore/appstore'
import { StartPage } from './shared/components/startPage'




function App() {
  const { startPage, createTaskPage, createProjectPage, selectedProjectId, allProjectsPage } = appstore()

  const showSelectedProject = selectedProjectId !== 0
  const showAllProjects = !showSelectedProject && allProjectsPage
  const showStartPage = !showSelectedProject && !showAllProjects && startPage

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center px-4 py-8">
      {showStartPage && <StartPage />}
      {showAllProjects && <AllProjectsTemplate />}
      {showSelectedProject && <SelectedProjectPage />}

      {createProjectPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <CreateProjectPage />
        </div>
      )}

      {createTaskPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <CreateTaskTemplate />
        </div>
      )}
    </main>
 )
}

export default App
