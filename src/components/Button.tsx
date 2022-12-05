import { 
  Button as NativeBaseButton, 
  IButtonProps as NativeBaseButtonProps,
  Text
} from "native-base"
import { Loading } from "./Loading"

type ButtonProps = NativeBaseButtonProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ 
  title, 
  variant = 'solid', 
  isDisabled,
  ...rest 
}: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      rounded="sm"
      borderColor="green.500"
      bg={variant === 'outline' ? "transparent" : "green.700"}
      borderWidth={variant === 'outline' ? 1 : 0}
      isDisabled={isDisabled}

      _pressed={{
        bg: variant === 'outline' ? "gray.500" : "green.500"
      }}

      {...rest}
    >
      {isDisabled ? (
        <Loading />
      ) : (
        <Text 
          color={variant === 'outline' ? "green.500" : "white"} 
          fontFamily="heading" 
          fontSize="sm"
        >
          {title}
        </Text>
      )}
    </NativeBaseButton>
  )
}
