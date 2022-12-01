import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import { Feather } from '@expo/vector-icons'

import { Box, Heading, HStack, Icon, Image, Text, useToast, VStack } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { TextSkeleton } from "@components/skeletons/TextSkeleton";
import { ExerciseImageSkeleton } from "@components/skeletons/ExerciseImageSkeleton";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { createHistory } from "@storage/history/createHistory";
import { getExerciseById } from "@storage/exercises/getExerciseById";
import { Exercise as ExerciseType } from "@storage/types/exercise";

type ExerciseParams = {
  params: {
    exerciseId: string
  }
}

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseType>()
  const [isLoading, setisLoading] = useState(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute() as ExerciseParams

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleFinishExercise() {
    await createHistory({ 
      date: new Date(), 
      exercisesIds: [exercise?.id!] 
    })

    toast.show({
      title: 'Finalizado com sucesso',
      bg: 'green.500',
      placement: 'top'
    })
  }

  useFocusEffect(useCallback(() => {
    setisLoading(true)

    async function fetchExercise() {
      const exercise = await getExerciseById(params.exerciseId)

      setExercise(exercise!)
      setisLoading(false)
    }

    fetchExercise()
  }, [params.exerciseId]))

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack 
          justifyContent="space-between" 
          mt={4} 
          mb={8} 
          alignItems="center"
        >
          {isLoading ? (
            <TextSkeleton size={40} />
          ) : (
            <Heading color="gray.100" fontSize="lg" flexShrink={1}>
              {exercise?.name}
            </Heading>
          )}

          <HStack alignItems="center">
            <BodySvg />

            {isLoading ? (
              <TextSkeleton size={20} />
            ) : (
              <Text color="gray.200" ml={1} textTransform="capitalize">
                {exercise?.muscularGroup}
              </Text>
            )}
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        {isLoading ? (
          <ExerciseImageSkeleton />
        ) : (
          <Image 
            w="full"
            h={80}
            source={{ uri: exercise?.image }}
            alt="Nome do exercicio"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />
        )}

        <Box bg="gray.600" rounded="md" pb={4} px={4}>
          <HStack 
            alignItems="center" 
            justifyContent="space-around"
            mb={6}
            mt={5}
          >
            <HStack>
              <SeriesSvg />

              {isLoading ? (
                <TextSkeleton size={20} />
              ) : (
                <Text color="gray.200" ml={2}>
                  {exercise?.series} séries
                </Text>
              )}
            </HStack>

            <HStack>
              <RepetitionsSvg />

              {isLoading ? (
                <TextSkeleton size={20} />
              ) : (
                <Text color="gray.200" ml={2}>
                  {exercise?.repetitions} repetições
                </Text>
              )}
            </HStack>
          </HStack>

          <Button title="Marcar como realizada" onPress={handleFinishExercise} />
        </Box>
      </VStack>
    </VStack>
  )
}