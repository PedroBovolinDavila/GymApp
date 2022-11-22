import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import backgroundImg from '@assets/background.png'

import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type SignUpFormInputs = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export function SignUp() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignUpFormInputs>()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function SignUp({ name, email, password, passwordConfirm }: SignUpFormInputs) {
    console.log(name, email, password, passwordConfirm);
  }

  return (
    <ScrollView  
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={7}>
        <Image 
          source={backgroundImg}
          defaultSource={backgroundImg}
          alt="Pessoas treinando em uma bicicleta elétrica"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller 
            control={control}
            name="name"
            rules={{
              required: 'Informe o nome.'
            }}
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder="Nome" 
                autoCapitalize="words"
                onChangeText={onChange} 
                value={value}
              />
            )}
          />

          {errors.name && (
            <Text color="white">
              {errors.name.message}       
            </Text>
          )}

          <Controller 
            control={control}
            name="email"
            rules={{
              required: 'Informe um e-mail.',
              pattern: {
                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido'
              }
            }}
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {errors.email && (
            <Text color="white">
              {errors.email.message}
            </Text>
          )}

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder="Senha" 
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller 
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder="Confirme a senha" 
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(SignUp)}
                returnKeyType="send"
              />
            )}
          />  

          <Button title="Criar e acessar" onPress={handleSubmit(SignUp)} />
        </Center>

        <Button 
          mt={24} 
          title="Voltar para o login"
          variant="outline" 
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}