import { ScreenHeader } from "@components/ScreenHeader";
import { TrainingCard } from "@components/TrainingCard";
import { AntDesign } from '@expo/vector-icons'
import { FlatList, HStack, Icon, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Workouts() {
  const [training, setTraining] = useState([
    {
      id: '123',
      title: 'treino 1',
      exerciseQuantity: 5,
    },
    {
      id: '1233',
      title: 'treino 2',
      exerciseQuantity: 10,
    },
    {
      id: '1213',
      title: 'treino 3',
      exerciseQuantity: 40,
    },
    {
      id: '1236',
      title: 'treino 4',
      exerciseQuantity: 10,
    },
    {
      id: '1223',
      title: 'treino 5',
      exerciseQuantity: 2,
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Treinos" />

      <VStack px={8} pt={5}>
        <HStack justifyContent="space-between" alignItems="center" mb={5}>
          <Text color="gray.200">Treinos criados: 5</Text>
          <TouchableOpacity>
            <Icon 
              as={AntDesign}
              name="pluscircleo"
              size="sm"
              color="gray.200"
            />
          </TouchableOpacity>
        </HStack>

        <FlatList 
          data={training}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TrainingCard />
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  )
}