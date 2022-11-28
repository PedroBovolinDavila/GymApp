import { User } from "@storage/types/user";
import { createContext, ReactNode, useState } from "react";

type AuthContextProps = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  user: User
  setUser: (value: User) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>()

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user: user!,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
