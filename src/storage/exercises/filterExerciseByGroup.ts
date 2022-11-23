import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCISE_KEY } from "@storage/config";
import { Exercise } from "@storage/types/exercise";

export async function filterExerciseByGroup(group: string) {
  try {

    const storage = await AsyncStorage.getItem(EXERCISE_KEY)

    const exercises: Exercise[] = storage ? JSON.parse(storage) : []

    return exercises.filter(exercise => exercise.muscularGroup === group)

  } catch (err) {
    console.log(err);
  }
}
