import React, { useEffect, useState }from 'react';
import MaintenanceListTile from '../components/MaintenanceListTile';
import api from '../service/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ico-material-design';

import {
    StyleSheet,
    View, 
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Text
} from 'react-native';


export default function Maintenance({ navigation, route }) {

    const [token, setToken] = useState('');
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [latestElement, setLatestElement] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalMaintenance, setTotalMaintenance] = useState(0);
    const [notFoundMaintenance, setNotFoundMaintenance] = useState(false);

    const sizePage = 12;
    const vehicleId = route.params;

    useEffect(() => {
        async function getInStorage(){
          try {
            const tokenJwt = await AsyncStorage.getItem('tokenJwt');
            
            setToken(tokenJwt);
            setLoading(false);

          } catch (error) {
            console.log("AsyncStorage error todos: " + error);
          }
        }
        getInStorage();
    }, []);

    useEffect(() => {
        getAllMaintenance();
    }, [token]);

    async function getAllMaintenance(){
        try {
            let response = await api.get(`/maintenance/${vehicleId}?page=${page}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            setMaintenances([...maintenances, ...response.data._embedded.maintenanceDTOList]);

            setTotalPages(response.data.page.totalPages);
            setTotalMaintenance(response.data.page.totalElements);
            setNotFoundMaintenance(false);
            setLoading(false);
            
        }catch (error) {
            setNotFoundMaintenance(true);
            console.log("Error: " + error);
        }
    }

    async function loadMore(){
        setLatestElement(true);
    
        if(page === totalPages || totalMaintenance < sizePage){
          setLatestElement(false);
          return;
        }
    
        setPage(page + 1);

        await getAllMaintenance();
    }

    function renderFooterFlatList(){
        if(!latestElement) return null;
    
        return(
          <View style={styles.latestElement}>
            <ActivityIndicator
            size="large" color="#176585" />
          </View>
        );
    }
    
    if(loading){
        return(
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <ActivityIndicator 
              color="#176585"
              size={45}
              />
            </View>
        );
    }else if(notFoundMaintenance){
        return(
        <View style={styles.container}>

            <View style={styles.containerCenter}>
              <Icon
                name="car-front"
                height="72"
                width="72"
                color="#176585"
              />
              <Text style={styles.textNotFoundVehicles}>Não foi encotrado nenhum histórico.</Text>
            </View>
      
        </View>
        );
    } else{
        return(
            <SafeAreaView style={styles.containerSafeArea}>
                <View style={styles.container}>
                    <FlatList 
                    data={maintenances}
                    keyExtractor={ item => String(item.id)}
                    renderItem={ ({ item }) => <MaintenanceListTile data={item} navigation={navigation}/>}
                    onEndReached={() => {
                        loadMore();
                    }}
                    onEndReachedThreshold={1}
                    ListFooterComponent={renderFooterFlatList}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerSafeArea:{
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
    },
    container: {
      backgroundColor: '#FFF',
      flexDirection: 'column',
      marginHorizontal: 8,
      height: 'auto',
    },
    titles:{
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    maintenance:{
        marginTop: 10,
        width: '100%',
        backgroundColor: '#FFF',
        height: 'auto',
        borderRadius: 5,
        borderColor: '#000',
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
    },
    informations:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    textInformations:{
        flexShrink: 1,
        fontSize: 16,
    },
    observacao:{
        fontSize: 16,
        marginBottom: 10,
        marginTop: 14
    },
    observacaoInformacao:{
        marginBottom: 16,    
    },
    maintenanceDone:{
        marginTop: 10,
        width: '100%',
        backgroundColor: '#FFF',
        height: 'auto',
        borderRadius: 5,
        borderColor: '#000',
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
    },
    latestElement:{
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCenter:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 100
    },
    fab: {
        position: 'relative',
        margin: 16,
        marginTop: 40,
        right: 0,
        bottom: 0,
    },
    textNotFoundVehicles:{
        fontSize: 20,
        textAlign: 'center'
    },
});