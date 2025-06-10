import React, { useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import MapView from 'react-native-maps';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native';

import { colors } from '../../theme';
import InfoCard from '../../components/InfoCard';
import ActionButton from '../../components/ActionButton';

import VehicleListTile from '../../components/VehicleListTile';

import styles from './style';
import useStatusCount from '../../hooks/useStatusCount';
import Vehicle from '../../types/vehicle';
import { getRecentVehiclesByCompanyId } from '../../service/vehicleService';

interface Props{
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  // Status Count
  const { statusCount } = useStatusCount();

  const [vehicles, setVehicles] = useState<Vehicle[] | null | undefined>();
  const [notFoundRecentVehicles, setNotFoundRrecentVehicles] = useState<boolean>(false);

  const imageNotFoundVehicles = require("../../assets/images/errors/not-found-vehicles.png");

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles(){
    
    const response: Vehicle[] | null | undefined = await getRecentVehiclesByCompanyId();

    if(response){

      if(response.length === 0){
        setNotFoundRrecentVehicles(true);
      }

      setVehicles(response);
    }
  }

  return(
      <View style={styles.container}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 2, maxHeight: 145}}>
            <View style={styles.infosContainer} >
                <InfoCard icon="car" amount={statusCount?.active ?? 0} title="Veículos Ativos" color={colors.icon.green}/>
                <InfoCard icon="wrench" amount={statusCount?.maintenance ?? 0} title="Em Manutenção" color={colors.icon.yellow}/>
                <InfoCard icon="alert" amount={statusCount?.alert ?? 0} title="Em Alerta" color={colors.icon.red}/>
            </View>
          </ScrollView>

          <View style={styles.actionContainer}>
            <Text style={styles.titles}>Ações rápidas</Text>

            <View style={styles.buttonContainer}>
                <ActionButton icon={'plus'} text={'Novo Veículo'} onPress={() => navigation.navigate('AddVehicle')}/>
                <ActionButton icon={'chart-bar'} text={'Relatórios'} onPress={() => navigation.navigate('BottomNavigation', {screen: 'Relatórios'})}/>
            </View>
          </View>

          <View style={styles.recentVehiclesContainer}>
            <Text style={[styles.titles, {paddingHorizontal:15}]}>Veículos recentes</Text>

            {
              notFoundRecentVehicles ? (
                <View style={styles.notFoundVehiclesContainer}>
                  <Image source={imageNotFoundVehicles} style={styles.notFoundVehiclesImage}/>
                  <Text style={styles.notFoundVehiclesText}>Nenhum veículo encontrado, adicione um novo veículo!</Text>
                </View>
              ) : (
                <FlatList 
                data={vehicles}
                keyExtractor={ item => String(item.id)}
                renderItem={ ({ item }) => <VehicleListTile vehicle={item} navigation={navigation} isVehicles={false}/>}
                onEndReachedThreshold={1} 
                style={styles.list}
                ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
                />
              )
            }
          </View>
      </View>
  );
  
}

