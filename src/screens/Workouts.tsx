import { ScreenHeader } from "@components/ScreenHeader";
import { TrainingCard } from "@components/TrainingCard";
import { AntDesign } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { listTrainings } from "@storage/training/listTrainings";
import { Training } from "@storage/types/training";
import { FlatList, HStack, Icon, Text, VStack } from "native-base";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

export function Workouts() {
  const [trainings, setTrainings] = useState<Training[]>()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenCreateTraining() {
    navigation.navigate('createTraining')
  }

  function handleOpenTrainingDetails(trainingId: string) {
    navigation.navigate('trainingDetails', { trainingId })
  }

  useFocusEffect(useCallback(() => {
    async function fetchTrainings() {
      const trainings = await listTrainings()

      setTrainings(trainings!)
    }

    fetchTrainings()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Treinos" />

      <VStack px={8} pt={5}>
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
        />
      </VStack>
    </VStack>
  )
}