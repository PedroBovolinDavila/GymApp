import { Center, Heading, SectionList, Text, VStack } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { listHistory } from "@storage/history/listHistory";
import { Exercise } from "@storage/types/exercise";
import { History as HistoryType } from "@storage/types/history";

export function History() {
  const [exercises, setExercises] = useState<HistoryType[]>([])

  useFocusEffect(useCallback(() => {
    async function fetchData() {
      const exercises = await listHistory()

      setExercises(exercises!)
    }

    fetchData()
  }, [] ))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Historico de exercicios" />

      <SectionList 
        sections={exercises}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        px={8}

        renderItem={({ item }) => (
          <HistoryCard exercise={item} />
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