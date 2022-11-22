import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_KEY } from "@storage/config";
import { Group } from "@storage/types/group";

export async function findGroupByTitle(title: string) {
  try {

    const storage = await AsyncStorage.getItem(GROUP_KEY)

    const groups: Group[] = storage ? JSON.parse(storage) : []

    return groups.find(group => group.title === title)

  } catch (err) {
    console.log(err);
  }
}