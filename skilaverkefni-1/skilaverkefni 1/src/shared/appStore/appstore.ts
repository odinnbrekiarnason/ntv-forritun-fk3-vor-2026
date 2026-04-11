import { create } from "zustand";
import type { StoreActions, StoreStates } from "../types/globalTypes";
import type { ProjectType } from "@/features/projects/schema/projectSchema";
import type { TaskType } from "@/features/tasks/schema/taskSchema";
import { getInitialStates, useLocalStorage } from "../hooks/useLocalStorage";

const key = 'tempKey'

const getter = getInitialStates('tempKey')

const initialState: StoreStates = {
  ...getter,
  startPage: true,
  selectedProjectId: 0,
  selectedTaskId: 0,
  createProjectPage: false,
  createTaskPage: false,
  allProjectsPage: false,
}


export const appstore = create<StoreStates & StoreActions>((set) => ({
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
          projectName,
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
          taskName,
          taskContent,
          timeCreated: new Date(),
          isFinished: false,
          timeFinished: null,
          id,
        }
        
        return {
          tasks: [...state.tasks, createdTask],
          projects: state.projects.map((i) =>
            i.id !== projectId ? i : { ...i, taskIds: [...i.taskIds, createdTask.id] }),
          selectedTaskId: id,
          taskCounter: id
        }
      }
      return state;
    })
  },

  updateProject: (projectId, updates, isDone) => {
    set((state) => ({
      projects: state.projects.map((i) =>
        i.id !== projectId ? i : {
          ...i,
          projectName: updates.projectName ?? i.projectName,
          description: updates.description ?? i.description,
          isFinished: isDone ? true : i.isFinished,
          timeFinished: isDone ? new Date() : i.timeFinished
        }
      )
    }))
  },

  updateTask: (taskId, updates, isDone) => {
    set((state) => ({
      tasks: state.tasks.map((i) =>
        i.id !== taskId ? i : {
          ...i,
          taskName: updates.taskName ?? i.taskName,
          taskContent: updates.taskContent ?? i.taskContent,
          isFinished: isDone ? true : i.isFinished,
          timeFinished: isDone ? new Date() : i.timeFinished
        })
    }));
  },

  deleteProject: (projectId) => {
    set((state) => {
      const deleted = state.projects.find((i) => i.id === projectId)

      if (deleted) {

        return {
          projects: state.projects.filter((i) => i.id !== projectId),
          tasks: state.tasks.filter((task) => !deleted.taskIds.includes(task.id)),
          selectedProjectId: 0,
          selectedTaskId: deleted.taskIds.includes(state.selectedTaskId) ? 0 : state.selectedTaskId,
        }
      }
      return state;
    })
  },

  deleteTask: (taskId) => {
    set((state) => {
      const deleted = state.tasks.find((i) => i.id === taskId)

      if (!deleted) {
        return state;
      }

      return {
        projects: state.projects.map((project) => ({
          ...project,
          taskIds: project.taskIds.filter((id) => id !== taskId),
        })),
        tasks: state.tasks.filter((task) => task.id !== taskId),
        selectedTaskId: state.selectedTaskId === taskId ? 0 : state.selectedTaskId,
      }
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
      allProjectsPage: state.allProjectsPage = false,
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
      allProjectsPage: state.allProjectsPage = false,
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

}));


