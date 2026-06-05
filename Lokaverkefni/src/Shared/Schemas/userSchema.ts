import z from "zod";

export const userStateSchema = z.object({
  id: z.number().nonnegative().nonoptional(),
  isAuthenticated: z.boolean().nonoptional(),
}) 

export type DBUser = z.infer<typeof userStateSchema>;