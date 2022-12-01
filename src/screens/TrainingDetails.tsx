import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import { Feather } from '@expo/vector-icons'

import { Checkbox, FlatList, Heading, HStack, Icon, Text, useToast, VStack } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { TextSkeleton } from "@components/skeletons/TextSkeleton";
import { ExerciseCardSkeleton } from "@components/skeletons/ExerciseCardSkeleton";

import {Training } from '@storage/types/training'
import { Exercise } from "@storage/types/exercise";
import { createHistory } from "@storage/history/createHistory";
import { findTrainingById } from "@storage/training/findTrainingById";
import { listExercisesByIds } from "@storage/exercises/listExercisesByIds";

type TrainingDetailsParams  = {
  params: {
    trainingId: string
  }
}

export function TrainingDetails() {
  const [training, setTraining] = useState<Training>()
  const [exercises, setExercises] = useState<Exercise[]>()
  const [buttonText, setButtonText] = useState('Iniciar treino')
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute() as TrainingDetailsParams

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSetTraining() {
    if (buttonText === 'Iniciar treino') {
      setButtonText('Finalizar treino')
      return
    }

    await createHistory({
      date: new Date(),
      exercisesIds: training?.exercisesIds!
    })

    setButtonText('Iniciar treino')

    toast.show({
      title: 'Treino finalizado com sucesso',
      placement: 'top',
      bg: 'green.500'
    })

    navigation.navigate('history')
  }

  useFocusEffect(useCallback(() => {
    setIsLoading(true)
    setButtonText('Iniciar treino')

    async function fetchData() {
      const training = await findTrainingById(params.trainingId)
      setTraining(training)
      
      const exercises = await listExercisesByIds(training?.exercisesIds!)
      setExercises(exercises!)

      setIsLoading(false)
    }

    fetchData()
  }, [params.trainingId]))

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack 
          justifyContent="space-between" 
          mt={4} 
          mb={8} 
          alignItems="center"
        >
          {isLoading ? (
            <TextSkeleton size={40} />
          ) : (
            <Heading color="gray.100" fontSize="lg" flexShrink={1}>
              {training?.title}
            </Heading>
          )}
          

          <HStack alignItems="center">
            {isLoading ? (
              <TextSkeleton size={20} />
            ) : (
              <Text color="gray.200" ml={1} textTransform="capitalize">
                {training?.exercisesQuantity} exercícios
              </Text>
            )}
          </HStack>
        </HStack>
      </VStack>

      <VStack px={8} flex={1}>
        <Group 
          name={buttonText} 
          isActive={true} 
          w="full" 
          my={8} 
          onPress={handleSetTraining}
        />

        {isLoading ? (
          <VStack>
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
          </VStack>
        ) : (
          <FlatList 
            data={exercises}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <Checkbox
                value={item.id} 
                bg="gray.400" 
                borderWidth={0}
                size="md" 

                _checked={{
                  bg: 'green.500'
                }}
                _pressed={{
                  bg: 'green.500'
                }}
              >
                <ExerciseCard exercise={item} style={{ flex: 1 }} />
              </Checkbox>
            )}
          />
        )}        
      </VStack>
    </VStack>
  )
}