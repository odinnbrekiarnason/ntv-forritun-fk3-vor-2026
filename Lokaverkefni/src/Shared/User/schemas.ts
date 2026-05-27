import z from "zod";

export const userSchema = z.object({
  id: z.number().nonnegative().nonoptional(),
  username: z.string().min(1).nonoptional(),
  email: z.email().nonoptional(),
  password: z.string().min(8).nonoptional(),
  createdAt: z.date().nonoptional(),
  updatedAt: z.date().nonoptional(),
})

export const userNoPwSchema = userSchema.omit({ password: true });

export type DBUser = z.infer<typeof userSchema>;
export type DBUserNoPw = z.infer<typeof userNoPwSchema>;