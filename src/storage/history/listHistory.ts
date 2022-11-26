import AsyncStorage from '@react-native-async-storage/async-storage'
import { HISTORY_KEY } from '@storage/config';
import { Exercise } from '@storage/types/exercise';
import { History } from '@storage/types/history';

export async function listHistory() {
  try {

    const storage = await AsyncStorage.getItem(HISTORY_KEY)

    const history: History[] = storage ? JSON.parse(storage) : []

    return history

  } catch (err) {
    console.log(err);
  }
}
