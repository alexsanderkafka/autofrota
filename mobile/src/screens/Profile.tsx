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
    Pressable
} from 'react-native';
import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props{
    navigation: any;
}

export default function Profile({ navigation }: Props){
    const businessImage = require('../../assets/business.jpg');

    return(
        <View style={styles.body}>
            
            <View style={styles.identificationContainer}>
                <View style={{ position: 'relative'}}>
                    <Image
                    source={businessImage}
                    style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.galleryButton}>
                        <Icon name="image-edit" size={24} color={colors.icon.mainBlue}/>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.businessName}>NOME DA EMPRESA</Text>
            </View>

            <View style={styles.sectionContainer}>
                <View style={styles.rowTitle}>
                    <Text style={styles.titles}>Informações</Text>

                    <TouchableOpacity>
                        <Icon name="pencil" size={24} color={colors.icon.mainBlue}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.informationCard}>
                    <View style={styles.row}>
                         <Icon name="domain" size={24} color={colors.icon.mainBlue} />
                         <Text>Nome da empresa</Text>
                    </View>

                    <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                    <View style={styles.row}>
                         <Icon name="fingerprint" size={24} color={colors.icon.mainBlue} />
                         <Text>00.000.000/0001-00</Text>
                    </View>

                    <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                    <View style={styles.row}>
                         <Icon name="map-marker" size={24} color={colors.icon.mainBlue} />
                         <Text>Av. Teste, 1000 - Bairro teste, São Paulo - SP</Text>
                    </View>

                    <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                    <View style={styles.row}>
                         <Icon name="phone" size={24} color={colors.icon.mainBlue} />
                         <Text>(00) 0000-0000</Text>
                    </View>

                    <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                    <View style={styles.row}>
                         <Icon name="email" size={24} color={colors.icon.mainBlue} />
                         <Text>E-mail</Text>
                    </View>

                </View>
                
            </View>

            <View style={styles.sectionContainer}>
                <View style={styles.rowTitle}>
                    <Text style={styles.titles}>Informações</Text>

                    <TouchableOpacity>
                        <Icon name="plus" size={24} color={colors.icon.mainBlue}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.informationCard}>
                    <View style={styles.row}>
                        <Image
                        source={businessImage}
                        style={styles.driverImage}
                        />

                         <View>
                            <Text style={styles.driverName}>NOME DO MOTORISA</Text>
                            <Text style={styles.driverEmail}>contato@transporterapido.com</Text>
                         </View>
                         
                    </View>

                    <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                    <View style={styles.row}>
                        <Image
                        source={businessImage}
                        style={styles.driverImage}
                        />

                         <View>
                            <Text style={styles.driverName}>NOME DO MOTORISA</Text>
                            <Text style={styles.driverEmail}>contato@transporterapido.com</Text>
                         </View>
                         
                    </View>

                    <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                    <View style={styles.row}>
                        <Image
                        source={businessImage}
                        style={styles.driverImage}
                        />

                         <View>
                            <Text style={styles.driverName}>NOME DO MOTORISA</Text>
                            <Text style={styles.driverEmail}>contato@transporterapido.com</Text>
                         </View>
                         
                    </View>

                </View>
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: colors.primary.white,
        paddingHorizontal: 15,
    },
    identificationContainer:{
        marginTop: 30,
        width: '100%',
        height: 200,
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage:{
        width: 89,
        height: 89,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    businessName:{
        fontSize: 13,   
        fontWeight: 'bold',
        marginTop: 10,
    },
    galleryButton:{
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    sectionContainer:{
        marginTop: 26,
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
    },
    rowTitle:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    titles:{
        fontSize: 16,
    },
    informationCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
        width: '100%',
        height: 'auto',
        padding: 10,
        marginTop: 15
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
    },
    driverImage:{
        width: 48,
        height: 48,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    driverName:{
        fontSize: 13,
        fontWeight: '600'
    },
    driverEmail:{
        fontSize: 10,
        color: colors.text.gray
    }
    

});