import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_KEY } from "@storage/config"

type CreateUserProps = {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserProps) {
  try {

    const user = {
      name,
      email,
      password,
      avatar: `https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png`
    }

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))

    return user

  } catch (err) {
    console.log(err);
    return new Error('Ocorreu um erro inesperado, tente novamente')
  }
}