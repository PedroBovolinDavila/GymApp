import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRAINING_KEY } from "@storage/config";
import uuid from 'react-native-uuid'
import { findTrainingByTitle } from "./findTrainingByTitle";
import { listTrainings } from "./listTrainings";

export async function createTraining(title: string) {
  try {

    const trainingExists = await findTrainingByTitle(title)

    if (trainingExists) {
      return
    }

    const prevTrainingList = await listTrainings()
    const id = uuid.v4()

    const newTrainings = JSON.stringify([{ id, title }, ...prevTrainingList!])

    await AsyncStorage.setItem(TRAINING_KEY, newTrainings)

  } catch (err) {
    console.log(err);
  }
}