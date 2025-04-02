import React, { useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import VehicleListTile from '../components/VehicleListTile';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-ico-material-design';

import MapView from 'react-native-maps';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { colors } from '../theme';
import InfoCard from '../components/InfoCard';
import ActionButton from '../components/ActionButton';

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
      <ScrollView>
      <View style={styles.container}>
      
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 2 }}>
          <View style={styles.containerInfos}>
              <InfoCard icon="car" amount="50" title="Veículos Ativos" color={colors.icon.green}/>
              <InfoCard icon="wrench" amount="50" title="Em Manutenção" color={colors.icon.yellow}/>
              <InfoCard icon="alert" amount="50" title="Em Alerta" color={colors.icon.red}/>
          </View>
        </ScrollView>
  
        <View style={styles.mapContainer}>
          <Text style={styles.titles}>Localizações</Text>
          <View style={styles.mapBox}>
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            />
          </View>
        </View>

        <View style={styles.actionContainer}>
          <Text style={styles.titles}>Ações rápidas</Text>

          <View style={styles.buttonContainer}>
              <ActionButton icon={'plus'} text={'Novo Veículo'}/>
              <ActionButton icon={'chart-bar'} text={'Relatórios'}/>
          </View>
        </View>

        <View style={styles.recentVehiclesContainer}>
          <Text style={styles.titles}>Veículos recentes</Text>
            
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
        
  
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    backgroundColor: colors.primary.white,
    paddingHorizontal: 15,
  },
  containerInfos:{
    width: '100%',
    height: 'auto',
    marginTop: 30,
    marginBottom: 26,
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  containerPicker:{
    width: '100%',
  },
  alertText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
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
  mapContainer:{
    width: '100%',
    height: 'auto'
  },
  titles:{
    fontSize: 16,
    marginBottom: 15
  },
  mapBox:{
    width: '100%',
    height: 262,
    borderRadius: 5,
    overflow: 'hidden'
  },
  map:{
    width: '100%',
    height: '100%',
  },
  actionContainer:{
    marginTop: 16
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    //flexWrap: 'wrap',
    
  },
  recentVehiclesContainer:{
    marginTop: 26
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


/*

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

    </View>*/