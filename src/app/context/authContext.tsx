"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context value
interface AuthContextType {
  authUser: any; // You might want to replace `any` with a more specific type if you know the shape of `authUser`
  setAuthUser: React.Dispatch<React.SetStateAction<any>>; // Same here for `any`
}

// Create a context with an initial value of `null`
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the type for the provider's props
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("admin") || "null");
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
