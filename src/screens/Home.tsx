import { TouchableOpacity, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Heading, HStack, Icon, Text, VStack } from "native-base";
import { AntDesign } from '@expo/vector-icons'

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";

import type { Exercise } from "@storage/types/exercise";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { listExercises } from "@storage/exercises/listExercises";
import { listGroups } from "@storage/groups/listGroups";
import { filterExerciseByGroup } from "@storage/exercises/filterExerciseByGroup";


export function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [groups, setGroups] = useState<string[]>([]) 
  const [groupSelected, setGroupSelected] = useState('')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  function handleOpenNewExercise() {
    navigation.navigate('createExercise')
  }

  async function handleSelectGroup(group: string) {
    setGroupSelected(group)

    const exercises = await filterExerciseByGroup(group)

    setExercises(exercises!)
  }

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      const exercises = await listExercises()   
      const groups = await listGroups()   
      
      setGroups(groups?.map(group => group.title)!)
      setExercises(exercises!)
    }

    fetchData()
  }, []))


  
  return (
    <VStack flex={1}>
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
            onPress={() => handleSelectGroup(item)}
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
            <ExerciseCard exercise={item} onPress={() => handleOpenExerciseDetails(item.id)} withIcon /> 
          )}

          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 10
          }}
        />
      </VStack>
    </VStack>
  )
}