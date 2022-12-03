import { useContext } from "react";

import { AuthContext } from "@contexts/AuthContext";

export function useAuth() {
  const { authenticateUser, isAuthenticated, logoff, user, updateUser } = useContext(AuthContext)

  return { authenticateUser, isAuthenticated, logoff, user, updateUser }
}