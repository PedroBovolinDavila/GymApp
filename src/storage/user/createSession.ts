import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "@storage/config";
import { User } from "@storage/types/user";

type CreateSessionProps = {
  email: string
  password: string
}

export async function createSession({ email, password }: CreateSessionProps) {
  try {

    const storage = await AsyncStorage.getItem(USER_KEY)

    if (!storage) {
      return new Error('Você não possui uma conta.')
    }

    const user: User = JSON.parse(storage)

    if (user.email !== email || user.password !== password) {
      return new Error('Email ou senha incorreto')
    }

    return user

  } catch (err) {
    console.log(err);
    return new Error('Ocorreu um erro inesperado')
  }

}