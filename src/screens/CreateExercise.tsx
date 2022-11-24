import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { HStack, Modal, ScrollView, Skeleton, Text, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { createExercise } from "@storage/exercises/createExercise";
import { Select } from "@components/Select";
import { useFocusEffect } from "@react-navigation/native";
import { listGroups } from "@storage/groups/listGroups";
import { Group } from "@storage/types/group";
import { createGroup } from "@storage/groups/createGroup";
import { UserPhotoSkeleton } from "@components/skeletons/UserPhotoSkeleton";

type Teste = {
  label: string
  value: string
}

export function CreateExercise() {
  //TODO: Adicionar React-hook-form aqui
  const [name, setName] = useState('')
  const [muscularGroup, setMuscularGroup] = useState('')
  const [series, setSeries] = useState('')
  const [repetitions, setRepetitions] = useState('')

  const [exerciseImage, setExerciseImage] = useState('')
  const [selectMuscularGroups, setSelectMuscularGroups] = useState<Teste[]>([])
  const [newMuscularGroup, setNewMuscularGroup] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  
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

  async function handleNewExercise() {
    if (!exerciseImage || !name.trim() || !muscularGroup.trim() || !series.trim() || !repetitions.trim()) {
      return toast.show({
        title: 'Informe todos os dados',
        placement: 'top',
        bg: 'red.500'
      })
    }

    await createExercise({
      image: exerciseImage,
      name,
      muscularGroup,
      series,
      repetitions
    })

    toast.show({
      title: 'Exercicio criado com sucesso!',
      placement: 'top',
      bg: 'green.500'
    })

    setExerciseImage('')
    setName('')
    setMuscularGroup('')
    setSeries('')
    setRepetitions('')
  }

  async function handleCreateGroup() {
    if (!newMuscularGroup.trim()) {
      return toast.show({
        title: 'Informe todos os dados',
        placement: 'top',
        bg: 'red.500'
      })
    }    

    await createGroup(newMuscularGroup)

    toast.show({
      title: 'Grupo criado com sucesso. Atualize a página',
      placement: 'top',
      bg: 'green.500'
    })

    setModalIsOpen(false)
  }

  useFocusEffect(useCallback(() => {
    async function fetchGroups() {
      const data = await listGroups()

      setSelectMuscularGroups(data?.map(group => (
        {
          label: group.title,
          value: group.title
        }
      ))!)
    }

    fetchGroups()
  }, []))

  return (
    <VStack>
      <ScreenHeader title="Criar exercicio" />

      <ScrollView mb={10}>
        <VStack px={8}>
          <HStack mt={6} justifyContent="space-around" alignItems="center">
            {exerciseImage ? (
              <UserPhoto
                source={{ uri: exerciseImage }}
                alt=""
                size={32}
              />
            ) : (
              <UserPhotoSkeleton size={32} />
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
              value={name}
            />       
           
            <VStack mb={4} space={2}>
              <Select 
                bg="gray.600"
                placeholder="Grupo muscular"
                items={selectMuscularGroups}
                onValueChange={value => setMuscularGroup(value)}
                mb={0}
              />

              <TouchableOpacity onPress={() => setModalIsOpen(true)}>
                <Text 
                  color="green.500" 
                  fontWeight="bold" 
                  fontSize="xs"
                >
                  Adicionar grupo muscular
                </Text>
              </TouchableOpacity>
            </VStack>

            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} p={8}>
              <Modal.Content w="full" >
                <Modal.Body bg="gray.400" borderRadius="lg" p={5}>
                  <Input placeholder="Nome do grupo" onChangeText={setNewMuscularGroup} />
                  <Button title="Adicionar" onPress={handleCreateGroup} />
                </Modal.Body>
              </Modal.Content>
            </Modal>

            <HStack justifyContent="space-between">
              <Input
                w="49%"
                bg="gray.600"
                placeholder="Séries"
                onChangeText={setSeries}
                value={series}
              />
              <Input
                w="49%"
                bg="gray.600"
                placeholder="Repetições"
                onChangeText={setRepetitions}
                value={repetitions}
              />
            </HStack>
          </VStack>
          <Button
            title="Criar exercicio"
            onPress={handleNewExercise}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}