import { create } from "zustand";
import type { UserActions, UserState } from "../Types/ShopTypes";




export const userShop = create<UserState & UserActions>((set) => ({
    id: "",
    name: "",
    email: "",
    cart: [],
    isAuthenticated: false,

    authenticate: (email: string, password: string) => {
        // Implement authentication logic here
        return false;
    },

    create: () => {},
    read: () => {},
    update: () => {},
    delete: () => {},
}));