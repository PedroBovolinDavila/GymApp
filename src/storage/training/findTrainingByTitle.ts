import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRAINING_KEY } from "@storage/config";
import { Training } from "@storage/types/training";

export async function findTrainingByTitle(title: string) {
  try {

    const storage = await AsyncStorage.getItem(TRAINING_KEY)

    const training: Training[] = storage ? JSON.parse(storage) : []

    return training.find(group => group.title === title)

  } catch (err) {
    console.log(err);
  }
}