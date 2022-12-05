import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center>
      <Spinner color="white" size={24} />
    </Center>
  )
}