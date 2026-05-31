import z from "zod";
import type { CartItemType } from "../../Features/Cart/CartSchema/cartSchema";

export const userSchema = z.object({
  id: z.number().nonnegative().nonoptional(),
  username: z.string().min(1).nonoptional(),
  email: z.email().nonoptional(),
  createdAt: z.date().nonoptional(),
  updatedAt: z.date().nonoptional(),
}) 

export type DBUser = z.infer<typeof userSchema>;

export interface UserState {
  id: number;
  cart: CartItemType[];
  isAuthenticated: boolean;
}
