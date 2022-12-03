import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "@storage/config";
import { User } from "@storage/types/user";

type UpdateUserAvatarProps = {
  avatar: string
}

export async function updateUserAvatar({ avatar }: UpdateUserAvatarProps) {
  try {

    const storage = await AsyncStorage.getItem(USER_KEY)

    if (!storage) {
      return new Error('Você não possui uma conta.')
    }

    const user: User = JSON.parse(storage)

    user.avatar = avatar

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))

    return user

  } catch (err) {
    console.log(err);
    return new Error('Ocorreu um erro inesperado')
  }

}