import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';

import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';

import { colors } from '../theme';
import SwitchButton from '../components/SwitchButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Settings() {

    const [businessId, setBusinessId] = useState();
    const [token, setToken] = useState("");
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(true);
    const [dateCreated, setDateCreated] = useState("");
    const [cnpjFormatter, setCnpj] = useState("");

    const businessImage = require('../../assets/business.jpg');

    useEffect(() => {
        async function getInStorage(){
            try {
              const jwt = await AsyncStorage.getItem('tokenJwt');
              const id = await AsyncStorage.getItem('businessId');
              
              setToken(jwt);
              setBusinessId(id);
              //setLoading(false);
  
            } catch (error) {
                console.log("AsyncStorage error todos: " + error);
            }
          }
          getInStorage();
    }, []);

    useEffect( () => {
        if(token !== null && token !== ""){
            getBusinessInformation();
        }
    }, [businessId, token]);

    async function getBusinessInformation(){
        try {

            console.log("Get: " + token);

            let response = await api.get(`/business/${businessId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            setBusiness(response.data);
            setLoading(false);

        } catch (error) {
            setLoading(true);
            console.log("Error: " + error);
        }
    }

    if(loading){
        return(
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <ActivityIndicator 
              color="#176585"
              size={45}
              />
            </View>
        );
    }else{
        return (
            <SafeAreaView style={styles.container}>
               <TouchableOpacity style={styles.profileButtonButton}>
                    <Image
                    source={businessImage}
                    style={styles.profileImage}
                    />

                    <View>
                        <Text style={styles.businessName}>{business.name}</Text>
                        <Text style={styles.email}>{business.email}</Text>
                    </View>
               </TouchableOpacity>

               <View style={styles.notificationContainer}>
                    <Text style={styles.titles}>Notificações</Text>

                    <View style={styles.actionBox}>
                        
                        <View style={styles.notificationAction}>
                            <Text style={styles.textAction}>Alerta de Manutenção</Text>
                            <SwitchButton />
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.notificationAction}>
                            <Text style={styles.textAction}>Alerta de abastecimento</Text>
                            <SwitchButton />
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.notificationAction}>
                            <Text style={styles.textAction}>Alerta via e-mail</Text>
                            <SwitchButton />
                        </View>

                    </View>
               </View>

               <View style={styles.securityContainer}>
                    <Text style={styles.titles}>Segurança</Text>

                    <TouchableOpacity style={styles.actionBox}>
                        <View style={styles.securityAction}>
                            <View style={styles.iconGroup}>
                                <Icon name="lock" size={24} color={colors.icon.mainBlue}/>
                                <Text style={styles.textAction}>Trocar de senha</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color={colors.icon.mainBlue}/>
                        </View>
                    </TouchableOpacity>                
               </View>

               <View style={styles.apearanceContainer}>
                    <Text style={styles.titles}>Aparência</Text>

                    <View style={styles.actionBox}>
                        <View style={styles.notificationAction}>
                            <Text style={styles.textAction}>Alerta de Manutenção</Text>
                            <SwitchButton />
                        </View>
                    </View>
               </View>

               <TouchableOpacity style={styles.exitButton}>
                    <Text style={{ color: colors.text.white, fontSize: 16 }}>Sair</Text>
               </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: '#FFF'
    },
    profileButtonButton:{
        width: '100%',
        height: 'auto',
        backgroundColor: colors.primary.white,
        elevation: 2,
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    profileImage:{
        width: 48,
        height: 48,
        borderRadius: 5,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    businessName:{
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    email:{
        fontSize: 10,
        color: colors.text.primary,
    },
    notificationContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 26,
    },
    titles:{
        fontSize: 16,
        marginBottom: 15,
    },
    actionBox:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        display: 'flex',
        elevation: 2,
        padding: 10,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
    },
    notificationAction:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAction:{
        fontSize: 13
    },
    securityContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 26,  
    },
    securityAction:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',   
    },
    iconGroup:{
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    apearanceContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 26,  
    },
    exitButton:{
        width: "100%",
        backgroundColor: "#FF4444",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 38,
        marginTop: 40,
        marginBottom: 30,
    }
});