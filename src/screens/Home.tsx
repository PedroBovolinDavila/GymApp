import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { Center, FlatList, Heading, HStack, Icon, IconButton, Modal, Pressable, Text, useSafeArea, useToast, VStack } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { GroupSkeleton } from "@components/skeletons/GroupSkeleton";
import { ExerciseCardSkeleton } from "@components/skeletons/ExerciseCardSkeleton";

import { Exercise } from "@storage/types/exercise";
import { listGroups } from "@storage/groups/listGroups";
import { listExercises } from "@storage/exercises/listExercises";
import { filterExerciseByGroup } from "@storage/exercises/filterExerciseByGroup";
import { removeExercise } from "@storage/exercises/removeExercise";

type ModalProps = {
  isOpen: boolean
  exerciseId: string
}

export function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [groups, setGroups] = useState<string[]>([]) 
  const [groupSelected, setGroupSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalData, setModalData] = useState<ModalProps>({
    isOpen: false,
    exerciseId: ''
  })

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  function handleOpenNewExercise() {
    navigation.navigate('createExercise')
  }
  
  function handleOpenModal(exerciseId: string) {
    setModalData({
      isOpen: true,
      exerciseId
    })    
  }

  async function handleSelectGroup(group: string) {
    setGroupSelected(group)

    const exercises = await filterExerciseByGroup(group)

    setExercises(exercises!)
  }

  async function handleDeleteExercise() {
    const result = await removeExercise(modalData.exerciseId)
    
    if (result instanceof Error) {
      return toast.show({
        title: result.message,
        bg: 'red.500',
        placement: 'top'
      })
    }

    setExercises(result)
    setModalData({ isOpen: false, exerciseId: '' })

    toast.show({
      title: 'Exercicio removido com sucesso',
      bg: 'green.500',
      placement: 'top'
    })
  }

  useFocusEffect(useCallback(() => {
    setIsLoading(true)

    async function fetchData() {
      const exercises = await listExercises()   
      const groups = await listGroups()   
      
      setGroups(groups?.map(group => group.title)!)
      setExercises(exercises!)
      setGroupSelected('')
      setIsLoading(false)
    }

    fetchData()
  }, []))
  
  return (
    <VStack flex={1}>
      <HomeHeader />

      {isLoading ? (
        <HStack my={10} px={8}>
          <GroupSkeleton />
          <GroupSkeleton />
          <GroupSkeleton />
          <GroupSkeleton />
        </HStack>
      ) : (
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          horizontal
    
          renderItem={({ item }) => (
            <Group 
              name={item} 
              isActive={groupSelected.toUpperCase() === item.toUpperCase()} 
              onPress={() => handleSelectGroup(item)}
            />
          )}

          my={10}
          maxH={10}
          _contentContainerStyle={{
            px: 8
          }}
        />
      )}

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">Exercicios</Heading>

          <TouchableOpacity onPress={handleOpenNewExercise}>
            <HStack alignItems="center" space={1.5}>
              <Icon 
                as={AntDesign}
                name="pluscircleo"
                size="xs"
                color="gray.200"
              />

              <Text color="gray.200" fontSize="sm">
                {exercises.length}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack> 

        {isLoading ? (
          <VStack>
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
            <ExerciseCardSkeleton />
          </VStack>
        ) :
          <FlatList 
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (       
              <ExerciseCard 
                exercise={item} 
                onPress={() => handleOpenExerciseDetails(item.id)} 
                onLongPress={() => handleOpenModal(item.id)}
                withIcon 
              /> 
            )}

            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 10,
              ...(exercises.length === 0 && {
                flex: 1,
                justifyContent: 'center'
              })
            }}

            ListEmptyComponent={() => (
              <Center>
                <Text color="gray.100" textAlign="center">
                  Você não possui nenhum exercicio cadastrado.
                </Text>

                <Pressable mt={4} onPress={handleOpenNewExercise}>
                  <Text color="green.500" textAlign="center">
                    Clique aqui e cadastre agora mesmo
                  </Text>
                </Pressable>
              </Center>
            )}
          />
        }

        <Modal isOpen={modalData.isOpen} onClose={() => setModalData(modal => ({ ...modal, isOpen: false }))}>
          <Modal.Content>
            <Modal.Body 
              bg="gray.400" 
              borderColor="green.500" 
              borderWidth={1} 
              borderRadius="lg" 
              alignItems="center"
            >
              <IconButton
                icon={<Icon as={FontAwesome} name="trash-o" />}
                _icon={{
                  color: 'gray.100',
                  size: "3xl",
                }}
                _pressed={{
                  bg: 'gray.400',
                  _icon: {
                    color: 'red.500'
                  }
                }}
                onPress={handleDeleteExercise}
              />

              <Text color="gray.100" fontSize="sm">
                Excluir exercicio
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </VStack>
    </VStack>
  )
}