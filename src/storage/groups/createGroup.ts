import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_KEY } from "@storage/config";
import { findGroupByTitle } from "./findGroupByTitle";
import uuid from 'react-native-uuid'
import { listGroups } from "./listGroups";

export async function createGroup(title: string) {
  try {

    const groupExists = await findGroupByTitle(title)

    if (groupExists) {
      return new Error('Grupo já existe')
    }

    const prevGroupList = await listGroups()
    const id = uuid.v4()

    const newGroups = JSON.stringify([{ id, title }, ...prevGroupList!])

    await AsyncStorage.setItem(GROUP_KEY, newGroups)

    return {
      id,
      title
    }

  } catch (err) {
    console.log(err);
  }
}