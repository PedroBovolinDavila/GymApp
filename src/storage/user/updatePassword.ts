import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "@storage/config";
import { User } from "@storage/types/user";

type UpdatePasswordProps = {
  newPassword: string
  oldPassword: string
}

export async function updatePassword({ newPassword, oldPassword }: UpdatePasswordProps) {
  try {

    const storage = await AsyncStorage.getItem(USER_KEY)

    if (!storage) {
      return new Error('Você não possui uma conta.')
    }

    const user: User = JSON.parse(storage)

    if (user.password !== oldPassword) {
      return new Error('Senha incorreta')
    }

    user.password = newPassword

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))

    return user

  } catch (err) {
    console.log(err);
    return new Error('Ocorreu um erro inesperado')
  }

}