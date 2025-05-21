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
    Dimensions
} from "react-native";
import { colors } from "../../theme";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VehicleListTile from "../../components/VehicleListTile";
import api from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../service/storage";
import useVehicles from "../../hooks/useVehicles";
import styles from "./style";
import VehicleFilter from "../../components/VehicleFilter";
import { VehicleStatus } from "../../types/vehicleStatus";
import AddNewVehicle from "../modal/AddNewVehicle";
import Vehicle from "../../types/vehicle";
import { deleteVehicleByCompanyAndVehicleId, getAllVehicleByCompanyIdAndStatus } from "../../service/vehicleService";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props{
  navigation: any;
}

const { height } = Dimensions.get('window');

export default function Vehicles( {navigation}: Props ) {

    const [companyId, setCompanyId] = useState<string>('');
    const [tokenJwt, setTokenJwt] = useState<string>('');

    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState("active");

    //Modal add vehicle
    const [visible, setVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela

    //Filter buttons
    //const filters: string[] = ['Ativos', 'Manutenção', 'Aviso', 'Em uso'];
    const filters: any[] = [
        {label: 'Ativos', value: "active"},
        {label: 'Manutenção', value: "maintenance"},
        {label: 'Aviso', value: "alert"}
    ]
    
    const [selectedFilter, setSelectedFilter] = useState<string>(filters[0].label);

    //flat list
    const [vehicles, setVehicles] = useState<Vehicle[] | null | undefined>();
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
        setRefreshing(true);
        setVehicles([]);
        setPage(0);
        loadVehicles(0).then(() => setRefreshing(false));
    }, [selected]);

    useEffect(() => {
        loadVehicles(0);
    }, [companyId, tokenJwt]);

    async function loadVehicles(pageToLoad = 0){
        try {
            if (loadingMore) return;
            setLoadingMore(true);

            const result: Vehicle[] | null | undefined = await getAllVehicleByCompanyIdAndStatus(companyId, selected, tokenJwt, pageToLoad);

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
        setVehicles([]);
        setPage(0);
        loadVehicles(0).then(() => setRefreshing(false));
    };

    
    function openModalAddVehicle(){
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
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

            {
                visible && (
                    <AddNewVehicle visible={setVisible} slideAnim={slideAnim}/>
                )
            }

        </View>
    );

}

