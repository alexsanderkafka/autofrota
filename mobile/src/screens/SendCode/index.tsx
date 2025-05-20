import React, { useEffect, useState, useRef} from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import styles from './style';
import ActionButton from '../../components/ActionButton';
import sendCode, { confirmCode } from '../../service/resetPassword';
import Storage from '../../service/storage';
import ResetPassword from '../../types/resetPassword';

interface Props{
    navigation: any;
    route: any;
}

export default function SendCode({navigation, route}:Props){

    //company
    const [companyId, setCompany] = useState<string>("");
    const [tokenJwt, setTokenJwt] = useState<string>("");

    const [fisrtCode, setFisrtCode] = useState<string>('');
    const [secondCode, setSecondCode] = useState<string>('');
    const [thirdCode, setThirdCode] = useState<string>('');
    const [fourthCode, setFourthCode] = useState<string>('');
    const [fifthCode, setFifthCode] = useState<string>('');

    const [timer, setTimer] = useState(60);

    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);
    const fourthInputRef = useRef(null);
    const fifthInputRef = useRef(null);

    var resetPasword: ResetPassword = route.params;

    useEffect(() => {
        async function getInStorage(){
            const currentStorage: Storage = await Storage.getInstance();

            setCompany(currentStorage!.companyExternalId!);
            setTokenJwt(currentStorage!.tokenJwt!);
        }
                
        getInStorage();
    }, [])

    useEffect(() => {
        requestCode();
    }, [companyId, tokenJwt]);

    useEffect(() => {
        //Enviar o códido
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    async function requestCode(){
        const response: number = await sendCode(companyId, tokenJwt);

        //Retornar algum error caso tenha
    }

    function goToLogin(){
        //Fazer o logout
        navigation.navigate('Login');
    }

    function handleResendCode(){
        //lógica para mandar o código para e-mail
        requestCode();
        setTimer(60);
        console.log('Código reenviado!');
    };

    async function requestConfirmCode(){

        const currentCode: string = `${fisrtCode}${secondCode}${thirdCode}${fourthCode}${fifthCode}`

        console.log("Caiu em request")

        try {
            const currentReset: ResetPassword = {
                newPassword: resetPasword.newPassword,
                confirmNewPassword: resetPasword.confirmNewPassword,
                code: currentCode,
            }    


            const response: number = await confirmCode(companyId, tokenJwt, currentReset);

            if(response === 204) goToLogin();

        } catch (error: any) {
            console.log("Error: ", error.message);
        }

        //Se ocorrer algum error
    }

    return(
        <View style={styles.container}>

            <View style={styles.fieldsContainer}>
                <TextInput
                style={styles.inputs}
                placeholder='0'
                value={fisrtCode}
                onChangeText={(text) => setFisrtCode(text)}
                maxLength={1}
                />

                <TextInput
                style={styles.inputs}
                placeholder='0'
                value={secondCode}  
                onChangeText={(text) => setSecondCode(text)}
                maxLength={1}
                />

                <TextInput
                style={styles.inputs}
                placeholder='0'
                value={thirdCode}
                onChangeText={(text) => setThirdCode(text)}
                maxLength={1}
                />

                <TextInput
                style={styles.inputs}
                placeholder='0'
                value={fourthCode}
                onChangeText={(text) => setFourthCode(text)}
                maxLength={1}
                />

                <TextInput
                style={styles.inputs}
                placeholder='0'
                value={fifthCode}
                onChangeText={(text) => setFifthCode(text)}
                maxLength={1}
                />
            </View>

            {timer > 0 ? (
                <Text style={styles.timerText}>
                    Você pode reenviar o código em <Text style={styles.timer}>{timer}s</Text>
                </Text>
                ) : (
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={[styles.timerText, styles.resendText]}>Reenviar código</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity 
            onPress={requestConfirmCode}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Verificar</Text>
            </TouchableOpacity>
        </View>
    );

}