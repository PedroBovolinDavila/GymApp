import AsyncStorage from "@react-native-async-storage/async-storage";
import { HISTORY_KEY } from "@storage/config";
import { listHistory } from "./listHistory";
import { format } from 'date-fns'
import { listExercisesByIds } from "@storage/exercises/listExercisesByIds";
import uuid from 'react-native-uuid'

type CreateHistoryProps = {
  exercisesIds: string[]
  date: Date
}

export async function createHistory({ exercisesIds, date }: CreateHistoryProps) {
  try {

    const prevHistory = await listHistory()
    const exercises = await listExercisesByIds(exercisesIds)

    const hour = format(date, 'HH:mm')
    const day = format(date, 'dd.MM.yy')

    let section = prevHistory?.find(section => section.title === day)

    if (!section) {
      const id = uuid.v4()

      section = {
        title: day,
        id: String(id),
        data: []
      }
    }

    exercises?.map(exercise => {
      section?.data.push({
        name: exercise.name,
        muscularGroup: exercise.muscularGroup,
        hour
      })
    })

    const newHistory = prevHistory?.filter(section => section.title !== day)

    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([section, ...newHistory!]))

  } catch (err) {
    console.log(err);
    return new Error('Ocorreu um erro inesperado')
  }
}