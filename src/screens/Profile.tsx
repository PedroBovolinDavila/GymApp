import { useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://avatars.githubusercontent.com/u/118199084?v=4')

  const toast = useToast()

  async function handleSelectUserPhoto() {
    try {
      setPhotoIsLoading(true)

      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        
      })
  
      if (selectedPhoto.cancelled) {
        return 
      }

      if (selectedPhoto.uri) {
        const photoInfo = await FileSystem.getInfoAsync(selectedPhoto.uri)
        
        if (!photoInfo.size) {
          return
        }

        const photoSizeInMegabytes = photoInfo.size / 1024 / 1024
        
        if (photoSizeInMegabytes > 2) {
          return toast.show({
            title: 'Essa imagem é muito grande! Escolha uma menor que 5 megas.',
            placement: 'top',
            bg: 'red.500',
          })
        }

        setUserPhoto(selectedPhoto.uri)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      
      <ScrollView>
        <Center mt={6} px={10}>
          {
            photoIsLoading ? (
              <Skeleton
                w={33}
                h={33}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            ) : (
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuario"
                size={33}
              />
            )
          }
          <TouchableOpacity onPress={handleSelectUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input
            bg="gray.600"
            placeholder="Nome"
          />
          <Input
            bg="gray.600"
            placeholder="E-mail"
            isDisabled
          />
        </Center>
        <VStack
          px={10}
          mb={9}
          mt={12}
        >
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>
        
          <Input
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}