import React, { useState, useEffect, useRef } from "react";

import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator,
    Animated,
    Dimensions,
    Image
} from "react-native";
import { colors } from "../../theme";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VehicleListTile from "../../components/VehicleListTile";
import Storage from "../../utils/storage";
import styles from "./style";
import VehicleFilter from "../../components/VehicleFilter";
import Vehicle from "../../types/vehicle";
import { deleteVehicleByCompanyAndVehicleId, getAllVehicleByCompanyIdAndStatus, getVehicleByPlate } from "../../service/vehicleService";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Notify from "../../components/Notify";

interface Props{
  navigation: any;
}

export default function Vehicles( {navigation}: Props ) {

    const [companyId, setCompanyId] = useState<string>('');
    const [tokenJwt, setTokenJwt] = useState<string>('');

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState("active");


    const [notFoundVehicles, setNotFoundVehicles] = useState<boolean>(false);

    //Filter buttons
    //const filters: string[] = ['Ativos', 'Manutenção', 'Aviso', 'Em uso'];
    const filters: any[] = [
        {label: 'Ativos', value: "active"},
        {label: 'Manutenção', value: "maintenance"},
        {label: 'Aviso', value: "alert"}
    ]
    
    const [selectedFilter, setSelectedFilter] = useState<string>(filters[0].label);

    //flat list
    const [vehicles, setVehicles] = useState<Vehicle[] | null | undefined>(null);
    const [page, setPage] = useState<number>(0);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    

    //field error
    const [error, setError] = useState<any>({});

    useEffect(() => {
        async function getInStorage(){
            try {
                const currentStorage: Storage = await Storage.getInstance().then((storage: Storage) => {
                    setCompanyId(storage!.companyExternalId!);
                    setTokenJwt(storage!.tokenJwt!);
                    return storage;
                });
                
            } catch (error) {
                console.log("Error to get in storage: ", error);
            }
        }

        getInStorage();
    }, [])




    useEffect(() => {
        setRefreshing(true);
        setVehicles([]);
        setPage(0);
        loadVehicles(0).then(() => setRefreshing(false));
    }, [selected]);

    useEffect(() => {
        loadVehicles(0);
    }, [companyId, tokenJwt]);

    useEffect(() => {
        console.log("Error: ", error);
        if (error.search) {
            setTimeout(() => {
                setError({});
            }, 2000);
        }
    }, [error])

    async function loadVehicles(pageToLoad = 0){
        try {
            if (loadingMore) return;
            setLoadingMore(true);

            const result: Vehicle[] | null | undefined = await getAllVehicleByCompanyIdAndStatus(selected, pageToLoad);

            if(result !== null && result !== undefined){

                console.log("Result: ", result);
                if (pageToLoad === 0) {
                    setVehicles(result!);
                } else {
                    setVehicles(prev => [...prev!, ...result!]);
                }
                setPage(pageToLoad);
            }
        } catch (error) {
            setLoadingMore(false);
            console.error("Erro ao carregar veículos", error);
        } finally {
            setLoadingMore(false);
        }
    };

    function loadMoreVehicles(){
        loadVehicles(page + 1);
        setLoadingMore(false);
    };

    function onRefresh(){
        setRefreshing(true);
        setNotFoundVehicles(false);
        setVehicles([]);
        setPage(0);
        loadVehicles(0).then(() => setRefreshing(false));
    };

    
    function openModalAddVehicle(){
        navigation.navigate("AddVehicle");
    }

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

    async function deleteItem(vehicle: Vehicle){

        const reponse: number = await deleteVehicleByCompanyAndVehicleId(vehicle, tokenJwt);

        if(reponse === 204){
            console.log("Veículo deletado com sucesso");
            onRefresh();
        }

        //Voltar algum erro um sucesso
    }

    function renderRightActions(item: Vehicle){
        return(
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteItem(item)}
            >
                <Icon name="delete" size={24} color={colors.primary.white} />
            </TouchableOpacity>
        );
    };

    async function searchVehicleByPlate(){
        const vehicleFound: Vehicle | null | undefined = await getVehicleByPlate(search);

        console.log("Vehicle found: ", vehicleFound);

        if(vehicleFound !== null && vehicleFound !== undefined){
            navigation.navigate("Vehicle", vehicleFound);
            return;
        }

        console.log("Nenhum veículo encontrado com a placa informada.");
        setError({ search: "Nenhum veículo encontrado com a placa informada."});
    }

    async function onPressErrorNotify(){
        setError({});
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, gap: 18, paddingVertical: 2 }}>
                    {
                        filters.map((filter: any) => (
                            <VehicleFilter
                            key={filter.label}
                            text={filter.label}
                            selected={filter.label == selectedFilter}
                            onPress={() => {
                                setSelectedFilter(filter.label);
                                console.log(filter.value);
                                setSelected(filter.value);
                                setRefreshing(true);
                            }}
                            />
                        ))
                    }
                </ScrollView>
            </View>


            <View style={{ paddingHorizontal: 15}}>
              <View style={styles.searchField}>
                  <TextInput
                  style={{ marginLeft: 10, flex: 1,}}
                  placeholder='Digite a placa...'
                  value={search}
                  onChangeText={ (text) => setSearch(text)}
                  />

                  <TouchableOpacity
                  style={ styles.searchButton }
                  onPress={searchVehicleByPlate}
                  >
                      <Icon name="magnify" size={24} color={colors.icon.white}/>

                  </TouchableOpacity>

              </View>
            </View>

             <FlatList 
                    showsVerticalScrollIndicator={false}  
                    data={vehicles}
                    keyExtractor={ item => String(item.id)}
                    renderItem={ ({ item }) => (
                        <View style={styles.gestureContainer}>
                            <GestureHandlerRootView>
                                    <ReanimatedSwipeable
                                        enableTrackpadTwoFingerGesture
                                        renderRightActions={() => renderRightActions(item)}
                                    >
                                        
                                        <VehicleListTile vehicle={item} navigation={navigation} isVehicles={true}/>                           
                                    </ReanimatedSwipeable>
                            </GestureHandlerRootView>
                        </View>
                    )}
                    onEndReached={loadMoreVehicles}
                    onEndReachedThreshold={1} 
                    ListFooterComponent={renderFooterFlatList}
                    style={styles.list}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
                    contentContainerStyle={{ paddingBottom: 30 }}
            />
            
            <TouchableOpacity style={styles.fab} onPress={openModalAddVehicle}>
                <Icon name="plus" size={24} color={colors.primary.white} />
            </TouchableOpacity>

            {error.search && (
                <Notify
                isError={true}
                text={error.search}
                />
            )}
        </View>
    );

}

