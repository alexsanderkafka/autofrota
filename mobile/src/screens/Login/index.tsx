import React, { useState, useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import api from '../../service/api';
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

interface Props {
  navigation: any;
}

export default function Login({ navigation }: Props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState('');
  const [token, setToken] = useState('');
  const [remember, setRemember] = useState(false)

  const animatedOpacity = useRef(new Animated.Value(1)).current;

  const [eyeButton, setEyeButton] = useState(false);

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

  useEffect( () => {
    if(showAlert){
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start( () => {setShowAlert(false);});
    }else{
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 1,
        useNativeDriver: false, 
      }).start();
    }
  }, [showAlert]);

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

    console.log("Antes do 200 OK");

    if(resultVerify){

      console.log("Verificado com sucesso");

      try{

        console.log("Email: " + email);
        console.log("Senha: " + password);
        
        let response = await api.post('/auth/signin', {
          email: email,
          password: password
        });

        if(response.status === 200){ 
          console.log("Login realizado com sucesso");

          let tokenJwt = response.data.accessToken;
          let externalId = response.data.externalId;
        
          AsyncStorage.setItem("tokenJwt", tokenJwt);
          AsyncStorage.setItem('companyExternalId', externalId)

          navigation.navigate('BottomNavigation');
        }
      }catch(error: any){  
        console.log(error)
        let currentStatus = error.response.status;

        if(currentStatus === 401){
          setShowAlert(true);
          setTextAlert("Email ou senha inválido");
        }else if(currentStatus === 404){
          setShowAlert(true);
          setTextAlert("Email não encontrado");
        }
      }
    }
  }

  function verifyFields(){
    if(email === ""){
      setShowAlert(true);
      setTextAlert("Digite um e-mail válido");
      return;
    }

    if(password === ""){
      setShowAlert(true);
      setTextAlert("Senha em branco");
      return;
    }

    return true;
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

        <Image source={require('../../../assets/logo/image.jpg')} style={styles.logoImage}/>

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

        <View style={styles.containerActions}>
            <Pressable
            onPress={() => setRemember(!remember)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            >
              <View style={[styles.checkBox, { backgroundColor: remember ? colors.primary.green : colors.primary.white, borderColor: remember ? colors.primary.green : colors.border.main }]}>
                {remember && <Icon name="check" size={20} color="#FFF" />}
              </View>
              <Text>Lembrar-me</Text>
            </Pressable>
            
            <Text style={{color: colors.text.other}} onPress={forgetPassword}>Esqueceu a senha?</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>

        <Text onPress={createAccount} style={styles.textCreateAccount}>Não tem uma conta? <Text style={{ color: colors.text.other, fontStyle: 'italic' }}>Cadastre-se</Text></Text>

        {
          showAlert && (
            <Animatable.View 
            style={[styles.alert, {opacity: animatedOpacity}]}
            >
              <Text style={styles.textAlert}>{textAlert}</Text>
            </Animatable.View>
            
          )
        }
    </SafeAreaView>
  );
}