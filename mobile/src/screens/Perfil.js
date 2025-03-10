import React, { useEffect, useState } from 'react';
import Icon from 'react-native-ico-material-design';
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

export default function Perfil() {

    const [businessId, setBusinessId] = useState();
    const [token, setToken] = useState("");
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(true);
    const [dateCreated, setDateCreated] = useState("");
    const [cnpjFormatter, setCnpj] = useState("");

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
                <ScrollView>
                    <Text style={styles.businessName}>{business.name.toUpperCase()}</Text>

                    <View style={styles.containerBusinessData}>
                        <View style={styles.informations}>
                            <View style={styles.containerIcon}>
                                <Icon
                                name="write-email-envelope-button"
                                height="20"
                                width="20"
                                color="#176585"
                                style={styles.icon}
                                />
                                <Text style={styles.textIcon}>{business.email}</Text>
                            </View>

                            <View style={styles.containerIcon}>
                                <Icon
                                name="phone-call-button"
                                height="20"
                                width="20"
                                color="#176585"
                                style={styles.icon}
                                />
                                <Text style={styles.textIcon}>{business.phone}</Text>
                            </View>

                            <View style={styles.containerIcon}>
                                <Icon
                                name="history-clock-button"
                                height="20"
                                width="20"
                                color="#176585"
                                style={styles.icon}
                                />
                                <Text style={styles.textIcon}>{new Date(business.created).toLocaleDateString('pt-BR')}</Text>
                            </View>

                            <View style={styles.containerIcon}>
                                <Icon
                                name="front-store"
                                height="20"
                                width="20"
                                color="#176585"
                                style={styles.icon}
                                />
                                <Text style={styles.textIcon}>{business.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1 $2 $3/$4-$5")}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btnIcon}>
                            <Icon
                            name="right-arrow-forward"
                            height="20"
                            width="20"
                            color="#176585"
                            style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btnPdf}>
                        <Image
                        source={require('../../assets/icons/pdf.png')}
                        style={styles.iconPdf}
                        />

                        <Text style={styles.textBtnPdf}>Gere o relatório de todos os gastos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnPdf}>
                        <Image
                        source={require('../../assets/icons/envio.png')}
                        style={styles.iconPdf}
                        />

                        <Text style={styles.textBtnPdf}>Gere o gráfico de gastos</Text>
                    </TouchableOpacity>
                </ScrollView>

                <Text style={styles.textCopy}>© 2024 AutoFrota - Privacidade e Termos</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 8,
      paddingVertical: 20,
      backgroundColor: '#FFF'
    },
    businessName:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerIcon:{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    textIcon:{
        fontSize: 16,
        marginLeft: 10
    },
    informations:{
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    containerBusinessData:{
        display: 'flex',
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    btnIcon:{
        marginRight: 20
    },
    btnPdf:{
        width: "100%",
        height: "auto",
        //borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    iconPdf:{
        width: 100,
        height: 100
    },
    textBtnPdf:{
        fontSize: 20,
        maxWidth: '70%',
        marginLeft: 10,
        textAlign: 'center'
    },
    textCopy:{
        position: 'absolute',
        textAlign: 'center',
        fontStyle: 'italic',
        bottom: 10,
        width: '100%',
    }

});