import { validateSchema } from '../middleware/validator'
import { storeStateSchema, type StoreStateType } from '../schemas/storeStateSchema'
import { taskSchema, type TaskType } from '@/features/tasks/schema/taskSchema'
import { projectSchema, type ProjectType } from '@/features/projects/schema/projectSchema'

export const getInitialStates = (key: string): StoreStateType => {
  const local = localStorage.getItem(key)
  const parsed = JSON.parse(local!)
  const isValid = validateSchema(storeStateSchema, parsed)

  if (!local || !isValid.success) {
    const base: StoreStateType = {
      projects: [],
      tasks: [],
      projectCounter: 0,
      taskCounter: 0,
      startPage: true,
      selectedProjectId: 0,
      selectedTaskId: 0,
      createProjectPage: false,
      createTaskPage: false,
      allProjectsPage: false,
    }

    localStorage.setItem(key, JSON.stringify(base))
    return base;
  };

  return isValid.data
}

export function useLocalStorage(key: string, content?: TaskType | ProjectType | null, contentType?: 'task' | 'project' | null, projectId?: number | null, updateStorage?: string): ProjectType | TaskType | null {
  if(updateStorage !== undefined) {
    localStorage.setItem(key, updateStorage)
  }
  
  if(contentType === 'project') {
    const validContent = validateSchema(projectSchema, content)
    if(!validContent.success) return null;

    const prev = localStorage.getItem(key)
    if(!prev) return null;

    const parsed = validateSchema(storeStateSchema, JSON.parse(prev))
    if(!parsed.success) return null;

    const exists = parsed.data.projects.find((project: ProjectType) => project.id === projectId)

    if(exists) {
      const result: StoreStateType = {
        ...parsed.data,
        projects: parsed.data.projects.map((i) => {
          if(i.id !== exists.id) {
            return i
          }
          return {...i, ...validContent.data}
        })
      }
      localStorage.setItem(key, JSON.stringify(result))
      return validContent.data;
    }

    const result: StoreStateType = {
      ...parsed.data,
      projects: [...parsed.data.projects, validContent.data],
      projectCounter: parsed.data.projectCounter + 1
    }

    localStorage.setItem(key, JSON.stringify(result))
    return validContent.data;
  } else {
    
    const validContent = validateSchema(taskSchema, content)
    if(!validContent.success) return null;
  
    const prev = localStorage.getItem(key)
    if(!prev) return null;
  
    const parsed = validateSchema(storeStateSchema, JSON.parse(prev))
    if(!parsed.success) return null

    const exists = parsed.data.tasks.find((task: TaskType) => task.id === projectId)

    if(exists) {
      const result: StoreStateType = {
        ...parsed.data,
        tasks: parsed.data.tasks.map((i) => {
          if(i.id !== exists.id) {
            return i
          }
          return {...i, ...validContent.data}
        })
      }
      localStorage.setItem(key, JSON.stringify(result))
      return validContent.data;
    }

    const projects = parsed.data.projects.map((i) => i.id === projectId ? i : {...i, taskIds: [...i.taskIds, validContent.data.id]})
  
    const result: StoreStateType = {
      ...parsed.data,
      projects: projects,
      tasks: [...parsed.data.tasks, validContent.data],
      taskCounter: parsed.data.taskCounter + 1
    }
    localStorage.setItem(key, JSON.stringify(result))
    return validContent.data;
  }
}