import { Skeleton } from "native-base";

type TextSkeletonProps = {
  size: number
}

export function TextSkeleton({ size }: TextSkeletonProps) {
  return (
    <Skeleton 
      rounded="full"
      w={size}
      h={6}
      startColor="gray.500"
      endColor="gray.400"
    />
  )
}