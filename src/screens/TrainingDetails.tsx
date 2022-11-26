import { Checkbox, FlatList, Flex, Heading, HStack, Icon, Progress, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { ExerciseCard } from "@components/ExerciseCard";
import { useCallback, useRef, useState } from "react";
import { findTrainingById } from "@storage/training/findTrainingById";
import {Training } from '@storage/types/training'
import { Exercise } from "@storage/types/exercise";
import { listExercisesByIds } from "@storage/exercises/listExercisesByIds";
import { Button } from "@components/Button";
import { Group } from "@components/Group";
import { TextSkeleton } from "@components/skeletons/TextSkeleton";
import { ExerciseCardSkeleton } from "@components/skeletons/ExerciseCardSkeleton";

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

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSetTraining() {
    setButtonText('Finalizar treino')
  }

  useFocusEffect(useCallback(() => {
    setIsLoading(true)

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
            keyExtractor={item => `${item.id}-${Math.random()}`}
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