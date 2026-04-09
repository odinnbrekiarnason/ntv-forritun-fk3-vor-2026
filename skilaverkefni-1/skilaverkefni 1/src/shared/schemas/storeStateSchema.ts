import * as z from 'zod'
import { projectSchema } from '@/features/projects/schema/projectSchema'
import { taskSchema } from '@/features/tasks/schema/taskSchema'

export const storeStateSchema = z.object({
  projects: z.array(projectSchema),
  tasks: z.array(taskSchema),
  projectCounter: z.number().int().nonnegative(),
  taskCounter: z.number().int().nonnegative(),
})

export type StoreStateSchemaType = z.infer<typeof storeStateSchema>