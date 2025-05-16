import React, { useEffect, useState, useRef }from 'react';
import api from '../../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyleSheet,
    View, 
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    TextInput,
    Image
} from 'react-native';

import { colors } from '../../theme';
import FilterButton from '../../components/FilterButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewMaintenance from '../modal/AddNewMaintenance';

import styles from './style';
import ScheduledMaintenanceCard from '../../components/ScheduledMaintenanceCard';
import MaintenanceDoneCard from '../../components/MaintenanceDoneCard';
import useMaintenanceDone from '../../hooks/useMaintenanceDone';
import useScheduledMaintenance from '../../hooks/useScheduledMaintenance';


import ScheduledMaintenance from '../../types/scheduledMaintenance';
import MaintenanceDone from '../../types/maintenanceDone';

const { height } = Dimensions.get('window');

interface Props{
    navigation: any;
    route: any;
}

export default function Maintenance({ navigation, route }: Props) {

    const [latestElement, setLatestElement] = useState(false);
    const [filter, setFilter] = useState('made'); //scheduled
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela

    const [loading, setLoading] = useState(true);
    const [notFoundMaintenance, setNotFoundMaintenance] = useState(false);
    //const [message, setMessage] = useState<string>(''); not found maintenance message

    const vehicleId: number = route.params;

    
    const { maintenanceDone } = useMaintenanceDone(vehicleId);
    const { scheduledMaintenance } = useScheduledMaintenance(vehicleId);

    useEffect( () => {
        if(maintenanceDone === null){
            setLoading(true);
            return;
        } 

        if(scheduledMaintenance === null) {
            setLoading(true);
            return;
        }

        if(maintenanceDone!.length === 0 && scheduledMaintenance!.length === 0){
            setLoading(false);
            setNotFoundMaintenance(true)
            return;
        }

        setLoading(false);
        setNotFoundMaintenance(false);
    }, [maintenanceDone, scheduledMaintenance]);

    function renderFooterFlatList(){
        if(!latestElement) return null;
            
        return(
            <View style={styles.latestElement}>
                
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

    function openModalAddMaitenance(){
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    function renderListMaintenance(){
        if(loading){
            return(
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                    size="large" color={colors.primary.main} 
                    />
                </View>
            );
        }else if(notFoundMaintenance){

            const notFoundImage: any = require('../../../assets/logo/not-found-maintenance.png');

            return(
                <View style={styles.notFoundContainer}>
                    <Image source={notFoundImage} style={styles.notFoundImage}/>
                    <Text style={styles.notFoundMessage}>Nenhuma manutenção encontrada para esse veículo.</Text>
                </View>
            );
        }else{
            return(
                <FlatList<ScheduledMaintenance | MaintenanceDone>
                showsVerticalScrollIndicator={false} 
                data={filter === 'scheduled' ? scheduledMaintenance : maintenanceDone}
                keyExtractor={ item => {
                    if(filter === 'scheduled'){
                        let scheduled: ScheduledMaintenance = item as ScheduledMaintenance;
                        return scheduled.id.toString();
                    }else{
                        let done: MaintenanceDone = item as MaintenanceDone;
                        return done.maintenance.id.toString();
                    }
                }}
                renderItem={ ({ item }) => {
                    if(filter === 'scheduled'){

                        const scheduled: ScheduledMaintenance = item as ScheduledMaintenance;

                        return(
                            <ScheduledMaintenanceCard 
                            maintenance={scheduled}
                            navigation={navigation}
                            vehicle={false}
                            />
                        );
                    }

                    //Talves colocar um if else
                    const done: MaintenanceDone = item as MaintenanceDone;

                    return(
                        <MaintenanceDoneCard
                        maintenance={done}
                        navigation={navigation}
                        vehicle={false}
                        />
                    )
                }}
                onEndReached={() => {
                    loadMoreFuel();
                }}
                onEndReachedThreshold={1} 
                ListFooterComponent={renderFooterFlatList}
                style={styles.list}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                />
            );
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.containerFilterButton}>
                <FilterButton text="feitas"/>
                <FilterButton text="Agendadas"/>
            </View>

            <View style={styles.fieldSelectDate}>
                <Text style={styles.rangeDateSelect}>00/00/0000-00/00/0000</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Icon name="calendar-range" size={24} color={colors.primary.white} />
                </TouchableOpacity>
            </View>

            {
                renderListMaintenance()
            }

            <TouchableOpacity style={styles.fab} onPress={openModalAddMaitenance}>
                <Icon name="plus" size={24} color={colors.primary.white} />
            </TouchableOpacity>

            {
            visible && (
                    <AddNewMaintenance visible={setVisible} slideAnim={slideAnim}/>
                )
            }
        
        </View>
    );
}