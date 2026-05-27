import type { CartType } from "../Cart/CartTypes";

export interface UserActions {
  create: (userName: string, password: string, email: string) => void;
  read: (userName: string, email?: string) => void;
  update: (email: string, password: string, updateParams: userUpdates) => void;
  delete: (email: string, password: string) => void;
  authenticate: (email: string, password: string) => boolean;
}

export interface UserState {
  id: number;
  name: string;
  email: string;
  cart: CartType[];
  isAuthenticated: boolean;
}

export type userUpdates = {
  name?: string;
  password?: string;
  email?: string;
}