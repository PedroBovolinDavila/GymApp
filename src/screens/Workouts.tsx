import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AntDesign } from '@expo/vector-icons'

import { Center, FlatList, HStack, Icon, Pressable, Text, VStack } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ScreenHeader } from "@components/ScreenHeader";
import { TrainingCard } from "@components/TrainingCard";
import { ExerciseCardSkeleton } from "@components/skeletons/ExerciseCardSkeleton";

import { Training } from "@storage/types/training";
import { listTrainings } from "@storage/training/listTrainings";

export function Workouts() {
  const [trainings, setTrainings] = useState<Training[]>()
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenCreateTraining() {
    navigation.navigate('createTraining')
  }

  function handleOpenTrainingDetails(trainingId: string) {
    navigation.navigate('trainingDetails', { trainingId })
  }

  useFocusEffect(useCallback(() => {
    setIsLoading(true)

    async function fetchTrainings() {
      const trainings = await listTrainings()

      setTrainings(trainings!)
      setIsLoading(false)
    }

    fetchTrainings()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Treinos" />

      <VStack px={8} pt={5} flex={1}>
        <HStack justifyContent="space-between" alignItems="center" mb={5}>
          <Text color="gray.200">Treinos criados: {trainings?.length}</Text>
          <TouchableOpacity onPress={handleOpenCreateTraining}>
            <Icon 
              as={AntDesign}
              name="pluscircleo"
              size="sm"
              color="gray.200"
            />
          </TouchableOpacity>
        </HStack>

        {isLoading ? (
          <VStack>
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
          </VStack>
        ) : (
          <FlatList 
            data={trainings}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TrainingCard 
                exercisesQuantity={item.exercisesQuantity} 
                trainingName={item.title} 
                onPress={() => handleOpenTrainingDetails(item.id)} 
              />
            )}
            showsVerticalScrollIndicator={false}
            
            contentContainerStyle={trainings?.length === 0 && {
              flex: 1,
              justifyContent: 'center'
            }}

            ListEmptyComponent={() => (
              <Center>
                <Text color="gray.100" textAlign="center">
                  Você não possui nenhum treino criado.
                </Text>

                <Pressable mt={4} onPress={handleOpenCreateTraining}>
                  <Text color="green.500" textAlign="center">
                    Clique aqui e cadastre agora mesmo
                  </Text>
                </Pressable>
              </Center>
            )}
          />
        )}

       
      </VStack>
    </VStack>
  )
}