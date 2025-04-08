import React, { useEffect, useState, useRef }from 'react';
import MaintenanceListTile from '../components/MaintenanceListTile';
import api from '../service/api';
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
import { colors } from '../theme';
import FilterButton from '../components/FilterButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewMaintenance from './modal/AddNewMaintenance';

const { height } = Dimensions.get('window');

function MaintenanceMadeCard({ data }){
    return(
        <View style={styles.maintenanceCard}>
        
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>{ data.date }</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>
        
                <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>{ data.price }</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>


                <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>{ data.km }Km</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <View style={styles.row}>
                    <Icon name="wrench" size={24} color={colors.icon.mainBlue} />
                    <Text>Serviços feitos:</Text>
                </View>
        
                <View style={styles.serviceBoxMade}>
                    
                {
                    data.services.map((service, index) => (
                        <View key={index} style={styles.serviceMade}>
                            <Text style={{ color: colors.text.white, fontSize: 10 }}>{service}</Text>
                        </View>
                ))}
                    
                </View>
            </View>
        
        </View>
    );
}

function MaintenanceScheduledCard({ data }){
    return(
        <View style={styles.maintenanceCard}>
        
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>{ data.date }</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>
        
                <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>Observações:</Text>
                </View>
                <Text style={styles.observation}>{ data.observation }</Text>
        

            </View>
        
        </View>
    );
}


export default function Maintenance({ navigation, route }) {

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
    const [filter, setFilter] = useState('made'); //scheduled
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela
    
    

    const maintenancesScheduled = [
        {
            id: 1,
            date: "11/12/2030",
            observation: "Na próxima manutenção do veículo Honda Civic 2020, será realizada a troca das pastilhas de freio dianteiras, já que atualmente têm 40% de vida útil restante, para garantir a segurança e o desempenho adequado do sistema de frenagem. Além disso, será realizado o alinhamento e balanceamento das rodas, o que ajudará a evitar o desgaste irregular dos pneus e melhorará a estabilidade e o conforto ao dirigir."
        },
        {
            id: 2,
            date: "12/09/2000",
            observation: "Está programada para a próxima manutenção do Honda Civic 2020 a troca do fluido da transmissão automática, conforme intervalo recomendado, assegurando trocas de marcha suaves e preservando a vida útil do câmbio. Será feita ainda a inspeção do sistema de escapamento, verificando possíveis vazamentos ou corrosões."
        },
        {
            id: 3,
            date: "10/05/2040",
            observation: "Durante a próxima manutenção do Honda Civic 2020, será realizada a verificação e possível substituição da bateria, que apresenta sinais de desgaste, prevenindo falhas na partida. Além disso, será efetuada a limpeza do sistema de freios traseiros, melhorando o desempenho da frenagem e contribuindo para a segurança do veículo."
        },
    ]

    const maintenancesMade = [
        {
            id: 1,
            date: "11/12/2030",
            price: "R$ 500,00",
            km: "78.990",
            services: [
                "Troca de óleo",
                "Alinhamento e balanceamento",
                "Revisão de freios"
            ]
        },
        {
            id: 2,
            date: "12/09/2000",
            price: "R$ 1000,00",
            km: "90000",
            services: [
                "Troca de filtro de ar",
                "Troca de bateria",
                "Troca de pastilhas de freio",
            ]
        },
        {
            id: 3,
            date: "10/05/2040",
            price: "R$ 10,00",
            km: "80",
            services: [
                "Lavagem completa",
                "Polimento",
                "Higienização interna",
                "Revisão geral"
            ]
        },
    ]

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

            <FlatList 
            showsVerticalScrollIndicator={false} 
            gap={20}
            data={filter === 'scheduled' ? maintenancesScheduled : maintenancesMade}
            keyExtractor={ item => String(item.id)}
            renderItem={ ({ item }) => filter === 'scheduled' ? <MaintenanceScheduledCard data={item} /> : <MaintenanceMadeCard data={item} />}
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.primary.white,
        flexDirection: 'column',
    },
    containerFilterButton:{
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 15
    },
    fieldSelectDate:{
        marginTop: 30,
        width: '50%',
        height: 38,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15
    },
    rangeDateSelect:{
        fontSize: 10,
        color: colors.text.gray,
        marginLeft: 10,
        textAlign: 'center',
    },
    dateButton:{
        backgroundColor: colors.primary.main,
        width: 38,
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary.main,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // para Android
    },
    maintenanceCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
        marginHorizontal: 15,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
    },
    serviceBoxMade:{
        width: '100%',
        height: 116,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        borderColor: colors.primary.main,
        borderWidth: 1,
        marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5

    },
    serviceMade:{
        height: 'auto',
        width: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    observation:{
        fontSize: 13,
        textAlign: 'justify',
    },
    list:{
        marginTop: 20,
        paddingVertical: 6
    }



    
});


/**
 * 
 * 
 *  {
            
 */