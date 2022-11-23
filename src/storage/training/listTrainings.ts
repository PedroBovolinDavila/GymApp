import AsyncStorage from '@react-native-async-storage/async-storage'
import { TRAINING_KEY } from '@storage/config';
import { Training } from '@storage/types/training';

export async function listTrainings() {
  try {

    const storage = await AsyncStorage.getItem(TRAINING_KEY)

    const trainings: Training[] = storage ? JSON.parse(storage) : []

    return trainings

  } catch (err) {
    console.log(err);
  }
}
