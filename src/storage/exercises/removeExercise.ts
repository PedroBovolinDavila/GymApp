import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCISE_KEY } from "@storage/config";
import { listExercises } from "./listExercises";

export async function removeExercise(exerciseId: string) {
  try {

    const exercises = await listExercises()

    if (!exercises) {
      return new Error('Você não possui nenhum exercicio cadastrado')
    }

    const newExercises = exercises.filter(
      exercise => exercise.id !== exerciseId
    )

    await AsyncStorage.setItem(EXERCISE_KEY, JSON.stringify(newExercises))

    return newExercises

  } catch (err) {
    console.log(err);
    return new Error('Erro ao excluir exercicio. Tente novamente.')
  }
}