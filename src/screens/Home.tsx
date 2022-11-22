import { useEffect, useState } from "react";
import { FlatList, Heading, HStack, Icon, ScrollView, Text, useSafeArea, VStack } from "native-base";
import { AntDesign } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import type { Exercise } from "@storage/types/exercise";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import { listExercises } from "@storage/exercises/listExercises";

export function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [groups, setGroups] = useState(['cOStA', 'oMbRO', 'BícEPs', 'tríceps']) 
  const [groupSelected, setGroupSelected] = useState('Ombro')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  function handleOpenNewExercise() {
    navigation.navigate('createExercise')
  }

  async function fetchExercises() {
    const exercises = await listExercises()

    console.log(exercises);

    setExercises(exercises!)
  }

  useEffect(() => {

    fetchExercises()
  }, [])

  return (
    <ScrollView flex={1} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchExercises} />}>
      <VStack>
        <HomeHeader />

        <FlatList 
          data={groups}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          horizontal
    
          renderItem={({ item }) => (
            <Group 
              name={item} 
              isActive={groupSelected.toUpperCase() === item.toUpperCase()} 
              onPress={() => setGroupSelected(item)}
            />
          )}

          my={10}
          maxH={10}
          _contentContainerStyle={{
            px: 8
          }}
        />

        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md">Exercicios</Heading>

            <TouchableOpacity onPress={handleOpenNewExercise}>
              <HStack alignItems="center" space={1.5}>
                <Icon 
                  as={AntDesign}
                  name="pluscircleo"
                  size="xs"
                  color="gray.200"
                />

                <Text color="gray.200" fontSize="sm">
                  {exercises.length}
                </Text>
              </HStack>
            </TouchableOpacity>
          </HStack> 

          <FlatList 
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard exercise={item} onPress={handleOpenExerciseDetails} />
            )}

            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 10
            }}
          />

        </VStack>
      </VStack>
    </ScrollView>
  )
}