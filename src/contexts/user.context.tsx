import { createContext, ReactNode, useState } from "react";
import IUser from "../interfaces/user";

interface IUserContext {
  currentUser: IUser | null;
  isAuthenticated: boolean;
  loginUser: (user: IUser) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const isAuthenticated = currentUser !== null;

  const loginUser = (user: IUser) => {
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
