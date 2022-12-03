import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const { authenticateUser, isAuthenticated, logoff, user, updateUserPassword } = useContext(AuthContext)

  return { authenticateUser, isAuthenticated, logoff, user, updateUserPassword }
}