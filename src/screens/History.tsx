import { Center, Heading, SectionList, Text, VStack } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '27.08.22',
      data: ['Puxada frontal']
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercicios" />

      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        px={8}

        renderItem={({ item }) => (
          <HistoryCard />
        )}

        renderSectionHeader={({ section }) => (
          <Heading 
            color="gray.200" 
            fontSize="md"
            mt={10}
            mb={3}
          >
            {section.title}
          </Heading>
        )}

        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercicios registrados ainda. {'\n'}
            Vamos fazer exercicios hoje?
          </Text>
        )}

        contentContainerStyle={exercises.length === 0 && {
          flex: 1,
          justifyContent: 'center'
        }}
      />
    </VStack>
  )
}