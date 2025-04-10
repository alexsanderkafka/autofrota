import React, { useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
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

import VehicleListTile from '../components/VehicleListTile';

interface Props{
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {

  const [token, setToken] = useState('');
  const [businessId, setId] = useState('');
  //const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("todos");
  const [notFoundVehicles, setNotFoundVehicles] = useState(false);
  const [message, setMessage] = useState("");
  const [latestElement, setLatestElement] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);

  const sizePage = 12;

  const vehicles = [
    {
      "brand": "Renault",
      "model": "Kwid",
      "year": "2020",
      "plate": "AAA-2345",
      "vehicle_code": "VC2020BMW",
      "image_perfil": "../../assets/images/kwid.jpg",
      "internal_image": {
        "id": 1,
        "frontImage": "assets/images/front_image6.jpg",
        "leftImage": "assets/images/left_image6.jpg",
        "rearImage": "assets/images/rear_image6.jpg",
        "rightImage": "assets/images/right_image6.jpg"
      },
      "external_image": {
        "id": 6,
        "frontImage": "assets/images/external_front_image6.jpg",
        "leftImage": "assets/images/external_left_image6.jpg",
        "rearImage": "assets/images/external_rear_image6.jpg",
        "rightImage": "assets/images/external_right_image6.jpg"
      },
      "maintenance": {
        "id": 40,
        "date_maintenance": null,
        "latest_maintenance": "2024-10-12T03:00:00.000+00:00",
        "next_maintenance": "2025-09-12T03:00:00.000+00:00",
        "observation": "Verificação de freios",
        "status": "em dia"
      },
      "fuel": {
        "id": null,
        "fuel_type": null,
        "km": null,
        "latest_fuel": null,
        "litter": 0,
        "price": 0
      },
      "vehicle_characteristic": {
        "id": 1,
        "vehicleType": "Carro",
        "color": "Amarelo",
        "chassiNumber": "9BG116GW04C400003",
        "currentKm": "30000",
        "avgConsume": 13.2,
        "engineLiter": 1.8,
        "fuelType": "Gasolina",
        "renavam": "67890123456",
        "status": true
      },
      "business": {
        "id": 1,
        "name": "Transporte Rápido Ltda",
        "cnpj": "12345678000101",
        "phone": "(48) 98765-4321",
        "created": "2023-01-15T03:00:00.000+00:00"
      }
    },
    {
      "brand": "Renault",
      "model": "Kwid",
      "year": "2020",
      "plate": "PQR-0000",
      "vehicle_code": "VC2020BMW",
      "image_perfil": "../../assets/images/kwid.jpg",
      "internal_image": {
        "id": 6,
        "frontImage": "assets/images/front_image6.jpg",
        "leftImage": "assets/images/left_image6.jpg",
        "rearImage": "assets/images/rear_image6.jpg",
        "rightImage": "assets/images/right_image6.jpg"
      },
      "external_image": {
        "id": 6,
        "frontImage": "assets/images/external_front_image6.jpg",
        "leftImage": "assets/images/external_left_image6.jpg",
        "rearImage": "assets/images/external_rear_image6.jpg",
        "rightImage": "assets/images/external_right_image6.jpg"
      },
      "maintenance": {
        "id": 40,
        "date_maintenance": null,
        "latest_maintenance": "2024-10-12T03:00:00.000+00:00",
        "next_maintenance": "2025-09-12T03:00:00.000+00:00",
        "observation": "Verificação de freios",
        "status": "em dia"
      },
      "fuel": {
        "id": null,
        "fuel_type": null,
        "km": null,
        "latest_fuel": null,
        "litter": 0,
        "price": 0
      },
      "vehicle_characteristic": {
        "id": 2,
        "vehicleType": "Carro",
        "color": "Amarelo",
        "chassiNumber": "9BG116GW04C400003",
        "currentKm": "30000",
        "avgConsume": 13.2,
        "engineLiter": 1.8,
        "fuelType": "Gasolina",
        "renavam": "67890123456",
        "status": true
      },
      "business": {
        "id": 1,
        "name": "Transporte Rápido Ltda",
        "cnpj": "12345678000101",
        "phone": "(48) 98765-4321",
        "created": "2023-01-15T03:00:00.000+00:00"
      }
    },
    {
      "brand": "Renault",
      "model": "Kwid",
      "year": "2020",
      "plate": "VVV-0000",
      "vehicle_code": "VC2020BMW",
      "image_perfil": "../../assets/images/kwid.jpg",
      "internal_image": {
        "id": 6,
        "frontImage": "assets/images/front_image6.jpg",
        "leftImage": "assets/images/left_image6.jpg",
        "rearImage": "assets/images/rear_image6.jpg",
        "rightImage": "assets/images/right_image6.jpg"
      },
      "external_image": {
        "id": 6,
        "frontImage": "assets/images/external_front_image6.jpg",
        "leftImage": "assets/images/external_left_image6.jpg",
        "rearImage": "assets/images/external_rear_image6.jpg",
        "rightImage": "assets/images/external_right_image6.jpg"
      },
      "maintenance": {
        "id": 40,
        "date_maintenance": null,
        "latest_maintenance": "2024-10-12T03:00:00.000+00:00",
        "next_maintenance": "2025-09-12T03:00:00.000+00:00",
        "observation": "Verificação de freios",
        "status": "em dia"
      },
      "fuel": {
        "id": null,
        "fuel_type": null,
        "km": null,
        "latest_fuel": null,
        "litter": 0,
        "price": 0
      },
      "vehicle_characteristic": {
        "id": 3,
        "vehicleType": "Carro",
        "color": "Amarelo",
        "chassiNumber": "9BG116GW04C400003",
        "currentKm": "30000",
        "avgConsume": 13.2,
        "engineLiter": 1.8,
        "fuelType": "Gasolina",
        "renavam": "67890123456",
        "status": true
      },
      "business": {
        "id": 1,
        "name": "Transporte Rápido Ltda",
        "cnpj": "12345678000101",
        "phone": "(48) 98765-4321",
        "created": "2023-01-15T03:00:00.000+00:00"
      }
    }
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

  return(
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
      
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 2}}>
          <View style={styles.infosContainer} >
              <InfoCard icon="car" amount="50" title="Veículos Ativos" color={colors.icon.green}/>
              <InfoCard icon="wrench" amount="50" title="Em Manutenção" color={colors.icon.yellow}/>
              <InfoCard icon="alert" amount="50" title="Em Alerta" color={colors.icon.red}/>
              <InfoCard icon="alert" amount="50" title="Test" color={colors.icon.red}/>
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
          keyExtractor={ item => String(item.vehicle_characteristic.id)}
          renderItem={ ({ item }) => <VehicleListTile data={item} navigation={navigation}/>}
          onEndReachedThreshold={1} 
          ListFooterComponent={renderFooterFlatList}
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