import React, { useState, useEffect } from "react";

import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator
} from "react-native";
import { colors } from "../theme";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VehicleListTile from "../components/VehicleListTile";
import api from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Vehicles( {navigation} ) {

    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState('');
    const [latestElement, setLatestElement] = useState(false);

    const [token, setToken] = useState('');
    const [businessId, setId] = useState('');
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState("todos");
    const [notFoundVehicles, setNotFoundVehicles] = useState(false);
    const [message, setMessage] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalVehicles, setTotalVehicles] = useState(0);
    
      const sizePage = 12;

    useEffect(() => {
        async function getInStorage(){
          try {
            const tokenJwt = await AsyncStorage.getItem('tokenJwt');
            const value = await AsyncStorage.getItem('businessId');
            
            setId(value);
            setToken(tokenJwt);
          } catch (error) {
            console.log("AsyncStorage error todos: " + error);
          }
        }
        getInStorage();
    }, []);

    useEffect( () => {
        getAllVehicles();
    }, [token, businessId]);

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

    async function loadMoreVehicles(){
        setLatestElement(true);
    
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
        }
    }

    async function getAllVehicles(){
        try {
    
          let response = await api.get(`/vehicles/${businessId}?page=${page}`, {
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
    
          console.log(response.data.hasOwnProperty("_embedded"));
    
          if(!response.data.hasOwnProperty("_embedded")) setLatestElement(false);
    
          setVehicles([...vehicles, ...response.data._embedded.vehicleDTOList]);
    
          setTotalPages(response.data.page.totalPages);
          setLoading(false);
          setNotFoundVehicles(false);
          setTotalVehicles(response.data.page.totalElements);

          console.log(Vehicles);
    
        } catch (error) {
          console.log("Caiu em error");
          setLoading(false);
          setNotFoundVehicles(true);
          setMessage("Nenhum veículo cadastrado.")
          console.log("Error: " + error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18 }}>
                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Ativos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Manutenção</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Avisos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Em uso</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>


            <View paddingHorizontal={15}>
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
            keyExtractor={ item => String(item.vehicle_characteristic.id)}
            renderItem={ ({ item }) => <VehicleListTile data={item} navigation={navigation}/>}
            onEndReached={() => {
                loadMoreVehicles();
            }}
            onEndReachedThreshold={1} 
            ListFooterComponent={renderFooterFlatList}
            style={styles.list}
            />


        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary.white,
        
    },
    buttonContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 30,
        paddingHorizontal: 15,
    },
    filter:{
        width: 'auto',
        height: 'auto',
        paddingVertical: 9,
        paddingHorizontal: 37,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary.main,
        elevation: 2
    },
    textButton:{
        fontSize: 13,
        color: colors.text.white
    },
    searchField:{
        width: '100%',
        maxHeight: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        marginTop: 35,
    },
    searchButton:{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        justifyContent: 'center',
        height: '100%',
        elevation: 2,
    },
    list:{
        marginTop: 16,
        paddingHorizontal: 15,
        paddingTop: 10
    }
});