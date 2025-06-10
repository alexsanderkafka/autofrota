import React, { useState, useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar, 
  Image,
  Pressable
} from 'react-native';

import { colors } from '../../theme';

import styles from './style';

import { login as loginService } from '../../service/loginService';
import Notify from '../../components/Notify';

interface Props {
  navigation: any;
}

export default function Login({ navigation }: Props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [eyeButton, setEyeButton] = useState(false);

  //Error alert
  const [error, setError] = useState<any>({});

  useEffect(() => {

    async function searchToken(){
      try {
        const value: any = await AsyncStorage.getItem('tokenJwt');
        setToken(value);
      } catch (error) {
        console.log("AsyncStorage error: " + error);
      }
    }

    searchToken();

  }, []);

  useEffect( () => {
    if(token !== null && token !== ""){

      let verifyResponse = verifyToken(token);

      if(verifyResponse) navigation.navigate('BottomNavigation');
    }
  }, [token]);

  useEffect(() => {
    console.log("Error: ", error);

    if (error.error) {
        setTimeout(() => {
        setError({});
      }, 2000);
    }
  }, [error]);

  function verifyToken(tokenJwt: string){
    let decoded: any = jwtDecode(tokenJwt);

    const now = new Date();
    const expDate = new Date(decoded.exp * 1000);

    if(now < expDate){
      return true;
    }

    return false;
  }

  function toggleEyeButton(){
    setEyeButton(!eyeButton);
  }
  

  async function login(){
    let resultVerify = verifyFields();

    if(resultVerify){

      console.log("Verificado com sucesso");

      try{

        console.log("Email: " + email);
        console.log("Senha: " + password);

        let response = await loginService(email, password);

        console.log("Response: ", response);

        if(response === 200){ 
          navigation.navigate('BottomNavigation');
        }


      }catch(error: any){  
        console.log(error)
        let currentStatus = error.response.status; 
        console.log(currentStatus);

        if(currentStatus === 401){
          console.log("Email ou senha inválido");
          setError({error: "Email ou senha inválido"});
          
        }else if(currentStatus === 404){
          setError({error: "Email não encontrado"});
          console.log("Email não encontrado");
        }else if(currentStatus === 403){
          setError({error: "Sua conta está inativa, entre em contato com o suporte"});
          console.log("Sua conta está inativa");
        }
      }
    }
  }

  function verifyFields(){

    let newErrors: any = {};

    if(email === "") newErrors.error = "E-mail em branco";
    if(password === "") newErrors.error = "Senha em branco";

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function forgetPassword(){
    console.log("Esqueceu a senha");
  }

  function createAccount(){
    console.log("Não tem conta");
  }
  

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.containerFields}>
          <Image source={require('../../assets/images/logo/image.jpg')} style={styles.logoImage}/>

          <Text style={styles.welcomeTitle}>Bem-vindo</Text>
          <Text style={styles.welcomeDescription}>Faça o login para continuar</Text>

          <View style={styles.inputContainer} >

            <Icon name="email" size={24} color={colors.icon.main}/>
            <TextInput
            style={styles.inputs}
            placeholder='E-mail'
            value={email}
            onChangeText={ (text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputContainer} >
            <Icon name="lock" size={24} color={colors.icon.main}/>
            <TextInput
            style={styles.inputs}
            placeholder='Password'
            secureTextEntry={eyeButton ? false : true}
            value={password}
            onChangeText={ (text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={toggleEyeButton}>
              {
                !eyeButton ? (
                  <Icon name="eye" size={24} color={colors.icon.main}/>
                ) :
                (
                  <Icon name="eye-off" size={24} color={colors.icon.main}/>
                )
              }
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={login}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <Text onPress={createAccount} style={styles.textCreateAccount}>Não tem uma conta? <Text style={{ color: colors.text.other, fontStyle: 'italic' }}>Cadastre-se</Text></Text>
        </View>

        {
          error.error && (
            <Notify
              text={error.error}
              isError={true}
            />
          )
        }
    </SafeAreaView>
  );
}