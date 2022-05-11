import { createContext, useContext, useMemo } from "react";
import { useSession } from "./hooks/useSession";

const AuthContext = createContext<any>({ auth: false, setAuth: undefined });

export const AuthProvider = ({ children }: any) => {
  const { session, saveSession, removeSession } = useSession();

  const value = useMemo(
    () => ({
      session,
      saveSession,
      removeSession,
    }),
    [session, saveSession, removeSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
