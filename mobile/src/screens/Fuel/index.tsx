import React, { useEffect, useState, useRef, use }from 'react';

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

import Storage from '../../utils/storage';
import FuelType from '../../types/fuel';
import { getAllFuelByVehicleIdAndCompany } from '../../service/fuelService';

interface Props{
    navigation: any;
    route: any;
}

export default function Fuel({ navigation, route }: Props) {

    const [notFound, setNotFound] = useState<boolean>(false);

    const vehicleId: number = route.params;

    //Flat list
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [fuel, setFuel] = useState<FuelType[] | null | undefined>();
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        loadFuel(0);
    }, [])

    async function loadFuel(pageToLoad = 0){
            try {
                if (loadingMore) return;
                setLoadingMore(true);
    
                const result: FuelType[] | null | undefined = await getAllFuelByVehicleIdAndCompany(vehicleId, pageToLoad);
    
                if(result !== null && result !== undefined){

                    console.log("Result: ", result);
                    if (pageToLoad === 0) {
                        setFuel(result!);
                    } else {
                        setFuel(prev => [...prev!, ...result!]);
                    }

                    setPage(pageToLoad);
                }
            } catch (error) {
                setLoadingMore(false);
                console.error("Erro ao carregar fuels", error);
            } finally {
                setLoadingMore(false);
            }
    };

    function renderFooterFlatList(){
        if(!loadingMore) return null;

        if(refreshing) return null;
    
        return(
          <View style={styles.latestElement}>
            <ActivityIndicator
            size="large" color={colors.primary.main} 
            style={{ marginTop: 20, marginBottom: 20 }}
            />
          </View>
        );
    }

    function loadMoreFuel(){
        loadFuel(page + 1);
        setLoadingMore(false);
    };

    function openModalAddFuel(){
        navigation.navigate('AddNewFuel', vehicleId);
    }

    function onRefresh(){
        setRefreshing(true);
        setFuel([]);
        setPage(0);
        loadFuel(0).then(() => setRefreshing(false));
    };

    function renderFuelList(){
        if(loadingMore){
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
                refreshing={refreshing}
                onRefresh={onRefresh}
                contentContainerStyle={{ paddingBottom: 30 }}
                />
            );
        }
    }

    return(
        <View style={styles.container}>
            {
                renderFuelList()
            }
            
            <TouchableOpacity style={styles.fab} onPress={openModalAddFuel}>
                <Icon name="plus" size={24} color={colors.primary.white} />
            </TouchableOpacity>
        </View>
    )
}

/*<View style={styles.fieldSelectDate}>
                <Text style={styles.rangeDateSelect}>00/00/0000-00/00/0000</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Icon name="calendar-range" size={24} color={colors.primary.white} />
                </TouchableOpacity>
            </View>*/