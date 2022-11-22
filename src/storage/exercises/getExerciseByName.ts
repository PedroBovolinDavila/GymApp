import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCISE_KEY } from "@storage/config";
import { Exercise } from "@storage/types/exercise";

export async function getExerciseByName(name: string) {
  try {

    const storage = await AsyncStorage.getItem(EXERCISE_KEY)

    const exercises: Exercise[] = storage ? JSON.parse(storage) : []

    return exercises.find(exercise => exercise.name === name)

  } catch (err) {
    console.log(err);
  }
}
