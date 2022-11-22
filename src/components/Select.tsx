import {
  Select as NativeBaseSelect,
  ISelectProps as NativeBaseSelectProps,
  CheckIcon
} from 'native-base'

type SelectProps = NativeBaseSelectProps & { 
  items: string[]
} 

export function Select({ items, ...rest }: SelectProps) {
  return (
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
        <NativeBaseSelect.Item label={item} value={item} key={item} />
      ))}
    </NativeBaseSelect>
  ) 
}