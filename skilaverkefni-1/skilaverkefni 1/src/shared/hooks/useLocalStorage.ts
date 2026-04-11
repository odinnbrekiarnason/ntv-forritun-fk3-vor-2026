import { validateSchema } from '../middleware/validator'
import { storeStateSchema, type StoreStateSchemaType } from '../schemas/storeStateSchema'
import { taskSchema, type TaskType } from '@/features/tasks/schema/taskSchema'
import { projectSchema, type ProjectType } from '@/features/projects/schema/projectSchema'


export const getInitialStates = (key: string): StoreStateSchemaType => {
  const local = localStorage.getItem(key)
  const parsed = JSON.parse(local!)
  const isValid = validateSchema(storeStateSchema, parsed)

  if (!local || !isValid.success) {
    const base: StoreStateSchemaType = {
      projects: [],
      tasks: [],
      projectCounter: 0,
      taskCounter: 0,
    }
    localStorage.setItem(key, JSON.stringify(base))
    return base;
  };

  return isValid.data
}

export function useLocalStorage(key: string, content: TaskType | ProjectType, contentType: 'task' | 'project'): ProjectType | TaskType | null {
  if (contentType === 'project') {
    const validContent = validateSchema(projectSchema, content)
    if (!validContent.success) return null;

    const prev = localStorage.getItem(key)
    if (!prev) return null;

    const parsed = validateSchema(storeStateSchema, JSON.parse(prev))
    if (!parsed.success) return null;

    const result: StoreStateSchemaType = {
      ...parsed.data,
      projects: [...parsed.data.projects, validContent.data],
    }

    localStorage.setItem(key, JSON.stringify(result))
    return validContent.data;
  } else {
    const validContent = validateSchema(taskSchema, content)
    if (!validContent.success) return null;
  
    const prev = localStorage.getItem(key)
    if (!prev) return null;
  
    const parsed = validateSchema(storeStateSchema, JSON.parse(prev))
    if(!parsed.success) return null
  
    const result: StoreStateSchemaType = {
      ...parsed.data,
      tasks: [...parsed.data.tasks, validContent.data]
    }
    localStorage.setItem(key, JSON.stringify(result))
    return validContent.data;
  }
}