import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCISE_KEY } from "@storage/config";
import uuid from 'react-native-uuid'
import { getExerciseByName } from "./getExerciseByName";
import { listExercises } from "./listExercises";

type CreateExerciseProps = {
  image: string
  name: string
  muscularGroup: string
  series: string
  repetitions: string
}

export async function createExercise({
  image,
  name,
  muscularGroup,
  repetitions,
  series
}: CreateExerciseProps) {
  try {

    const exerciseExists = await getExerciseByName(name)

    if (exerciseExists) {
      throw new Error('Exercicio já existe')
    }

    const prevExerciseList = await listExercises()
    const id = uuid.v4()

    const newExercises = JSON.stringify([{
      id,
      image,
      name,
      muscularGroup,
      repetitions,
      series
    }, ...prevExerciseList!])

    await AsyncStorage.setItem(EXERCISE_KEY, newExercises)

  } catch (err) {
    console.log(err);
  }
}
