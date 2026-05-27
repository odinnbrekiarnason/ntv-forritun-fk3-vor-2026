import { create } from "zustand";
import { CreateUser } from "../../../API/User/UserScripts/CRUD";
import type { UserActions, UserState } from "../../../Shared/User/UserTypes";


export const userShop = create<UserState & UserActions>((set) => ({
    id: 0,
    name: "",
    email: "",
    cart: [],
    isAuthenticated: false,

    authenticate: (email: string, password: string) => {
        // Implement authentication logic here
        return false;
    },

    create: (userName, password, email) => {
      const result = CreateUser(userName, email, password);

      if(result instanceof Promise) {
        set((user) => ({
          ...user,
          ...result,
          isAuthenticated: true,
        }))
      }
    },

    read: (username, email) => {},

    update: (email, password) => {},

    delete: (email, password) => {},
}));