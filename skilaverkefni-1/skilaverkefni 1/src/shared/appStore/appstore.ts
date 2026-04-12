import { create } from "zustand";
import type { StoreActions } from "../types/globalTypes";
import type { ProjectType } from "@/features/projects/schema/projectSchema";
import type { TaskType } from "@/features/tasks/schema/taskSchema";
import { getInitialStates, useLocalStorage } from "../hooks/useLocalStorage";
import type { StoreStateType } from "../schemas/storeStateSchema";

const key = 'tempKey'
const initialState = getInitialStates(key)



export const appstore = create<StoreStateType & StoreActions>((set) => ({
  ...initialState,

  setProject: (projectId) => {
    set((state) => {
      const exists = state.projects.find((project) => {
        return project.id === projectId
      });

      if (exists) {
        return ({
          selectedProjectId: exists.id,
          startPage: false,
          createProjectPage: false,
          createTaskPage: false,
          allProjectsPage: false
        });
      };

      return { selectedProjectId: state.selectedProjectId };
    });
  },

  setTask: (taskId) => {
    set((state) => {
      const exists = state.tasks.find((task) => {
        return task.id === taskId
      });

      if (exists) return { 
        selectedTaskId: exists.id,
        startPage: false,
        createProjectPage: false,
        createTaskPage: false,
        allProjectsPage: false
      }

      return { selectedTaskId: state.selectedTaskId }
    });
  },

  createProject: (input) => {
    set((state) => {
      const { projectName, description } = input
      const id = state.projectCounter + 1

      if (projectName) {
        const createdProject: ProjectType = {
          projectName: `${projectName[0].toUpperCase()}${projectName.slice(1)}`,
          description: description ?? '',
          timeCreated: new Date(),
          taskIds: [],
          id,
          timeFinished: null,
          isFinished: false,
        };

        useLocalStorage(key, createdProject, 'project')

        return {
          projects: [...state.projects, createdProject],
          selectedProjectId: id,
          projectCounter: id,
          createProjectPage: false,
          allProjectsPage: false
        }
      }
      return state;
    })
  },

  createTask: (projectId, input) => {
    set((state) => {
      const { taskName, taskContent } = input
      const id = state.taskCounter + 1

      const project = state.projects.find((project) => project.id === projectId)

      if (taskName && taskContent && project) {
        const createdTask: TaskType = {
          taskName: `${taskName[0].toUpperCase()}${taskName.slice(1)} `,
          taskContent,
          timeCreated: new Date(),
          isFinished: false,
          timeFinished: null,
          id,
        }

        useLocalStorage(key, createdTask, 'task')
        
        return {
          tasks: [...state.tasks, createdTask],
          projects: state.projects.map((i) =>
            i.id !== projectId ? i : { ...i, taskIds: [...i.taskIds, createdTask.id] }),
          selectedTaskId: id,
          taskCounter: id,
          createTaskPage: false,
        }
      }
      return state;
    })
  },

  updateProject: (projectId, updates) => {
    set((state) => ({
      projects: state.projects.map((i) =>
        i.id !== projectId ? i : {
          ...i,
          projectName: updates.projectName ?? i.projectName,
          description: updates.description ?? i.description,
        }
      ),
    }))
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map((i) =>
        i.id !== taskId ? i : {
          ...i,
          taskName: updates.taskName ?? i.taskName,
          taskContent: updates.taskContent ?? i.taskContent
        })
    }));
  },

  deleteProject: (projectId) => {
    set((state) => {
      const deleted = state.projects.find((i) => i.id === projectId)

      if (deleted) {
        
        const newState: StoreStateType = {
          ...state,
          projects: state.projects.filter((i) => i.id !== projectId),
          tasks: state.tasks.filter((task) => !deleted.taskIds.includes(task.id)),
          selectedProjectId: 0,
          selectedTaskId: deleted.taskIds.includes(state.selectedTaskId) ? 0 : state.selectedTaskId,
          allProjectsPage: true
        }

        useLocalStorage(key, null, null, null, JSON.stringify(newState))
        return { ...newState }
      }
      return state;
    })
  },

  deleteTask: (taskId) => {
    set((state) => {
      const deleted = state.tasks.find((i) => i.id === taskId)

      if (deleted) {
        const newState: StoreStateType = {
          ...state,
          projects: state.projects.map((project) => ({
            ...project,
            taskIds: project.taskIds.filter((id) => id !== taskId),
          })),
          tasks: state.tasks.filter((task) => task.id !== taskId),
          selectedTaskId: state.selectedTaskId === taskId ? 0 : state.selectedTaskId,
        }

        useLocalStorage(key, null, null, null, JSON.stringify(newState))
        return { ...newState }
      }
      return state;
    })
  },

  toggleStartPage: () => {
    set((state) => ({
      startPage: state.startPage === true ? false : true,
      allProjectsPage: state.allProjectsPage = false,
      createProjectPage: state.createProjectPage = false,
      createTaskPage: state.createTaskPage = false,
      selectedProjectId: 0,
      selectedTaskId: 0
    }))
  },

  toggleCreateProjectPage: () => {
    set((state) => ({
      createProjectPage: state.createProjectPage === true ? false : true,
      startPage: state.startPage = false,
      allProjectsPage: true,
      createTaskPage: state.createTaskPage = false,
      selectedProjectId: 0,
      selectedTaskId: 0
    }))
  },

  toggleCreateTaskPage: () => {
    set((state) => ({
      createTaskPage: state.createTaskPage === true ? false : true,
      selectedTaskId: 0 ? 0 : state.selectedTaskId,
      createProjectPage: state.createProjectPage = false,
      startPage: state.startPage = false,
      allProjectsPage: state.allProjectsPage,
    }))
  },

  toggleAllProjectsPage: () => {
    set((state) => ({
      allProjectsPage: state.allProjectsPage === true ? false : true,
      createProjectPage: state.createProjectPage = false,
      startPage: state.startPage = false,
      createTaskPage: state.createTaskPage = false,
      selectedProjectId: 0,
      selectedTaskId: 0
    }))
  },

  toggleProjectComplete(projectId) {
    set((state) => {
      const selected = state.projects.find((project) => project.id === projectId)
      
      if(!selected) {
        return state;
      }
      const result: ProjectType = {...selected, isFinished: !selected.isFinished ? true : false, timeFinished: !selected.timeFinished ? new Date() : null }
      useLocalStorage(key, result, 'project', projectId)
      
      return {
        projects: [...state.projects.map((i) => {
          if(i.id === projectId) {
            return {...i, ...result}
          }
          return i
        })]
      }
    })
  },

  toggleTaskComplete(taskId) {
    set((state) => {
      const selected = state.tasks.find((task) => task.id === taskId)
      
      if(!selected) {
        return state;
      }
      const result: TaskType = {...selected, isFinished: !selected.isFinished ? true : false, timeFinished: !selected.timeFinished ? new Date() : null }
      useLocalStorage(key, result, 'task', taskId)
      
      return {
        tasks: [...state.tasks.map((i) => {
          if(i.id === taskId) {
            return {...i, ...result}
          }
          return i
        })]
      }
    })
  },

}));


