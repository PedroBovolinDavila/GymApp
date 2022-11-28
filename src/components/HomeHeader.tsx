import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'

import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { UserPhotoSkeleton } from "./skeletons/UserPhotoSkeleton";

export function HomeHeader() {
  const { setIsAuthenticated } = useContext(AuthContext)

  function handleLogout() {
    setIsAuthenticated(false)
  }

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
        <UserPhoto
          source={{ uri: 'https://github.com/pedrobovolindavila.png' }}
          size={16}
          alt="Imagem do usuário"
          
        />

      <VStack flex={1} ml={4}>
        <Text color="gray.100" fontSize="md">
          Olá, 
        </Text>

        <Heading color="gray.100" fontSize="lg">
          Pedro
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleLogout}>
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