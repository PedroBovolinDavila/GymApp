import { Skeleton } from "native-base";

export function ExerciseCardSkeleton() {
  return (
    <Skeleton
      startColor="gray.500"
      endColor="gray.400"
      rounded="md"
      mb={3}
      h={20}
    />
  )
}