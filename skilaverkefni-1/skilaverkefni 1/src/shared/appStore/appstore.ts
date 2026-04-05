import { create } from "zustand";
import type { StoreActions, StoreStates, ThemeName } from "../types/globalTypes";
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
  theme: getInitialTheme(),
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
        const id = get().projectCounter + 1;
        const data: ProjectType = {
          projectName: input.projectName,
          description: input.description ?? '',
          taskIds: [],
          id,
          timeCreated: new Date()
        }

        set((state) => ({
          projects: [...state.projects, data],
          selectedProjectId: data.id,
          projectCounter: state.projectCounter + 1,
        }));

        return data
      },

      createTask: (projectId, input) => {
        let createdTask: TaskType | undefined

        set((state) => {
          const project = state.projects.find((i) => i.id === projectId)
          if(!project) return state;

          const id = state.taskCounter + 1;
          
          createdTask = {
            ...input,
            id,
            taskName: input.taskName,
            taskContent: input.taskContent,
            timeCreated: new Date(),
            timeFinished: null,
            isFinished: false,
          }
          
          return {
            tasks: [...state.tasks, createdTask],
            projects: state.projects.map((i) => 
              i.id === projectId ? {...i, taskIds: [...i.taskIds, id]} : i
            ),
            taskCounter: state.taskCounter + 1,
          };
        });

        return createdTask
      },

      updateProject: (projectId, updates) => {
        let updatedProject: ProjectType | undefined

        set((state) => {
          const projects = state.projects.map((project) => {

            if(project.id !== projectId) {
              return project
            }

            updatedProject = {
              ...project,
              ...updates,
              projectName: updates.projectName ?? project.projectName,
              description: updates.description ?? project.description
            }

            return updatedProject;
          })
          return { projects }
        })

        return updatedProject;
      },

      updateTask: (taskId, updates) => {
        let updatedTask: TaskType | undefined
        
        set((state) => {
          const tasks = state.tasks.map((task) => {

            if(task.id !== taskId) {
              return task;
            }

            updatedTask = {
              ...task,
              ...updates,
              taskName: updates.taskName ?? task.taskName,
              taskContent: updates.taskContent ?? task.taskContent,
              isFinished: updates.isFinished ?? task.isFinished,
              timeFinished: updates.isFinished ? new Date() : null
            };

            return updatedTask;
          });

          return { tasks }
        })

        return updatedTask
      },

      deleteProject: (projectId) => {
        set((state) => {
          const deleted = state.projects.find((i) => i.id === projectId);
          if(!deleted) {
            return state;
          }

          const deletedTaskIds = new Set(deleted.taskIds);

          return {
            projects: state.projects.filter((i) => 
              i.id !== projectId
          ),
            tasks: state.tasks.filter((task) => 
              !deletedTaskIds.has(task.id)
          ),
            selectedProjectId: null,
            selectedTaskId: null,
          };
        });        
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
          projects: state.projects.map((project) => ({
            ...project,
            taskIds: project.taskIds.filter((id) => id !== taskId)
          })),
          selectedTaskId: null
        }));
      },

      incrementCounter: (type) => {
        switch(type) {
          case 'project' :
            set((state) => ({
              projectCounter: state.projectCounter + 1,
            }));
            return;

          case 'task' :
            set((state) => ({
              taskCounter: state.taskCounter + 1,
            }));
            return;
        }
      },

      decrementCounter: (type) => {
        switch(type) {
          case 'project' :
            set((state) => ({
              projectCounter: Math.max(0, state.projectCounter - 1),
            }));
            return;

          case 'task' :
            set((state) => ({
              taskCounter: Math.max(0, state.taskCounter - 1),
            }));
            return;
        }
      },

      setTheme: (theme) => {
        applyTheme(theme)
        set({theme: theme})
      },

      toggleStartPage: () => {
        set((state) => {
          return {
            startPage: state.startPage === true ? false : true 
          }
        })
      }


    };
  });


