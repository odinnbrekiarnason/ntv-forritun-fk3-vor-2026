import type { ProjectType } from "@/features/projects/schema/projectSchema";
import type { CreateProjectInput } from "@/features/projects/types/CreateProjectType";
import type { TaskType } from "@/features/tasks/schema/taskSchema";
import type { CreateTaskInput } from "@/features/tasks/types/createTaskType";


export interface StoreActions {
  setProject: (projectId: number) => void;
  setTask: (taskId: number) => void;
  createTask: (projectId: number, input: CreateTaskInput) => void ;
  createProject: (input: CreateProjectInput) => void;
  updateTask: (taskId: number, updates: Partial<Pick<TaskType, 'taskName' | 'taskContent'>>, isDone: boolean) => void;
  updateProject: (projectId: number, updates: Partial<Pick<ProjectType, 'projectName' | 'description'>>, isDone: boolean) => void;
  deleteProject: (projectId: number) => void;
  deleteTask: (taskId: number) => void;
  toggleStartPage: () => void
}

export type StoreStates = {
  projects: ProjectType[];
  tasks: TaskType[];
  projectCounter: number;
  taskCounter: number;
  selectedProjectId: number;
  selectedTaskId: number;
  createProjectPage: boolean;
  createTaskPage: boolean;
  startPage: boolean;
}

// gera toggleTask sem component (merkja sem complete)
