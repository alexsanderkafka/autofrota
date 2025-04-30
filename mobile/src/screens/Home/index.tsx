import React, { useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../service/api';
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

import { colors } from '../../theme';
import InfoCard from '../../components/InfoCard';
import ActionButton from '../../components/ActionButton';

import VehicleListTile from '../../components/VehicleListTile';

interface Props{
  navigation: any;
}

interface Vehicles {
  id: number;
  plate: string;
  brand: string;
  model: string;
  typeFuel: string;
  km: number;
  category: string;
  activate: boolean;
  vehicle_image_id: number;
  company_id: number;
  vehicle_status_id: number;
}

interface StatusCounts {
  active: number;
  alert: number;
  usage: number;
  maintenance: number;
}


export default function HomeScreen({ navigation }: Props) {

  const [token, setToken] = useState('');
  const [companyExternalId, setCompanyExternalId] = useState('');
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("todos");
  const [notFoundVehicles, setNotFoundVehicles] = useState(false);
  const [message, setMessage] = useState("");
  const [statusCount, setStatusCount] = useState<StatusCounts>();

  useEffect(() => {
    async function getInStorage(){
      try {
        const tokenJwt: any= await AsyncStorage.getItem('tokenJwt');
        const value: any = await AsyncStorage.getItem('companyExternalId');
        
        setCompanyExternalId(value);
        setToken(tokenJwt);
      } catch (error) {
        console.log("AsyncStorage error todos: " + error);
      }
    }
    getInStorage();
  }, []);

  useEffect( () => {
      getRecentVehicles();
      getStatusCount();
  }, [token, companyExternalId]);


  async function getStatusCount() {
    try {

      let response = await api.get(`/vehicles/${companyExternalId}/status`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });

      let status: StatusCounts = response.data;

      setStatusCount(status);

      //setLoading(false);
      //setNotFoundVehicles(false);
      
    } catch (error) {
      console.log("Caiu em error");
    }
  }

  async function getRecentVehicles(){
    try {

      let response = await api.get(`/vehicles/${companyExternalId}/recent`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });

      let listVehicles: Vehicles[] = response.data;

      setVehicles(listVehicles);

      setLoading(false);
      setNotFoundVehicles(false);

      console.log(vehicles);

    } catch (error) {
      console.log("Caiu em error");
      setLoading(false);
      setNotFoundVehicles(true);
      setMessage("Nenhum veículo cadastrado.")
      console.log("Error: " + error);
    }
  }

  return(
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
      
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 2}}>
          <View style={styles.infosContainer} >
              <InfoCard icon="car" amount={statusCount?.active ?? 50} title="Veículos Ativos" color={colors.icon.green}/>
              <InfoCard icon="wrench" amount={statusCount?.maintenance ?? 50} title="Em Manutenção" color={colors.icon.yellow}/>
              <InfoCard icon="alert" amount={statusCount?.alert ?? 50} title="Em Alerta" color={colors.icon.red}/>
              <InfoCard icon="alert" amount={statusCount?.maintenance ?? 50} title="Em uso" color={colors.icon.red}/>
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
          <Text style={[styles.titles, {paddingHorizontal:15}]}>Veículos recentes</Text>
          <FlatList 
          data={vehicles}
          keyExtractor={ item => String(item.id)}
          renderItem={ ({ item }) => <VehicleListTile data={item} navigation={navigation}/>}
          onEndReachedThreshold={1} 
          style={styles.list}
          />
        </View>
      </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    backgroundColor: colors.primary.white,

  },
  infosContainer:{
    width: '100%',
    height: 'auto',
    marginTop: 30,
    marginBottom: 26,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginHorizontal: 15
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
    height: 'auto',
    paddingHorizontal: 15
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
    marginTop: 16,
    paddingHorizontal: 15,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    //flexWrap: 'wrap',
    
  },
  recentVehiclesContainer:{
    marginTop: 26,
  },
  list:{
    paddingHorizontal: 15,
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