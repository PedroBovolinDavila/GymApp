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
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
    }

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))

    return user

  } catch (err) {
    console.log(err);
    return new Error('Ocorreu um erro inesperado, tente novamente')
  }
}