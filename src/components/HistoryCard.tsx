import { Heading, HStack, Text, VStack } from "native-base";

type HistoryCardProps = {
  exercise: {
    muscularGroup: string
    name: string
    hour: string
  }
}

export function HistoryCard({ exercise }: HistoryCardProps) {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5}>
        <Heading 
          color="white" 
          fontSize="lg" 
          textTransform="capitalize"
        >
          {exercise.muscularGroup}
        </Heading>

        <Text 
          color="gray.100"
          fontSize="md"
          numberOfLines={1}
        >
          {exercise.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">{exercise.hour}</Text>
    </HStack>
  )
}