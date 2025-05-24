import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';

import {
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';

import { colors } from '../../theme';
import SwitchButton from '../../components/SwitchButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import useCompany from '../../hooks/useCompany';

interface Props{
    navigation: any;
}

export default function Settings({ navigation }: Props) {

    //const businessImage = require('../../../assets/business.jpg');
    const { company } = useCompany();

    function goToProfile(){
        navigation.navigate('Profile', company);
    }

    function goToResetPassowrd(){
        navigation.navigate('ChangePassword');
    }


    const companyName: string = company ? company!.name : "nome teste";
    const companyEmail: string = company ? company!.email : "email@teste.com";
    const profileImage: string = company ? company!.profileImage : "teste";

    return(
        <SafeAreaView style={styles.container}>
               <TouchableOpacity style={styles.profileButtonButton} onPress={goToProfile}>
                    <Image
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                    />

                    <View>
                        <Text style={styles.businessName}>{companyName}</Text>
                        <Text style={styles.email}>{companyEmail}</Text>
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

                    <TouchableOpacity style={styles.actionBox} onPress={goToResetPassowrd}>
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