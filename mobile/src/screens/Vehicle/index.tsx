import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';
import { colors } from '../../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FuelCard from '../../components/FuelCard';
import MaintenanceDoneCard from '../../components/MaintenanceDoneCard';
import ScheduledMaintenanceCard from '../../components/ScheduledMaintenanceCard';
import useLastFuel from '../../hooks/useLastFuel';
import useLastMaintenance from '../../hooks/useLastMaintenance';
import useNextMaintenance from '../../hooks/useNextMaintenance';
import styles from './style';

interface Props{
  navigation: any;
  route: any;
}

export default function Vehicle({ navigation, route }: Props) {

  const data = route.params;

  //Infos do veículo
  const image: string = data.vehicleImage;
  const vehicleModel: string = data.model;
  const vehicleBrand: string = data.brand;
  const vehiclePlate: string = data.plate;
  const fuel: string = data.typeFuel;
  const km: string = data.km;
  const status: string = data.vehicleStatus;
  const vehicleId = data.id;
  const category: string = data.category;

  //Get last fuel, last maintenance and next maintenance using api
  const { lastFuel } = useLastFuel(vehicleId);
  const { lastMaintenance } = useLastMaintenance(vehicleId);
  const { nextMaintenance} = useNextMaintenance(vehicleId);

  return (
    <View style={styles.container}>
        <ScrollView>
          <Image
            source={{ uri:image }}
            style={styles.img}
          />

          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.identificationCard}>
              <View style={styles.leftColumn}>
                <Text style={styles.plate}>{vehiclePlate}</Text>
                <Text style={styles.textInfo}>{vehicleBrand} {vehicleModel}</Text>

                <View style={styles.containerWithIcon}>
                  <Image source={require('../../../assets/icons/km.png')} style={{ width: 12, height: 12 }} />
                  <Text style={styles.textInfo}>{km}km</Text>
                </View>

                <View style={styles.containerWithIcon}>
                  <Icon name="gas-station" size={12} color={colors.icon.mainBlue} />
                  <Text style={styles.textInfo}>{fuel}</Text>
                </View>
              </View>

              <View style={styles.rightColumn}>
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>{status}</Text>
                </View>
              </View>
            </View>

            {
                lastFuel !== null && ( 
                  <View style={styles.fuelContainer}>
                    <Text style={styles.title}>Último abastecimento</Text>
                    <FuelCard
                    fuel={lastFuel}
                    navigation={navigation}
                    vehicleId={vehicleId}
                    screenVehicles={true}
                    />
                  </View>
                )
            }
          

            {
                lastMaintenance !== null && (
                  <View style={styles.doneMaintenanceContainer}>
                      <Text style={styles.title}>Última manutenção</Text>
                      <MaintenanceDoneCard
                      maintenance={lastMaintenance}
                      navigation={navigation}
                      vehicle={true}
                      />
                  </View>     
                )
            }

            {
                nextMaintenance !== null && (
                  <View style={styles.doneMaintenanceContainer}>
                    <Text style={styles.title}>Manutenção agendada</Text>
                    <ScheduledMaintenanceCard
                    maintenance={nextMaintenance}
                    navigation={navigation}
                    vehicle={true}
                    />
                  </View>
                )
            }
            

            <View style={styles.actionContainer}>
              <Text style={styles.title}>Ações</Text>

              <View style={styles.actionCard}>

                <TouchableOpacity style={styles.rowAction} onPress={() => navigation.navigate('Checklist', vehicleId)}>
                  <Text>Fazer checklist</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction}>
                  <Text>Relatório</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction}>
                  <Text>Trocar status</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction} onPress={() => navigation.navigate('AddNewMaintenance', vehicleId)}>
                  <Text>Adicionar nova manutenção</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction} onPress={() => navigation.navigate('AddNewFuel', vehicleId)}>
                  <Text>Adicionar novo Abastecimento</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

              </View>
            </View>
          </View>

        
        </ScrollView>
    </View>
  );
}