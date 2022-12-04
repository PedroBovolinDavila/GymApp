import { createContext, ReactNode, useState } from "react";

import { User } from "@storage/types/user";
import { createSession } from "@storage/user/createSession";
import { updatePassword } from "@storage/user/updatePassword";
import { updateUserAvatar } from "@storage/user/updateUserAvatar";

type AuthenticatedUserProps = {
  email: string
  password: string
}

type UpdateUserProps = {
  avatar?: string
  newPassword?: string
  oldPassword?: string
}

type AuthContextProps = {
  user: User
  isAuthenticated: boolean
  authenticateUser: ({ email, password }: AuthenticatedUserProps) => Promise<string | undefined>
  updateUser: ({ avatar, newPassword, oldPassword }: UpdateUserProps) => Promise<Error | undefined>
  logoff: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
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

  async function updateUser({ avatar, newPassword, oldPassword }: UpdateUserProps) {
    if (avatar) {
      const result = await updateUserAvatar({ avatar })

      if (result instanceof Error) {
        return new Error(result.message)
      }

      setUser(user => (
        {
          ...user,
          avatar
        }
      ))
    }

    if (newPassword && oldPassword) {
      const result = await updatePassword({ newPassword, oldPassword })

      if (result instanceof Error) {
        return new Error(result.message)
      }

      setUser(user => (
        {
          ...user,
          password: newPassword
        }
      ))
    }
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: user!,
      authenticateUser,
      logoff,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }