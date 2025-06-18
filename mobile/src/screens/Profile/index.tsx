import React, { useState, useEffect, useRef} from 'react';

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
    Pressable,
    ScrollView,
    FlatList
} from 'react-native';
import { colors } from '../../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import useDrivers from '../../hooks/useDrivers';
import useCompany from '../../hooks/useCompany';

import Storage from '../../utils/storage'

interface Props{
    navigation: any;
}

export default function Profile({ navigation }: Props){

    const [loading, setloading] = useState<boolean>(true);

    const { company } = useCompany();

    const email: string = company ? company!.email : 'teste@gmail.com';
    const name: string = company ? company!.name : 'teste';
    const social: string = company ? company!.social : '00.000.000/0000-0';
    const zipCode: string = company ? company!.zipCode : '00000-000';
    const address: string = company ? company!.address : 'Rua teste';
    const phone: string = company ? company!.phone : '(00) 00000-0000';
    const profileImage: string = company ? company!.profileImage : '';

    async function logout(){
        const storage: Storage = await Storage.getInstance();
        storage.clear();
        navigation.navigate('Login');
    }

    return(
            <View style={styles.body}>

                <View style={styles.imageArea}>
                    <Image
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.titles}>Informações</Text>

                    <View style={styles.informationCard}>
                        <View style={styles.row}>
                            <Icon name="domain" size={24} color={colors.icon.mainBlue} />
                            <Text>{name}</Text>
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.row}>
                            <Icon name="fingerprint" size={24} color={colors.icon.mainBlue} />
                            <Text>{social}</Text>
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.row}>
                            <Icon name="map-marker" size={24} color={colors.icon.mainBlue} />
                            <Text>{zipCode} - {address}</Text>
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.row}>
                            <Icon name="phone" size={24} color={colors.icon.mainBlue} />
                            <Text>{phone}</Text>
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.row}>
                            <Icon name="email" size={24} color={colors.icon.mainBlue} />
                            <Text>{email}</Text>
                        </View>
                    </View>
                    
                </View>

                <TouchableOpacity style={styles.exitButton} onPress={logout}>
                    <Text style={{ color: colors.text.white, fontSize: 16 }}>Sair</Text>
               </TouchableOpacity>
            </View>
    )
}