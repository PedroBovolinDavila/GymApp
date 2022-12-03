import { 
  Input as NativeBaseInput, 
  IInputProps as NativeBaseInputProps ,
  FormControl,
  WarningOutlineIcon
} from "native-base"

type InputProps = NativeBaseInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, ...rest }: InputProps){
  const isInvalid = !!errorMessage

  return (
    <FormControl isInvalid={isInvalid} mb={4}>
      <NativeBaseInput 
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={isInvalid}

        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500"
        }}
  
        {...rest}
      />

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}