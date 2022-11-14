import { useState } from "react";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levatamento terra', 'Supino'])
  const [groups, setGroups] = useState(['cOStA', 'oMbRO', 'BícEPs', 'tríceps']) 
  const [groupSelected, setGroupSelected] = useState('Ombro')


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

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack> 

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard />
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