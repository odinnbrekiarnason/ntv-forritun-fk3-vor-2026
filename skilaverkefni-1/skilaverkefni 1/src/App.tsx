import './App.css'
import { appstore } from './shared/appStore/appstore'

function App() {
  const projectCounter = appstore((state) => state.projectCounter)
  const taskCounter = appstore((state) => state.taskCounter)
  const updateCounter = appstore((state) => state.updateCounter)

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-left shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold">Zustand Counter</h1>

        <div className="mb-4 space-y-2 text-sm">
          <p>Project counter: {projectCounter}</p>
          <p>Task counter: {taskCounter}</p>
        </div>

        <div className="flex gap-2">
          <button
            className="rounded-md border border-input px-3 py-2 text-sm"
            onClick={() => updateCounter(projectCounter, 'project')}
            type="button"
          >
            Increment project
          </button>

          <button
            className="rounded-md border border-input px-3 py-2 text-sm"
            onClick={() => updateCounter(taskCounter, 'task')}
            type="button"
          >
            Increment task
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
