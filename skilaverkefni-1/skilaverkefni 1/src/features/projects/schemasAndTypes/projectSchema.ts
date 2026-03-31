import * as z from 'zod'

export const projectSchema = z.object({
  projectName: z.string('Project name cannot be a number').trim().min(3, 'Project name cannot contain less than 3 characters').nonoptional('Project name is required'),
  description: z.string('Description cannot be a number').trim().max(500, 'Description cannot contain more than 500 characters').optional().default(''),
  timeCreated: z.date().default(new Date),
  taskIds: z.array(z.string()).default([]),
  id: z.number().nonnegative().nonoptional()
})

export type ProjectType = z.infer<typeof projectSchema>