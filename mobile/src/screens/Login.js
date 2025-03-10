import React, { useState, useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import api from '../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState('');
  const [token, setToken] = useState('');
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {

    async function searchToken(){
      try {
        const value = await AsyncStorage.getItem('tokenJwt');
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

  function verifyToken(tokenJwt){
    let decoded = jwtDecode(tokenJwt);

    const now = new Date();
    const expDate = new Date(decoded.exp * 1000);

    if(now < expDate){
      return true;
    }

    return false;
  }

  async function login(){
    let resultVerify = verifyFields();

    if(resultVerify){
      try{
        let response = await api.post('/auth/signin', {
          email: email,
          password: password
        });

        if(response.status === 200){        
          let tokenJwt = response.data.accessToken;
          let id = String(response.data.id);
        
          AsyncStorage.setItem("tokenJwt", tokenJwt);
          AsyncStorage.setItem('businessId', id)

          navigation.navigate('BottomNavigation');
        }
      }catch(error){  
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

  return (
    <View style={styles.container}>

        <Text style={styles.textLogin}>Auto Frota</Text>

        <TextInput
        style={styles.inputs}
        placeholder='E-mail'
        value={email}
        onChangeText={ (text) => setEmail(text)}
        />

        <TextInput
        style={styles.inputs}
        placeholder='Password'
        secureTextEntry={true}
        value={password}
        onChangeText={ (text) => setPassword(text)}
        />

        <Text style={styles.textForgerPassword}>Esqueceu a senha? Clique aqui</Text>

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        {
          showAlert && (
            <Animatable.View 
            style={[styles.alert, {opacity: animatedOpacity}]}
            >
              <Text style={styles.textAlert}>{textAlert}</Text>
            </Animatable.View>
            
          )
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  textLogin:{
    fontSize: 35,
    marginBottom: 35,
    color: '#176585',
    fontWeight: 'bold'
  },
  inputs:{
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000',
    borderWidth: 2,
    marginBottom: 25,
    borderRadius: 5,
    borderColor: '#176585'
  },
  textForgerPassword:{
    color: '#176585',
    fontStyle: 'italic'
  },
  btn:{
    width: "100%",
    backgroundColor: "#176585",
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText:{
    fontSize: 16,
    color: '#FFF'
  },
  alert:{
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAlert:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});
