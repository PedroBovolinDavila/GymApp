import { Skeleton } from "native-base";

export function GroupSkeleton() {
  return (
    <Skeleton 
      w={24}
      h={10}
      mr={3}
      rounded="md"
      startColor="gray.500"
      endColor="gray.400"
    />
  )
}