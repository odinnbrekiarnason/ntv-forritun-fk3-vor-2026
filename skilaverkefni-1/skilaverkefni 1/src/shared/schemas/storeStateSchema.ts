import * as z from 'zod'
import { projectSchema } from '@/features/projects/schema/projectSchema'
import { taskSchema } from '@/features/tasks/schema/taskSchema'

export const storeStateSchema = z.object({
  projects: z.array(projectSchema),
  tasks: z.array(taskSchema),
  projectCounter: z.number().int().nonnegative(),
  taskCounter: z.number().int().nonnegative(),
  selectedProjectId: z.number().int().nonnegative(),
  selectedTaskId: z.number().int().nonnegative(),
  startPage: z.boolean(),
  createProjectPage: z.boolean(),
  createTaskPage: z.boolean(),
  allProjectsPage: z.boolean()
})

export type StoreStateType = z.infer<typeof storeStateSchema>