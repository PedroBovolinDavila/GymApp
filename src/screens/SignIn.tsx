import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { VStack, Image, Text, Center, Heading, ScrollView, useToast, Modal } from "native-base";

import backgroundImg from '@assets/background.png'

import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import * as LocalAuthentication from 'expo-local-authentication'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext';

export function SignIn() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [name, setName] = useState('')

  const { setIsAuthenticated } = useContext(AuthContext)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const toast = useToast()

  function handleNewAccount() {
    navigation.navigate('SignUp')
  }

  async function handleLoginWithBiometric() {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()

    if (!savedBiometrics) {
      return toast.show({
        title: 'Você não tem biometrias cadastradas',
        placement: 'top',
        bg: 'red.500'
      })
    }

    const auth = await LocalAuthentication.authenticateAsync()
   
    if (!auth.success) {
      return toast.show({
        title: 'Biometria invalida, tente novamente',
        placement: 'top',
        bg: 'red.500'
      })
    }    

    setIsAuthenticated(true)
  }

  useEffect(() => {
    async function verifyBiometrics() {
      const compatible = await LocalAuthentication.hasHardwareAsync()

      setIsBiometricSupported(compatible)
    } 

    verifyBiometrics()
  }, [])

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

          <Input 
            placeholder="E-mail" 
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input 
            placeholder="Senha" 
            secureTextEntry
          />

          <Button title="Acessar" />

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

          {isBiometricSupported && (
            <Button 
              title="Ultilizar digital" 
              variant="outline" 
              onPress={handleLoginWithBiometric}
            />
          )}
        </Center>

       
      </VStack>
    </ScrollView>
  )
}