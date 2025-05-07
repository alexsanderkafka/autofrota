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

interface Props{
    navigation: any;
    route: any;
}


function DriverCard({ name, email, image }: any){
    return(
        <View style={styles.row}>
            <Image
            source={image}
            style={styles.driverImage}
            />

            <View>
                <Text style={styles.driverName}>{name}</Text>
                <Text style={styles.driverEmail}>{email}</Text>
            </View>             
        </View>
    )
}

export default function Profile({ navigation, route }: Props){
    const businessImage = require('../../../assets/business.jpg');

    const company = route.params;

    const email: string = company.email;
    const name: string = company.name;
    const cnpj: string = company.cnpj;
    const cpf: string | null | undefined = company.cpf;
    const zipCode: string = company.zipCode;
    const address: string = company.address;
    const phone: string = company.phone;
    const profileImage: string = company.profileImage;

    const { drivers } = useDrivers();

    console.log("Drivers: ", drivers);

    return(
        <ScrollView>
            <View style={styles.body}>
                
                <View style={styles.identificationContainer}>
                    <View style={{ position: 'relative'}}>
                        <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.galleryButton}>
                            <Icon name="image-edit" size={24} color={colors.icon.mainBlue}/>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.businessName}>{name}</Text>
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
                            <Text>{name}</Text>
                        </View>

                        <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                        <View style={styles.row}>
                            <Icon name="fingerprint" size={24} color={colors.icon.mainBlue} />
                            <Text>{cpf ? cpf : cnpj}</Text>
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

                <View style={styles.sectionContainer}>
                    <View style={styles.rowTitle}>
                        <Text style={styles.titles}>Motoristas</Text>

                        <TouchableOpacity>
                            <Icon name="plus" size={24} color={colors.icon.mainBlue}/>
                        </TouchableOpacity>
                    </View>

                    <FlatList 
                        data={ drivers }
                        keyExtractor={(item, index) => index.toString()}
                        style={[styles.driversCard]}
                        renderItem={({ item }) => (
                            <DriverCard 
                                name={item.name}
                                email={item.email}
                                image={businessImage}
                            />
                        )}
                        ItemSeparatorComponent={() => <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>}
                    />
                </View>

            </View>
        </ScrollView>
    )
}