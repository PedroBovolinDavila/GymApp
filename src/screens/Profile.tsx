import { useState } from "react";
import { TouchableOpacity } from "react-native";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { MaterialIcons } from '@expo/vector-icons'

import { Center, ScrollView, VStack, Text, Heading, useToast, Icon, HStack, Modal, IconButton } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhotoSkeleton } from "@components/skeletons/UserPhotoSkeleton";

export function Profile() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/pedrobovolindavila.png')
  
  const toast = useToast()

  async function handleSelectPhotoFromGallery() {
    try {
      setPhotoIsLoading(true)

      const userImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      }) 

      if (userImage.cancelled) {
        return toast.show({
          title: 'Você cancelou a seleção.',
          bg: 'red.500',
          placement: 'top'
        })
      }

      if (userImage.uri) {
        const imageInfo = await FileSystem.getInfoAsync(userImage.uri)

        if (imageInfo.size && imageInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Escolha uma imagem menor que 5mb.',
            color: 'red.500'
          })
        }

        setUserPhoto(userImage.uri)
      }
    } catch (err) {
      console.log(err); 
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleTakePicture() {
    try {
      setPhotoIsLoading(true)

      const userImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      }) 

      if (userImage.cancelled) {
        return toast.show({
          title: 'Você cancelou a seleção.',
        })
      }

      setUserPhoto(userImage.uri)
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
            photoIsLoading ? <UserPhotoSkeleton size={33} /> : (
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuario"
                size={33}
              />
            )
          }

          <TouchableOpacity onPress={() => setModalIsOpen(true)}>
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

          <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <Modal.Content>
              <Modal.Body bg="gray.400" borderColor="green.500" borderWidth={1} borderRadius="lg">
                <HStack px={2} justifyContent="space-around">
                  <VStack alignItems="center" justifyContent="center">
                    <IconButton
                      icon={<Icon as={MaterialIcons} name="add-photo-alternate"  />}
                      _icon={{
                        color: 'gray.100',
                        size: "2xl"
                      }}
                      onPress={handleSelectPhotoFromGallery}
                    />

                    <Text color="gray.100" fontSize="sm">
                      Galeria
                    </Text>
                  </VStack>

                  <VStack alignItems="center" justifyContent="center">
                    <IconButton
                      icon={<Icon as={MaterialIcons} name="add-a-photo"  />}
                      _icon={{
                        color: 'gray.100',
                        size: "2xl"
                      }}
                      onPress={handleTakePicture}
                    />

                    <Text color="gray.100" fontSize="sm">
                      Camera
                    </Text>
                  </VStack>
                </HStack>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          
          <Input
            bg="gray.600"
            placeholder="Nome"
          />
          <Input
            bg="gray.600"
            placeholder="Informe o seu email no registro"
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

          <Button title="Atualizar" mt={4}  />
        </VStack>
      </ScrollView>
    </VStack>
  )
}