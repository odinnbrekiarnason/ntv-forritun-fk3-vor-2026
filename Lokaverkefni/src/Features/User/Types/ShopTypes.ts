import type { CartType } from "../../Cart/Types/CartType";

export interface UserActions {
  create: () => void;
  read: () => void;
  update: () => void;
  delete: () => void;
  authenticate: (email: string, password: string) => boolean;
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  cart: CartType[];
  isAuthenticated: boolean;
}