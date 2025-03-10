import React, { useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import VehicleListTile from '../components/VehicleListTile';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-ico-material-design';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';

export default function HomeScreen({ navigation }) {

  const [token, setToken] = useState('');
  const [businessId, setId] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("todos");
  const [notFoundVehicles, setNotFoundVehicles] = useState(false);
  const [message, setMessage] = useState("");
  const [latestElement, setLatestElement] = useState(false);
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

  useEffect( () => {
    if(selected == 'todos'){
      getAllVehicles();
    }else{
      getStatusVehicles();
    }    
  }, [selected]);

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

    } catch (error) {
      console.log("Caiu em error");
      setLoading(false);
      setNotFoundVehicles(true);
      setMessage("Nenhum veículo cadastrado.")
      console.log("Error: " + error);
    }
  }

  async function getStatusVehicles(){
    try {
      let response = await api.get(`/vehicles/${selected}/${businessId}?page=${page}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });

      if(!response.data.hasOwnProperty("_embedded")) setLatestElement(false);

      setVehicles([...vehicles, ...response.data._embedded.vehicleDTOList]);

      setLoading(false);
      setNotFoundVehicles(false);
      setTotalPages(response.data.page.totalPages);
      setTotalVehicles(response.data.page.totalElements);

    } catch (error) {
      setLoading(false);
      setNotFoundVehicles(true);
      setMessage(`Nenhum veículo com a manutenção ${selected}.`)
      console.log("Error: " + error);
    }
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
  }else if(notFoundVehicles){
    return(
      <View style={styles.container}>

      <View style={styles.containerPicker}>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => {
            console.log("Value picker: " + itemValue);
            setSelected(itemValue);
            setLoading(true);
            setVehicles([]);
            setPage(0);
          }}
          style={styles.picker}
          >
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Em dia" value="em dia" />
          <Picker.Item label="Feito" value="feito" />
          <Picker.Item label="Atrasado" value="atrasada" />
        </Picker>
      </View>
      
      <View style={styles.containerCenter}>
        <Icon
          name="car-front"
          height="72"
          width="72"
          color="#176585"
        />
        <Text style={styles.textNotFoundVehicles}>{message}</Text>
      </View>

    </View>
    );
  }else{
    return (
      <View style={styles.container}>

        <View style={styles.containerPicker}>
          <Picker
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) => {
              setVehicles([]);
              setPage(0);

              setSelected(itemValue);
              setLoading(true);
            }}
            style={styles.picker}
            >
            <Picker.Item label="Todos" value="todos" />
            <Picker.Item label="Em dia" value="em dia" />
            <Picker.Item label="Feito" value="feita" />
            <Picker.Item label="Atrasado" value="atrasada" />
          </Picker>
        </View>
  
        <FlatList 
        data={vehicles}
        keyExtractor={ item => String(item.vehicle_characteristic.id)}
        renderItem={ ({ item }) => <VehicleListTile data={item} navigation={navigation}/>}
        onEndReached={() => {
          loadMoreVehicles();
        }}
        onEndReachedThreshold={1} 
        ListFooterComponent={renderFooterFlatList}
        />
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 20,
    backgroundColor: '#FFF'
  },
  alertText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  containerPicker:{
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#176585',
    backgroundColor: '#FFF',
    elevation: 5
  },
  containerListTile:{
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    display: 'flex',
    borderColor: '#000',
    elevation: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 3,
    marginBottom: 10,
  },
  img:{
    width: 131,
    height: 102.16,
    borderRadius: 5,
    marginRight: 8,
  },
  infoVehicle: {
    display: 'flex',
    width: 'auto',
  },
  plate:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  vehicleCode:{
    fontSize: 12  
  },
  date:{
    fontSize: 10
  },
  alertIcon:{
    maxWidth: 199,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textAlertIcon:{
    fontSize: 9,
  },
  containerCenter:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: 100
  },
  textNotFoundVehicles:{
    fontSize: 20,
    textAlign: 'center'
  },
  latestElement:{
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
