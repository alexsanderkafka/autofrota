import React, { useEffect, useState } from 'react';
import Icon from 'react-native-ico-material-design';
import imageMap from '../service/image';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
import { colors, typography } from '../theme';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Vehicle from '../types/vehicle';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props{
    vehicle: Vehicle;
    navigation: any;
    isVehicles: boolean;
}

export default function VehicleListTile({ vehicle, navigation, isVehicles = false}: Props){

  const [statusIconColor, setIconColor] = useState<string>(colors.icon.green);
  const [textStatus, setTextStatus] = useState<string>("Ativo");

  //console.log(data);

  //var latestDate = new Date(data.maintenance.latest_maintenance).toLocaleDateString('pt-BR');
  var nextDate = new Date("2025-09-12T03:00:00.000+00:00").toLocaleDateString('pt-BR');

  const image = vehicle.vehicleImage; // resolver o problema de uma imagem que não carrega

  //console.log(image);

  const imageKm = require("../../assets/icons/km.png");

  const iconColor = [
      {status: "active", color: colors.icon.green, text: "Ativo"},
      {status: "maintenance", color: colors.icon.yellow, text: "Em manutenção"},
      {status: "alert", color: colors.icon.red, text: "Aviso"},
      {status: "usage", color: colors.icon.mainBlue, text: "Em uso"}
  ]

  useEffect(() => {
    iconColor.forEach((item) => {
      if(item.status.toUpperCase() === vehicle.vehicleStatus){
        setIconColor(item.color);
        setTextStatus(item.text);
      }
    });
  }, [vehicle.vehicleStatus]);

  return(
        <TouchableOpacity style={[styles.containerListTile, {elevation: isVehicles ? 0 : 2}]} onPress={() => navigation.navigate('Vehicle', vehicle)}>
              <Image
              source={{ uri: image }}
              style={styles.img}
              />

              <View style={styles.infoVehicle}>
                <Text style={styles.plate}>{vehicle.plate}</Text>
                <Text style={styles.vehicleBrand}>{vehicle.brand}</Text>
                
                <View style={styles.alertContainer}>
                  <View style={[styles.alertIcon, {backgroundColor: statusIconColor}]}></View>
                  
                  <Text style={styles.textIcon}>{textStatus}</Text>

                </View>

                <View style={styles.kmContainer}>
                  <Image source={imageKm} style={styles.imageKm} />

                  <Text style={styles.textIcon}>{vehicle.km}km</Text>

                </View>

                <Text style={styles.nextMaintenance}>Moodelo: {vehicle.model}</Text>
              </View>
          </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerListTile:{
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      display: 'flex',
      elevation: 2,
      borderColor: '#000',
      backgroundColor: colors.primary.white,
      borderRadius: 5,
      padding: 5,
    },
    img:{
      width: 126,
      height: 98,
      borderRadius: 5,
      marginRight: 10,
    },
    infoVehicle: {
      display: 'flex',
      width: 'auto',
      height: 'auto',
      justifyContent: 'space-between',
    },
    plate:{
      fontWeight: 'bold',
      fontSize: 16,
    },
    vehicleBrand:{
      fontSize: 12,
    },
    alertContainer:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    alertIcon:{
      width: 5,
      height: 5,
      backgroundColor: colors.primary.green,
      borderRadius: '50%',
      marginRight: 5
    },
    textIcon:{
      fontSize: 9,
    },
    kmContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    imageKm:{
      width: 12,
      height: 12,
      marginRight: 5
    },
    nextMaintenance:{
      fontSize: 10
    }
  });
  