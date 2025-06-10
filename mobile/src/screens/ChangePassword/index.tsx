import React, { useState, useEffect, useRef} from 'react';

import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Image
} from 'react-native';
import { colors } from '../../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import ResetPassword from '../../types/resetPassword';

interface Props{
    navigation: any;
    route: any;
}

export default function ChangePassword({ navigation }: Props) {

    const [password, setPassword] = useState<string>('');
    const [eyeButtonPassword, setEyeButtonPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [eyeButtonConfirmPassword, setEyeButtonConfirmPassword] = useState(false);

    const [errorsForm, setErrorsForm] = useState<any>({})

    function validateFields(): boolean{
      let newErrors: any = {};

      if(password === '' || password === null) newErrors.password = "Você precisa digitar uma nova senha.";
      if(confirmPassword === '' || confirmPassword === null) newErrors.password = "Você precisa confirmar uma nova senha.";

      setErrorsForm(newErrors);

      return Object.keys(newErrors).length === 0;
    }

    function goToSendCode(){

      const verify: boolean = validateFields();

      if(!verify) return;

      const resetPassword: ResetPassword = {
        newPassword: password,
        confirmNewPassword: confirmPassword,
        code: null
      }

      navigation.navigate('SendCode', resetPassword);
    }

    return(
        <View style={styles.body}>

            <Image source={require('../../assets/images/logo/image.jpg')} style={styles.logoImage}/>

            <Text style={styles.title}>Altere sua senha</Text>

            <Text style={styles.descriptions}>Crie uma senha longa e complexa, use números e símbolos, letras maiúsculas e minúsculas.</Text>
            
            <View style={styles.inputContainer} >
                <Icon name="lock" size={24} color={colors.icon.main}/>
                <TextInput
                style={styles.inputs}
                placeholder='Nova senha'
                secureTextEntry={eyeButtonPassword ? false : true}
                value={password}
                onChangeText={ (text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.eyeBtn} onPress={() => setEyeButtonPassword(!eyeButtonPassword)}>
                        {
                          !eyeButtonPassword ? (
                            <Icon name="eye" size={24} color={colors.icon.main}/>
                          ) :
                          (
                            <Icon name="eye-off" size={24} color={colors.icon.main}/>
                          )
                        }
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer} >
                <Icon name="lock" size={24} color={colors.icon.main}/>
                <TextInput
                style={styles.inputs}
                placeholder='Confirme a nova senha'
                secureTextEntry={eyeButtonConfirmPassword ? false : true}
                value={confirmPassword}
                onChangeText={ (text) => setConfirmPassword(text)}
                />
                <TouchableOpacity style={styles.eyeBtn} onPress={() => setEyeButtonConfirmPassword(!eyeButtonConfirmPassword)}>
                        {
                          !eyeButtonConfirmPassword ? (
                            <Icon name="eye" size={24} color={colors.icon.main}/>
                          ) :
                          (
                            <Icon name="eye-off" size={24} color={colors.icon.main}/>
                          )
                        }
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btn} onPress={goToSendCode}>
                <Text style={styles.btnText}>Trocar senha</Text>
            </TouchableOpacity>
        </View>
    );
}

