import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { Exercise } from "@storage/types/exercise";

type Props = TouchableOpacityProps & {
  exercise: Exercise
}

export function ExerciseCard({ exercise, ...rest }: Props) {
  console.log(exercise);
  

  return (
    <TouchableOpacity {...rest}>
      <HStack 
        bg="gray.500" 
        alignItems="center" 
        p={2} 
        pr={4}
        mb={3}
        rounded="md" 
      >
        <Image 
          source={{ uri: exercise.image }}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">{exercise.name}</Heading>

          <Text 
            fontSize="sm" 
            color="gray.200" 
            mt={1}
            numberOfLines={2}
          >
            {exercise.series} séries x {exercise.repetitions} repetições 
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}