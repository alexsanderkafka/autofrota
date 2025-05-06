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
    TextInput
} from 'react-native';
import { colors } from '../../theme';
import FilterButton from '../../components/FilterButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewMaintenance from '../modal/AddNewMaintenance';

import styles from './style';
import ScheduledMaintenanceCard from '../../components/ScheduledMaintenanceCard';
import MaintenanceDoneCard from '../../components/MaintenanceDoneCard';
import Vehicle from '../Vehicle';
import useMaintenanceDone from '../../hooks/useMaintenanceDone';
import useScheduledMaintenance from '../../hooks/useScheduledMaintenance';

const { height } = Dimensions.get('window');

interface Props{
    navigation: any;
    route: any;
}

export default function Maintenance({ navigation, route }: Props) {

    /*
    const [token, setToken] = useState('');
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [latestElement, setLatestElement] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalMaintenance, setTotalMaintenance] = useState(0);
    const [notFoundMaintenance, setNotFoundMaintenance] = useState(false);

    const sizePage = 12;
    const vehicleId = route.params;*/

    const [latestElement, setLatestElement] = useState(false);
    const [filter, setFilter] = useState('scheduled'); //scheduled
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela

    const vehicleId: any = route.params;

    
    const { maintenanceDone } = useMaintenanceDone(vehicleId);
    const { scheduledMaintenance } = useScheduledMaintenance(vehicleId);

    console.log(maintenanceDone);
    console.log(scheduledMaintenance);

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

    function openModalAddMaitenance(){
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
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

            <FlatList<any>
            showsVerticalScrollIndicator={false} 
            data={filter === 'scheduled' ? scheduledMaintenance : maintenanceDone}
            keyExtractor={ item => filter === 'scheduled' ? String(item.id) : String(item.maintenance.id)}
            renderItem={ ({ item }) => {
                if(filter === 'scheduled'){
                    return(
                        <ScheduledMaintenanceCard 
                        date={item ? new Date(item.date).toLocaleDateString('pt-BR') : '00/00/0000'}
                        observation={item ? item.observation : 'Sem observação'}
                        navigation={navigation}
                        vehicleId={item.vehicleId}
                        vehicle={false}
                        />
                    );
                }

                return(
                    <MaintenanceDoneCard
                    date={item ? new Date(item.maintenance.date).toLocaleDateString('pt-BR') : '00/00/0000'}
                    totalValue={item ? item.maintenance.totalValue : 0}
                    services={item ? item.service : []}
                    navigation={navigation}
                    vehicleId={item.maintenance.vehicleId}
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