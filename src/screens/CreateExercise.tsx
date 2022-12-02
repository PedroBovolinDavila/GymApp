import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as yup from 'yup'

import * as ImagePicker from 'expo-image-picker';

import { HStack, Modal, ScrollView, Text, useToast, VStack } from "native-base";

import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhotoSkeleton } from "@components/skeletons/UserPhotoSkeleton";

import { listGroups } from "@storage/groups/listGroups";
import { createGroup } from "@storage/groups/createGroup";
import { createExercise } from "@storage/exercises/createExercise";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type MuscularGroup = {
  label: string
  value: string
}

const createExerciseFormSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  muscularGroup: yup.string().required('Informe o grupo muscular'),
  series: yup.string().required('Informe quantas séries'),
  repetitions: yup.string().required('Informe quantas repetições'),
})

type CreateExerciseFormInputs = yup.InferType<typeof createExerciseFormSchema>

export function CreateExercise() {
  const [exerciseImage, setExerciseImage] = useState('')
  const [selectMuscularGroups, setSelectMuscularGroups] = useState<MuscularGroup[]>([])
  const [newMuscularGroup, setNewMuscularGroup] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateExerciseFormInputs>({
    resolver: yupResolver(createExerciseFormSchema)
  })

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

  async function handleNewExercise({
    muscularGroup,
    name,
    repetitions,
    series
  }: CreateExerciseFormInputs) {
    if (!exerciseImage) {
      return toast.show({
        title: 'Escolha uma imagem para o exercicio',
        placement: 'top',
        bg: 'red.500'
      })
    }

    const result = await createExercise({
      image: exerciseImage,
      name,
      muscularGroup,
      series,
      repetitions
    })

    if (result instanceof Error) {
      return toast.show({
        title: 'Exercicio já existe',
        placement: 'top',
        bg: 'red.500'
      })
    }    

    reset()
    setExerciseImage('')

    toast.show({
      title: 'Exercicio criado com sucesso!',
      placement: 'top',
      bg: 'green.500'
    })

  }

  async function handleCreateGroup() {
    if (!newMuscularGroup.trim()) {
      return toast.show({
        title: 'Informe todos os dados',
        placement: 'top',
        bg: 'red.500'
      })
    }    

    const result = await createGroup(newMuscularGroup)

    if (result instanceof Error) {
      return toast.show({
        title: 'Este grupo já existe',
        placement: 'top',
        bg: 'red.500'
      }) 
    }

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
    <VStack flex={1}>
      <ScreenHeader title="Criar exercicio" />

      <ScrollView>
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
          <VStack my={6}>
            <Controller 
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  bg="gray.600"
                  placeholder="Nome"
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                  value={value}
                />
              )}
            />    
           
            <VStack mb={4} space={2}>
              <Controller 
                control={control}
                name="muscularGroup"
                render={({ field: { onChange } }) => (
                  <Select 
                    bg="gray.600"
                    placeholder="Grupo muscular"
                    items={selectMuscularGroups}
                    onValueChange={onChange}
                    mb={0}
                    errorMessage={errors.muscularGroup?.message}
                  />
                )}
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

            <Controller 
              control={control}
              name="series"
              render={({ field: { onChange, value } }) => (
                <Input
                  bg="gray.600"
                  placeholder="Séries"
                  onChangeText={onChange}
                  errorMessage={errors.series?.message}
                  value={value}
                />
              )}
            />

            <Controller 
              control={control}
              name="repetitions"
              render={({ field: { onChange, value } }) => (
                <Input
                  bg="gray.600"
                  placeholder="Repetições"
                  onChangeText={onChange}
                  errorMessage={errors.repetitions?.message}
                  value={value}
                />
              )}
            />  
          </VStack>
          
          <Button
            title="Criar exercicio"
            onPress={handleSubmit(handleNewExercise)}
            mb={16}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}