import { Skeleton } from "native-base";

type UserPhotoSkeletonProps = {
  size: number
}

export function UserPhotoSkeleton({ size }: UserPhotoSkeletonProps) {
  return (
    <Skeleton
      w={size}
      h={size}
      rounded="full"
      startColor="gray.500"
      endColor="gray.400"
    />
  )
}