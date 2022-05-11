import { useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState(localStorage.getItem("session"));

  const saveSession = (data: any) => {
    const newSession = JSON.stringify(data);
    localStorage.setItem("session", newSession);
    setSession(newSession);
  };

  const removeSession = (data: any) => {
    localStorage.removeItem("session");
    setSession(null);
  };

  return { session, saveSession, removeSession };
};
