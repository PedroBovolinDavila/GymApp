import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import LogoSvg from '@assets/logo.svg'
import backgroundImg from '@assets/background.png'

import { createUser } from '@storage/user/createUser';

const signUpFormSchema = yup.object({
  name: yup.string().required('Informe seu nome'),
  email: yup.string().required('Informe o email').email('Email invalido'),
  password: yup.string().required('Informe sua senha').min(6, 'A senha deve ter pelo menos 6 digitos'),
  passwordConfirm: yup.string().required('Confirme sua senha').oneOf([yup.ref('password'), null], 'As senhas não são iguais')
})

type FormDataProps = yup.InferType<typeof signUpFormSchema>

export function SignUp() {
  const { 
    control,
    handleSubmit,
    formState: {
      errors
    },
    setFocus
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpFormSchema),
    shouldFocusError: true
    
  })

  const navigation = useNavigation()

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    const result = await createUser({
      email,
      name,
      password
    })
    
    if (result instanceof Error) {
      return toast.show({
        title: result.message,
        bg: 'red.500',
        placement: 'top'
      })
    }
    toast.show({
      title: 'Criado com sucesso',
      bg: 'green.500',
      placement: 'top'
    })

    navigation.goBack()
  } 

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <VStack px={7}>
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
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading" >
            Crie sua conta
          </Heading>
              
          <Controller 
            control={control}
            name="name"
            render={({ field: { onChange, ref } }) => (
              <Input 
                placeholder="Nome" 
                onChangeText={onChange} 
                errorMessage={errors.name?.message}
                ref={ref}
                onSubmitEditing={() => setFocus('email')}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { onChange, ref } }) => (
              <Input 
                ref={ref}
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                onSubmitEditing={() => setFocus('password')}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange, ref } }) => (
              <Input 
                ref={ref}
                placeholder="Senha" 
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                onSubmitEditing={() => setFocus('passwordConfirm')}
              />
            )}
          />

          <Controller 
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, ref } }) => (
              <Input 
                ref={ref}
                placeholder="Confimar senha" 
                secureTextEntry
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.passwordConfirm?.message}
              />
            )}
          />

          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />

        </Center>

        <Button 
          my={16} 
          title="Voltar para o login"
          variant="outline" 
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}