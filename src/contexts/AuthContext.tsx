import { createContext, ReactNode, useState } from "react";

import { User } from "@storage/types/user";
import { createSession } from "@storage/user/createSession";

type AuthenticatedUserProps = {
  email: string
  password: string
}

type AuthContextProps = {
  user: User
  isAuthenticated: boolean
  authenticateUser: ({ email, password }: AuthenticatedUserProps) => Promise<string | undefined>
  updateUserPassword: (newPassword: string) => void
  logoff: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>({} as User)

  async function authenticateUser({ email, password }: AuthenticatedUserProps) {
    const result = await createSession({
      email,
      password
    })

    if (result instanceof Error) {
      return result.message
    }

    setUser(result)
    setIsAuthenticated(true)
  }

  function logoff() {
    setIsAuthenticated(false)
  }

  function updateUserPassword(newPassword: string) {
    setUser(user => (
      {
        ...user,
        password: newPassword
      }
    ))
  }

  function updateUser({  }) {

  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: user!,
      authenticateUser,
      logoff,
      updateUserPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }