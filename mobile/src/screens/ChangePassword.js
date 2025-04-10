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
import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChangePassword({ navigation }) {

    const [password, setPassword] = useState('');
    const [eyeButtonPassword, setEyeButtonPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [eyeButtonConfirmPassword, setEyeButtonConfirmPassword] = useState(false);

    return(
        <View style={styles.body}>

            <Image source={require('../../assets/logo/image.jpg')} style={styles.logoImage}/>

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


            <TouchableOpacity style={styles.btn} onPress={() => {}}>
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
            


        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    title:{
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 15,
        textAlign: 'center'
    },
    descriptions:{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 48
    },
    logoImage:{
        width: 169,
        height: 78,
        marginBottom: 10,
        marginTop: 20,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        fontSize: 18,
        color: '#000',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.border.main,
        marginBottom: 15,
        paddingVertical: 11,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    inputs:{
        padding: 0,
        marginLeft: 5,
        fontSize: 15,
        flex: 1,
    },
    eyeBtn:{
        marginLeft: 10,
    },
    btn:{
        width: "100%",
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 38,
    },
    btnText:{
        fontSize: 16,
        color: colors.text.white,
    },
});