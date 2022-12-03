import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { VStack, Image, Text, Center, Heading, ScrollView, Toast, useToast } from "native-base";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import LogoSvg from '@assets/logo.svg'
import backgroundImg from '@assets/background.png'
import { useAuth } from '@hooks/useAuth';

const signInFormSchema = yup.object({
  email: yup.string().required('Informe seu email').email('Email invalido'),
  password: yup.string().required('Informe sua senha')
})

type SignInFormInputs = yup.InferType<typeof signInFormSchema>

export function SignIn() {
  const { authenticateUser } = useAuth()

  const { 
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(signInFormSchema)
  })

  const toast = useToast()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('SignUp')
  }

  async function handleSignIn({ email, password }: SignInFormInputs) {
    const error = await authenticateUser({
      email,
      password
    })

    if (error) {
      return toast.show({
        title: error,
        bg: 'red.500',
        placement: 'top'
      })
    }
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
            Acesso sua conta
          </Heading>

          <Controller 
            control={control}
            name="email"
            render={({ field: { onChange }}) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange }}) => (
              <Input 
                placeholder="Senha" 
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />

        </Center>

        <Center mt={24}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button 
            title="Criar conta" 
            variant="outline" 
            onPress={handleNewAccount}
            mb={3}
          />

         
        </Center>

       
      </VStack>
    </ScrollView>
  )
}