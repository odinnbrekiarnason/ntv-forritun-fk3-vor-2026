import { projectSchema, type ProjectType } from '../../features/projects/schema/projectSchema'
import { taskSchema, type TaskType } from '../../features/tasks/schema/taskSchema'
import { validateSchema } from '../middleware/validator'
import type { StoreStates } from '../types/globalTypes'
import { storeStateSchema } from '../schemas/storeStateSchema'

type DataType = 'ProjectType' | 'TaskType'
type ActionType = 'get' | 'set'
type InputType = ProjectType | TaskType


export const useLocalStorage = (dataType: DataType, action: ActionType, key: string, data?: InputType): ProjectType | TaskType | null => {
  switch (action) {
    case 'set':
      switch (dataType) {
        case 'ProjectType':
          const isProject = validateSchema(projectSchema, data)
          if(isProject.success === false) return null; 

          const projectString = JSON.stringify(data)
          localStorage.setItem(key, projectString)
          break;

        case 'TaskType':
          const isTask = validateSchema(taskSchema, data) 
          if(isTask.success === false) return null

          const taskString = JSON.stringify(data)
          localStorage.setItem(key, taskString)
          break;
      };
      return null;

    case 'get':
      switch (dataType) {
        case 'ProjectType':
          const getProject = localStorage.getItem(key);
          if (!getProject) return null;
          let parsedProject;
          try {
            parsedProject = JSON.parse(getProject)
          } catch(e) {
            return null;
          }

          const isValidProject = validateSchema(projectSchema, parsedProject) 
          if(isValidProject.success === false) return null; 

          const project: ProjectType = isValidProject.data
          return project;

        case 'TaskType':
          const getTask = localStorage.getItem(key);
          if (!getTask) return null;

          let parsedTask;
          try {
            parsedTask = JSON.parse(getTask)
          } catch(e) {
            return null;
          }

          const isValidtask = validateSchema(taskSchema, parsedTask)
          if (isValidtask.success === false) return null;

          const task: TaskType = isValidtask.data
          return task
      }
  }
}

export const getInitialStoreState = (key: string): void | StoreStates => {
  const isPresent = localStorage.getItem(key)
  let initialStates: StoreStates = {
      projects: [],
      tasks: [],
      startPage: true,
      selectedProjectId: 0,
      selectedTaskId: 0,
      projectCounter: 0,
      taskCounter: 0,
      createProjectPage: false,
      createTaskPage: false,
    };

  if (isPresent === null) {
    localStorage.setItem('States', JSON.stringify(initialStates));
    return initialStates;
  }

  try{
    const storeStates = JSON.parse(isPresent)
    const isValid = validateSchema(storeStateSchema, storeStates) 

    if(isValid.success) {
      const data = isValid.data
      initialStates = {
        ...initialStates,
        ...data,
      }
      return initialStates
    } 
    return initialStates;
  } catch(e) {
    return initialStates;
  }
}
