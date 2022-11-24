import { Exercise } from "@storage/types/exercise";
import { listExercises } from "./listExercises";

export async function listExercisesByIds(ids: string[]) {
  try {

    const storage = await listExercises()
    // let exercises = storage?.filter(exercise => ids.includes(exercise.id))
    let exercises: Exercise[] = []

    for (let i = 0; i < ids?.length!; i++) {
      const exercise = storage?.find(exercise => exercise.id === ids[i])

      exercises.push(exercise!)
    }

    return exercises

  } catch (err) {
    console.log(err);
  }
}