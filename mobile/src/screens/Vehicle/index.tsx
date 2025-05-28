import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Animated,
    Modal,
    Pressable
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

import { Picker } from '@react-native-picker/picker';
import { getVehicleById, updateVehicleStatus } from '../../service/vehicleService';
import VehicleType from '../../types/vehicle';
import { getHistoryVehiclePdf } from '../../service/reportService';

import * as Sharing from 'expo-sharing';

interface Props{
  navigation: any;
  route: any;
}

export default function Vehicle({ navigation, route }: Props) {

  const data = route.params;
  const vehicleId = data.id;

  //Infos do veículo
  const image: string = data.vehicleImage;
  const vehicleModel: string = data.model;
  const vehicleBrand: string = data.brand;
  const vehiclePlate: string = data.plate;
  const fuel: string = data.typeFuel;
  const km: string = data.km;
  const [status, setStatus] = useState<string>(data.vehicleStatus);
  const category: string = data.category;

  //Get last fuel, last maintenance and next maintenance using api
  const { lastFuel } = useLastFuel(vehicleId);
  const { lastMaintenance } = useLastMaintenance(vehicleId);
  const { nextMaintenance} = useNextMaintenance(vehicleId);

  //Status color
  const [statusIconColor, setIconColor] = useState<string>(colors.icon.green);
  const [textStatus, setTextStatus] = useState<string>("Ativo");

  //pdf
  const [urlPdf, setUrlPdf] = useState<string | null>();

  const iconColor = [
        {status: "active", color: colors.icon.green, text: "Ativo"},
        {status: "maintenance", color: colors.icon.yellow, text: "Em manutenção"},
        {status: "alert", color: colors.icon.red, text: "Aviso"}
  ]

  //Picker
  const [selectedValue, setSelectedValue] = useState('opcao1');
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
      iconColor.forEach((item) => {
        if(item.status.toUpperCase() === status.toUpperCase()){
          setIconColor(item.color);
          setTextStatus(item.text);
        }
      });
  }, [status]);

  async function changeStatus(status: string){
    const response: number = await updateVehicleStatus(status, vehicleId);

    if(response === 204) {
      setStatus(status);
      console.log("Atualizado com sucesso");
      return;
    }

    //Voltar algum error??    
  }

  function getPdf(){
    const response = getHistoryVehiclePdf(vehicleId).then(async (res) => {
      setUrlPdf(res)
      await openPdf(res!);
    });
  }

  async function openPdf(url: string){
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(url);
    } else {
      console.log("ERror ao abrir o pdf")
    }
    
    return;
  }


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
                  <View style={[styles.statusDot, {backgroundColor: statusIconColor}]} />
                  <Text style={styles.statusText}>{textStatus}</Text>
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

                <TouchableOpacity style={styles.rowAction} onPress={getPdf}>
                  <Text>Relatório</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction} onPress={() => setPickerVisible(true)}>
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

        <Modal
        visible={pickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                setPickerVisible(false); // Fecha ao selecionar
                changeStatus(itemValue);
              }}
              dropdownIconColor={colors.icon.white}
              style={{ color: colors.text.white }} 
            >
              {
                iconColor.map((item, index) => {
                  return (
                    <Picker.Item key={index} label={item.text} value={item.status} />
                  )
              })
              }
              
            </Picker>
          </View>
          </View>
        </Modal>
    </View>
  );
}

/**
 * <Picker.Item label="Opção 1" value="opcao1"/>
              <Picker.Item label="Opção 2" value="opcao2"/>
              <Picker.Item label="Opção 3" value="opcao3"/>
 */