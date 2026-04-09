import { create } from "zustand";
import type { StoreActions, StoreStates } from "../types/globalTypes";
import type { CreateTaskInput } from "@/features/tasks/types/createTaskType";
import type { CreateProjectInput } from "@/features/projects/types/CreateProjectType";
import type { ProjectType } from "@/features/projects/schema/projectSchema";
import type { TaskType } from "@/features/tasks/schema/taskSchema";
import { useLocalStorage } from "../hooks/useLocalStorage";



const initialStoreState: StoreStates = {
  projects: [],
  tasks: [],
  startPage: true,
  selectedProjectId: 0,
  selectedTaskId: 0,
  projectCounter: 0,
  taskCounter: 0,
  createProjectPage: false,
  createTaskPage: false,
}

export const appstore = create<StoreStates & StoreActions>((set) => ({

     ...initialStoreState,


      setProject: (projectId: number) => {
        set((state) => {
          const exists = state.projects.find((project) => {
            return project.id === projectId
          });

          if(exists) {
            return ({
              selectedProjectId: exists.id,
              startPage: false,
              createProjectPage: false,
              createTaskPage: false,
            })
          };
          
          return {selectedProjectId: state.selectedProjectId};
        });
      },
      
      setTask: (taskId: number) => {
        set((state) => {
          const exists = state.tasks.find((task) => {
            return task.id === taskId
          });

          if(exists) return {selectedTaskId: exists.id}

          return {selectedTaskId: state.selectedTaskId}
        })
      },

      createProject: (input: CreateProjectInput) => {
        set((state) => {
          const {projectName, description} = input
          const id = state.projectCounter + 1

          if(projectName) {
            const createdProject: ProjectType = {
              projectName,
              description: description ?? '',
              timeCreated: new Date(),
              taskIds: [],
              id,
              timeFinished: null,
              isFinished: false,
            }
            
            return {
              projects: [...state.projects, createdProject],
              selectedProjectId: id,
              projectCounter: id
            }
          }
          return state;
        })
      },

      createTask: (projectId: number, input: CreateTaskInput) => {
        set((state) => {
          const {taskName, taskContent} = input
          const id = state.taskCounter + 1
          
          const project = state.projects.find((project) => project.id === projectId)

          if(taskName && taskContent && project) {
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
                i.id !== projectId ? i : {...i, taskIds: [...i.taskIds, createdTask.id]}),
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
            i.id !== projectId ? i : {...i, 
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
            i.id !== taskId ? i : {...i,
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

          if(deleted) {
            const tasksInDeleted = new Set(deleted.taskIds)

            return {
              projects: state.projects.filter((i) => i.id !== projectId),
              tasks: state.tasks.filter((task) => !tasksInDeleted.has(task.id)),
              selectedProjectId: 0,
              selectedTaskId: tasksInDeleted.has(state.selectedTaskId) ? 0 : state.selectedTaskId,
            }
          }
          return state;
        })
      },

      deleteTask: (taskId) => {
        set((state) => {
          const deleted = state.tasks.find((i) => i.id === taskId)

          if(!deleted) {
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
            startPage: state.startPage === true ? false : true 
        }))
      },

      toggleCreateProjectPage: () => {
        set((state) => ({
          createProjectPage: state.createProjectPage === true ? false : true
        }))
      },

      toggleCreateTaskPage: () => {
        set((state) => ({
          createTaskPage: state.createTaskPage === true ? false : true
        }))
      }
  }));


