import * as z from 'zod'

export const taskSchema = z.object({
  taskName: z.string('TaskName cannot be a number').min(3, 'Name cannot contain less than 3 characters').nonoptional('TaskName is required'),
  taskContent: z.string('Content cannot be a number').min(10, 'Content cannot contain less than 10 characters').nonoptional('Content is required'),
  timeCreated: z.date().default(new Date),
  isFinished: z.boolean().default(false),
  timeFinished: z.coerce.date<Date>().nullish().default(null),
  id: z.coerce.number().nonnegative().nonoptional()
})

export type TaskType = z.infer<typeof taskSchema>