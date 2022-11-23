import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRAINING_KEY } from "@storage/config";
import uuid from 'react-native-uuid'
import { findTrainingByTitle } from "./findTrainingByTitle";
import { listTrainings } from "./listTrainings";

type CreateTrainingProps = {
  title: string
  exercisesIds: string[]
}

export async function createTraining({ title, exercisesIds }: CreateTrainingProps) {
  try {

    const trainingExists = await findTrainingByTitle(title)

    if (trainingExists) {
      return
    }

    const prevTrainingList = await listTrainings()
    const id = uuid.v4()

    const newTrainings = JSON.stringify([{
      id,
      title,
      exercisesIds,
      exercisesQuantity: exercisesIds.length
    }, ...prevTrainingList!])

    await AsyncStorage.setItem(TRAINING_KEY, newTrainings)

  } catch (err) {
    console.log(err);
  }
}