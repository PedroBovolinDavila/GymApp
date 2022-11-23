import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";

type Props = TouchableOpacityProps & { }

export function TrainingCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack 
        bg="gray.500" 
        alignItems="center" 
        p={4} 
        // pr={4}
        mb={3}
        rounded="md" 
      >
        <VStack flex={1}>
          <Heading fontSize="lg" color="white">Treino 1</Heading>

          <Text 
            fontSize="sm" 
            color="gray.200" 
            mt={1}
            numberOfLines={2}
          >
            5 exercícios
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
          size="md"
        />
      </HStack>
    </TouchableOpacity>
  )
}