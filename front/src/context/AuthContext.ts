import { createContext } from "react";
export interface AuthContextType {
  isAuth: boolean;
  toggleIsAuthFalse: () => void;
  toggleIsAuthTrue: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  toggleIsAuthFalse: () => {},
  toggleIsAuthTrue: () => {},
});
