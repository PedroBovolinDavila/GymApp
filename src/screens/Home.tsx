import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AntDesign } from '@expo/vector-icons'

import { Center, FlatList, Heading, HStack, Icon, Pressable, Text, VStack } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { GroupSkeleton } from "@components/skeletons/GroupSkeleton";
import { ExerciseCardSkeleton } from "@components/skeletons/ExerciseCardSkeleton";

import { Exercise } from "@storage/types/exercise";
import { listGroups } from "@storage/groups/listGroups";
import { listExercises } from "@storage/exercises/listExercises";
import { filterExerciseByGroup } from "@storage/exercises/filterExerciseByGroup";

export function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [groups, setGroups] = useState<string[]>([]) 
  const [groupSelected, setGroupSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)

    async function fetchData() {
      const exercises = await listExercises()   
      const groups = await listGroups()   
      
      setGroups(groups?.map(group => group.title)!)
      setExercises(exercises!)
      setIsLoading(false)
    }

    fetchData()
  }, []))
  
  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoading ? (
        <HStack my={10} px={8}>
          <GroupSkeleton />
          <GroupSkeleton />
          <GroupSkeleton />
          <GroupSkeleton />
        </HStack>
      ) : (
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
      )}

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

        {isLoading ? (
          <VStack>
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
          </VStack>
        ) :
          <FlatList 
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (       
              <ExerciseCard exercise={item} onPress={() => handleOpenExerciseDetails(item.id)} withIcon /> 
            )}

            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 10,
              ...(exercises.length === 0 && {
                flex: 1,
                justifyContent: 'center'
              })
            }}

            ListEmptyComponent={() => (
              <Center>
                <Text color="gray.100" textAlign="center">
                  Você não possui nenhum exercicio cadastrado.
                </Text>

                <Pressable mt={4} onPress={handleOpenNewExercise}>
                  <Text color="green.500" textAlign="center">
                    Clique aqui e cadastre agora mesmo
                  </Text>
                </Pressable>
              </Center>
            )}
          />
        }
      </VStack>
    </VStack>
  )
}