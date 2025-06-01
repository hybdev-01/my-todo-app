import { useState, type ReactNode } from "react";
import type { UserData } from "../types/User";
import { UserContext, type IUserContext } from "./UserContext";

interface UserContextProviderProps {
  children: ReactNode;
}

type UserStateType = Omit<UserData, "token">;

const defaultUserState: UserStateType = {
  id: -1,
  firstName: "",
  username: "",
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] =
    useState<UserStateType>(defaultUserState);

  const setUser = (user: Omit<UserData, "token">) => {
    setCurrentUser(user);
  };

  const clearUser = () => setCurrentUser(defaultUserState);

  const userContextValue: IUserContext = {
    user: currentUser,
    setUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
