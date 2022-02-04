import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // async function handleSigninWithAnonymously() {
  //   const { user } = await auth().signInAnonymously();
  //   console.log(user);
  // };
  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Conta criada com sucess!'))
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Conta já existente');
        };
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('E-mail inválido');
        };
        if (error.code === 'auth/invalid-password') {
          return Alert.alert('Sua senha deve ter ao menos 6 digitos!');
        };
      });
  };
  function handleSIgnInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => {
        console.log(error.code);
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
          Alert.alert('Usuário não encontrado. Senha e/ou e-mail inválido');
        };
      })
  };
  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize='none'
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSIgnInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => { }} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}