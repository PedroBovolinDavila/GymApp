import {
  Select as NativeBaseSelect,
  ISelectProps as NativeBaseSelectProps,
  FormControl,
  WarningOutlineIcon
} from 'native-base'

type SelectProps = NativeBaseSelectProps & { 
  items: {
    label: string,
    value: string
  }[],
  errorMessage?: string | null
} 

export function Select({ errorMessage = null, items, ...rest }: SelectProps) {
  const isInvalid = !!errorMessage

  return (
    <FormControl isInvalid={isInvalid}>
      <NativeBaseSelect 
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={4}
        placeholderTextColor="gray.300"

        {...rest}
      >
        {items.map(item => (
          <NativeBaseSelect.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </NativeBaseSelect>

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  ) 
}

