import { createContext } from "react";
import type { UserData } from "../types/User";

export interface IUserContext {
  user: Omit<UserData, "token">;
  setUser: (user: Omit<UserData, "token">) => void;
  clearUser: () => void;
}

export const UserContext = createContext<IUserContext>({
  user: {} as Omit<UserData, "token">,
  setUser: () => {},
  clearUser: () => {},
});
