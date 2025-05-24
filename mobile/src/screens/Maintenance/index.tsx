import React, { useEffect, useState, useRef }from 'react';

import {
    View, 
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import { colors } from '../../theme';
import FilterButton from '../../components/FilterButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import ScheduledMaintenanceCard from '../../components/ScheduledMaintenanceCard';
import MaintenanceDoneCard from '../../components/MaintenanceDoneCard';
import useMaintenanceDone from '../../hooks/useMaintenanceDone';
import useScheduledMaintenance from '../../hooks/useScheduledMaintenance';


import Maintenance from '../../types/maintenance';
import MaintenanceDone from '../../types/maintenanceDone';
import { getAllMaintenanceDone, getAllScheduledMaintenance } from '../../service/maintenanceService';
import Storage from '../../utils/storage';

interface Props{
    navigation: any;
    route: any;
}

export default function MaintenanceScreen({ navigation, route }: Props) {

    const [companyId, setCompanyId] = useState<string>('');
    const [tokenJwt, setTokenJwt] = useState<string>('');

    const [filter, setFilter] = useState('made'); //scheduled

    const [notFoundMaintenance, setNotFoundMaintenance] = useState(false);
    //const [message, setMessage] = useState<string>(''); not found maintenance message

    const vehicleId: number = route.params;

    
    //const { maintenanceDone } = useMaintenanceDone(vehicleId);
    //const { scheduledMaintenance } = useScheduledMaintenance(vehicleId);


    //Filter buttons
    const filters: string[] = ['Feitas', 'Agendadas'];
    const [selectedFilter, setSelectedFilter] = useState<string>(filters[0]);

    //Flatlist
    const [scheduledMaintenance, setScheduledMaintenance] = useState<Maintenance[] | null | undefined>();
    const [maintenanceDone, setMaintenanceDone] = useState<MaintenanceDone[] | null | undefined>();
    const [page, setPage] = useState<number>(0);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
            async function getInStorage(){
                try {
                    const currentStorage: Storage = await Storage.getInstance();
                    setCompanyId(currentStorage!.companyExternalId!);
                    setTokenJwt(currentStorage!.tokenJwt!);
                } catch (error) {
                    console.log("Error to get in storage: ", error);
                }
            }
    
            getInStorage();
    }, [])

    useEffect(() => {
        onRefresh();
        setScheduledMaintenance([]);
        setMaintenanceDone([]);
        setPage(0);
        loadMaintenance(0).then(() => setRefreshing(false));
    }, [selectedFilter]);

    useEffect(() => {
        loadMaintenance(0);
    }, [companyId, tokenJwt]);

    useEffect(() => {
        console.log("Maintenance Done:", maintenanceDone)
    }, [maintenanceDone]);


    async function loadMaintenance(pageToLoad = 0){
            try {
                if (loadingMore) return;
                setLoadingMore(true);

                if(filter === 'scheduled'){
                    const result: Maintenance[] | null | undefined = await getAllScheduledMaintenance(tokenJwt, vehicleId, companyId, pageToLoad);
    
                    if(result !== null && result !== undefined){
                        console.log("Result: ", result);
                        if (pageToLoad === 0) {
                            setScheduledMaintenance(result!);
                        } else {
                            setScheduledMaintenance(prev => [...prev!, ...result!]);
                        }
        
        
                        setPage(pageToLoad);
                    }
                }else if(filter === 'made'){
                    const result: MaintenanceDone[] | null | undefined = await getAllMaintenanceDone(tokenJwt, vehicleId, companyId, pageToLoad);

                    console.log("Bateu aqui")
    
                    if(result !== null && result !== undefined){
                        console.log("Result: ", result);
                        if (pageToLoad === 0) {
                            setMaintenanceDone(result!);
                        } else {
                            setMaintenanceDone(prev => [...prev!, ...result!]);
                        }
        
        
                        setPage(pageToLoad);
                    }
                }

            } catch (error) {
                setLoadingMore(false);
                console.error("Erro ao carregar veículos", error);
            } finally {
                setLoadingMore(false);
            }
    };

    function loadMoreMaintenance(){
        loadMaintenance(page + 1);
        setLoadingMore(false);
    };

    function onRefresh(){
        setRefreshing(true);
        setMaintenanceDone([]);
        setScheduledMaintenance([]);
        setPage(0);
        loadMaintenance(0).then(() => setRefreshing(false));
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

    /*

    useEffect( () => {
        if(maintenanceDone === null){
            setLoadingMore(true);
            return;
        } 

        if(scheduledMaintenance === null) {
            setLoadingMore(true);
            return;
        }

        if(maintenanceDone!.length === 0 && scheduledMaintenance!.length === 0){
            setLoadingMore(false);
            setNotFoundMaintenance(true)
            return;
        }

        setLoadingMore(false);
        setNotFoundMaintenance(false);
    }, [maintenanceDone, scheduledMaintenance]);*/


    function openModalAddMaitenance(){
        navigation.navigate('AddNewMaintenance', vehicleId);
    }

    function renderListMaintenance(){
        if(loadingMore){
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
                <FlatList<Maintenance | MaintenanceDone>
                showsVerticalScrollIndicator={false} 
                data={filter === 'scheduled' ? scheduledMaintenance : maintenanceDone}
                keyExtractor={ item => {
                    if(filter === 'scheduled'){
                        let scheduled: Maintenance = item as Maintenance;
                        return scheduled.id!.toString();
                    }else{
                        let done: MaintenanceDone = item as MaintenanceDone;
                        return done.maintenance.id!.toString();
                    }
                }}
                renderItem={ ({ item }) => {
                    if(filter === 'scheduled'){

                        const scheduled: Maintenance = item as Maintenance;

                        return(
                            <ScheduledMaintenanceCard 
                            maintenance={scheduled}
                            navigation={navigation}
                            vehicle={true}
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
                    loadMoreMaintenance();
                }}
                onEndReachedThreshold={1} 
                ListFooterComponent={renderFooterFlatList}
                style={styles.list}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                contentContainerStyle={{ paddingBottom: 30 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            );
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.containerFilterButton}>
                {
                    filters.map((filter: string) => (
                        <FilterButton
                        key={filter}
                        text={filter}
                        selected={filter == selectedFilter}
                        onPress={() => {
                            if(filter === filters[0]) setFilter('made');
                            else setFilter('scheduled');
                            
                            setSelectedFilter(filter);
                        }}
                        />
                    ))
                }
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
        
        </View>
    );
}