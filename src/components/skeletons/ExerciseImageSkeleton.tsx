import { Skeleton } from "native-base";

export function ExerciseImageSkeleton() {
  return (
    <Skeleton 
      w="full"
      h={80}
      mb={3}
      rounded="md"
      startColor="gray.500"
      endColor="gray.400"
    />
  )
}