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

export type CounterType = 'project' | 'task';

export type StoreActions = {
  setProject: (projectId: number | null) => void;
  setTask: (taskId: number | null) => void;
  createTask: (projectId: number, input: CreateTaskInput) => TaskType | undefined;
  createProject: (input: CreateProjectInput) => ProjectType;
  updateTask: (
    taskId: number,
    updates: Partial<Pick<TaskType, 'taskName' | 'taskContent' | 'isFinished' | 'timeFinished'>>
  ) => TaskType | undefined;
  updateProject: (
    projectId: number,
    updates: Partial<Pick<ProjectType, 'projectName' | 'description'>>
  ) => ProjectType | undefined;
  toggleTask: (taskId: number) => TaskType | undefined;
  deleteProject: (projectId: number) => void;
  deleteTask: (taskId: number) => void;
  updateCounter: (id: number, type: CounterType) => void;
  setTheme: (theme: ThemeName) => void;
}

export type StoreStates = {
  projects: ProjectType[];
  tasks: TaskType[];
  theme: ThemeName;
  startPage: boolean;
  selectedProjectId: number | null;
  selectedTaskId: number | null;
  projectCounter: number;
  taskCounter: number;
}

