import { create } from "zustand";
import type { CounterType, CreateProjectInput, StoreActions, StoreStates, ThemeName } from "../types/globalTypes";
import type { ProjectType } from "@/features/projects/schema/projectSchema";
import type { TaskType } from "@/features/tasks/schema/taskSchema";

function getInitialTheme(): ThemeName {
  if (typeof document === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute('data-theme', theme);
}

const initialStoreState: StoreStates = {
  projects: [],
  tasks: [],
  theme: getInitialTheme() || null,
  startPage: true,
  selectedProjectId: null,
  selectedTaskId: null,
  projectCounter: 0,
  taskCounter: 0,
}



export const appstore = create<StoreStates & StoreActions>((set, get) => {

  return {
      ...initialStoreState,

      setProject: (projectId) => {
        set({selectedProjectId: projectId})
      },
      
      setTask: (taskId) => {
        set({selectedTaskId: taskId})
      },

      createProject: (input) => {
        const name = input.projectName; 
        const description = input.description;

        const data: ProjectType = {
          projectName: name,
          description: description ? description : '',
          taskIds: [],
          id: get().projectCounter + 1,
          timeCreated: new Date
        }

          return data;
      },

      createTask: (projectId, input) => {
        const {taskName, taskContent} = input

        if(!taskContent || !taskName) {
          throw Error('Name or content missing!');
        }

        const data: TaskType = {
          taskName,
          taskContent,
          id: get().taskCounter + 1,
          isFinished: false,
          timeCreated: new Date,
          timeFinished: null,
        }

        return data;
      },

      updateTask: (taskId, updates) => {
        const findTask = get().tasks[taskId]
        if(!findTask) {
          return;
        }


      }
    }
})

