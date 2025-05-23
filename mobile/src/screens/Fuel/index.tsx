import React, { useEffect, useState, useRef }from 'react';

import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Animated,
    Dimensions
} from 'react-native';

import { colors } from '../../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import FuelCard from '../../components/FuelCard';

import useFuel from '../../hooks/useFuel';

interface Props{
    navigation: any;
    route: any;
}

export default function Fuel({ navigation, route }: Props) {

    const [latestElement, setLatestElement] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);


    const vehicleId: number = route.params;

    const { fuel } = useFuel(vehicleId);

    console.log(fuel);

    useEffect( () => {

        if(fuel === null){
            setLoading(false);
            return;
        }

        if(fuel!.length === 0){
            setLoading(false);
            setNotFound(true);
            return;
        }

        setLoading(false);
        setNotFound(false);
    }, [fuel]);

    

    function sendToAddFuel(){
        if(loading){
            return(
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                    size="large" color={colors.primary.main} 
                    />
                </View>
            );
        }
    }

    function renderFooterFlatList(){
        if(!latestElement) return null;
        
        return(
            <View style={styles.latestElement}>
                <ActivityIndicator
                size="large" color={colors.primary.main} 
                style={{ marginTop: 20, marginBottom: 20 }}
                />
            </View>
        );
    }

    async function loadMoreFuel(){
        setLatestElement(true);
    
        /*
        console.log(totalVehicles);
    
        if(page === totalPages || totalVehicles < sizePage){
          setLatestElement(false);
          return;
        }
    
        setPage(page + 1);
    
        if(selected === 'todos'){
          await getAllVehicles();
        }else{
          await getStatusVehicles();
        }*/
    }

    function openModalAddFuel(){
        navigation.navigate('AddNewFuel', vehicleId);
    }

    function renderFuelList(){
        if(loading){
            return(
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                    size="large" color={colors.primary.main} 
                    />
                </View>
            );
        }else if(notFound){
            console.log("Bateu no else");
            const notFoundImage: any = require('../../../assets/logo/not-found-fuel.png');

            return(
                <View style={styles.notFoundContainer}>
                    <Image source={notFoundImage} style={styles.notFoundImage}/>
                    <Text style={styles.notFoundMessage}>Nenhuma abastecimento encontrado para esse veículo.</Text>
                </View>
            );
        }else{

            return(
                <FlatList
                showsVerticalScrollIndicator={false}
                data={fuel}
                keyExtractor={ item => String(item.id)}
                renderItem={ ({ item }) => <FuelCard 
                                            fuel={item}
                                            navigation={navigation}
                                            vehicleId={vehicleId}
                                            screenVehicles={false}
                                        />}
                onEndReached={() => {
                    loadMoreFuel();
                }}
                onEndReachedThreshold={1} 
                ListFooterComponent={renderFooterFlatList}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                style={styles.list}
                />
            );
        }
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.fieldSelectDate}>
                <Text style={styles.rangeDateSelect}>00/00/0000-00/00/0000</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Icon name="calendar-range" size={24} color={colors.primary.white} />
                </TouchableOpacity>
            </View>

            {
                renderFuelList()
            }
            
            <TouchableOpacity style={styles.fab} onPress={openModalAddFuel}>
                <Icon name="plus" size={24} color={colors.primary.white} />
            </TouchableOpacity>
        </View>
    )
}