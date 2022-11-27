import { createContext, ReactNode, useState } from "react";

type AuthContextProps = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
