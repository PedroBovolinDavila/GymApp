import { Exercise } from "./exercise"

export type History = {
  id: string
  title: string
  data: {
    muscularGroup: string
    name: string,
    hour: string
  }[]
}