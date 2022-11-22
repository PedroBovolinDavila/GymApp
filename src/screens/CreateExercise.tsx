import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { HStack, Skeleton, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export function CreateExercise() {
  const [exerciseImage, setExerciseImage] = useState('')
  const [name, setName] = useState('')
  const [series, setSeries] = useState('')
  const [repetitions, setRepetitions] = useState('')
  
  const toast = useToast()

  async function handleSelectExerciseImage() {
    try {

      const exerciseImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      })

      if (exerciseImage.cancelled) {
        return toast.show({
          title: 'Cancelado pelo usuário',
          bg: 'red.500',
          placement: 'top'
        })
      }

      setExerciseImage(exerciseImage.uri)

    } catch (err) {
      toast.show({
        title: 'Ocorreu um erro inesperado, tente novamente.',
        bg: 'red.500',
        placement: 'top'
      })
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Criar exercicio" />

      <VStack px={8}>
        <HStack mt={6} justifyContent="space-around" alignItems="center">
          {exerciseImage ? (
            <UserPhoto 
              source={{ uri: exerciseImage }}
              alt=""
              size={32}
            /> 
          ) : (
            <Skeleton
              h={32}
              w={32}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          )}

          <TouchableOpacity onPress={handleSelectExerciseImage}>
            <Text color="green.500" fontWeight="bold" fontSize="md">Selecionar imagem</Text>
          </TouchableOpacity>
        </HStack>

        <VStack my={6} >
          <Input
            bg="gray.600"
            placeholder="Nome"
            onChangeText={setName}
          />
          <Input
            bg="gray.600"
            placeholder="Grupo muscular"
            onChangeText={setName}
          />
          <HStack justifyContent="space-between">
            <Input
              w="49%"
              bg="gray.600"
              placeholder="Séries"
              onChangeText={setSeries}
            />
            <Input
              w="49%"
              bg="gray.600"
              placeholder="Repetições"
              onChangeText={setRepetitions}
            />
          </HStack>
        </VStack>

        <Button 
          title="Criar exercicio"
        />
      </VStack>
    </VStack>
  )
}