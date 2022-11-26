import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { Select } from "@components/Select";
import { listExercises } from "@storage/exercises/listExercises";
import { Exercise } from "@storage/types/exercise";
import { Badge, Flex, Icon, Pressable, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons'
import { Button } from "@components/Button";
import { createTraining } from "@storage/training/createTraining";

export function CreateTraining() {
  const [title, setTitle] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [exercisesIds, setExercisesIds] = useState<string[]>([])
  const [exercisesNames, setExercisesNames] = useState<string[]>([])

  const toast = useToast()

  const selectData = exercises?.map(exercise => (
    {
      label: exercise.name,
      value: exercise.id
    }
  ))

  function handleChangeValue(value: string) {
    setExercisesIds(prev => [...prev, value])

    const exerciseName = exercises.find(exercise => exercise.id === value)?.name

    setExercisesNames(prev => [...prev, exerciseName!])
  }

  function handleRemoveExercise(name: string) {
    const deletedId = exercises.find(exercise => exercise.name === name)?.id

    setExercisesIds(prev => prev.filter(exerciseId => exerciseId !== deletedId))
    setExercisesNames(prev => prev.filter(exercise => exercise !== name))
  }

  async function handleCreateTraining() {
    if (!title.trim() || exercisesIds.length === 0) {
      return toast.show({
        title: 'Informe todos os dados',
        placement: 'top',
        bg: 'red.500'
      })
    }

    const result = await createTraining({
      title, 
      exercisesIds
    })

    if (result instanceof Error) {
      return toast.show({
        title: result.message,
        placement: 'top',
        bg: 'red.500'
      })
    }

    toast.show({
      title: 'Treino criado com sucesso',
      placement: 'top',
      bg: 'green.500'
    })

    setTitle('')
    setExercisesIds([])
    setExercisesNames([])
  }

  useEffect(() => {
    async function fetchData() {
      const exercises = await listExercises()

      setExercises(exercises!)
    }

    fetchData()
  }, [])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Criar treino" />

      <VStack mx={8} mt={8}>
        <Input
          bg="gray.600"
          placeholder="Nome"
          onChangeText={setTitle}
          value={title}
        />   

        <Select 
          bg="gray.600"
          placeholder="Adicione os exercícios"
          items={selectData}
          onValueChange={value => handleChangeValue(value)}
        />

        <Flex flexDir="row" flexWrap="wrap" my={8}>
          {exercisesNames.map((exerciseName, index) => (
            <Pressable mr={0.5} mb={0.5} key={`${exerciseName}-${index}`} onPress={() => handleRemoveExercise(exerciseName)}>
              <Badge 
                rounded="sm"
                bg="green.500" 
                alignItems="center"
                rightIcon={<Icon as={FontAwesome5} name="times" ml={2} color="white" size="xs" />} 
              >
                <Text color="white" fontWeight="bold">
                  {exerciseName}
                </Text>
              </Badge>
            </Pressable>
          ))}
        </Flex>

        <Button title="Criar treino" onPress={handleCreateTraining} />
      </VStack>
    </VStack>
  )
}