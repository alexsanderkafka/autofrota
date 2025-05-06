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
import AddNewFuel from '../modal/AddNewFuel';

import styles from './style';
import FuelCard from '../../components/FuelCard';

const { height } = Dimensions.get('window');

interface Props{
    navigation: any;
}

export default function Fuel({ navigation }: Props) {

    const [latestElement, setLatestElement] = useState(false);

    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela

    const fuel = [
        {
            id: 1,
            date: "2024-01-15T03:00:00.000+00:00",
            price: 500.00,
            km: 78.990,
            fuelType: "Gasolina",
            liters: 70
        },
        {
            id: 2,
            date: "2024-01-15T03:00:00.000+00:00",
            price: 1000.00,
            km: 90000,
            fuelType: "Gasolina",
            liters: 100
        },
        {
            id: 3,
            date: "2024-01-15T03:00:00.000+00:00",
            price: 10.00,
            km: 80,
            fuelType: "Gasolina",
            liters: 2
        },
    ]

    function sendToAddFuel(){

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
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.fieldSelectDate}>
                <Text style={styles.rangeDateSelect}>00/00/0000-00/00/0000</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Icon name="calendar-range" size={24} color={colors.primary.white} />
                </TouchableOpacity>
            </View>

            <FlatList
            showsVerticalScrollIndicator={false}
            data={fuel}
            keyExtractor={ item => String(item.id)}
            renderItem={ ({ item }) => <FuelCard 
                                        date={item ? new Date(item.date).toLocaleDateString('pt-BR') : '00/00/0000'}
                                        price={item ? item.price : 0.00}
                                        km={item ? item.km : 0}
                                        fuelType={item ? item.fuelType : 'Gasolina'}
                                        liters={item ? item.liters : 0}
                                        navigation={navigation}
                                        vehicleId={item.id}
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
            
            <TouchableOpacity style={styles.fab} onPress={openModalAddFuel}>
                <Icon name="plus" size={24} color={colors.primary.white} />
            </TouchableOpacity>

            {
                visible && (
                    <AddNewFuel visible={setVisible} slideAnim={slideAnim}/>
                )
            }
        
        </View>
    )
}