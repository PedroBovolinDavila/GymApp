import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

import { Heading, HStack, Icon, Text, VStack } from "native-base";

import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/useAuth";

export function HomeHeader() {
  const { user, logoff } = useAuth()  

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: user.avatar }}
        size={16}
        alt="Imagem do usuário"
      />
      
      <VStack flex={1} ml={4}>
        <Text color="gray.100" fontSize="md">
          Olá, 
        </Text>

        <Heading color="gray.100" fontSize="lg">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={logoff}>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>    
    </HStack>
  )
}