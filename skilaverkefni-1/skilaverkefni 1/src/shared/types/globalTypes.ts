import type { ProjectType } from "@/features/projects/schema/projectSchema";
import type { TaskType } from "@/features/tasks/schema/taskSchema";

export type ThemeName = 'light' | 'dark'

export type CreateProjectInput = {
  projectName: string;
  description?: string;
}

export type CreateTaskInput = {
  taskName: string;
  taskContent: string;
}

export interface StoreActions {
  setProject: (projectId: number) => void;
  setTask: (taskId: number) => void;
  createTask: (projectId: number, input: CreateTaskInput) => void ;
  createProject: (input: CreateProjectInput) => void;
  updateTask: (taskId: number, updates: Partial<Pick<TaskType, 'taskName' | 'taskContent'>>, isDone: boolean) => void;
  updateProject: (projectId: number, updates: Partial<Pick<ProjectType, 'projectName' | 'description'>>, isDone: boolean) => void;
  deleteProject: (projectId: number) => void;
  deleteTask: (taskId: number) => void;
  setTheme: (theme: ThemeName) => void;
  toggleStartPage: () => void
}

export type StoreStates = {
  projects: ProjectType[];
  tasks: TaskType[];
  theme: ThemeName;
  projectCounter: number;
  taskCounter: number;
  selectedProjectId: number;
  selectedTaskId: number;
  createProjectPage: boolean;
  createTaskPage: boolean;
  startPage: boolean;
}

// gera toggleTask sem component (merkja sem complete)
