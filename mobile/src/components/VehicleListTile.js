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

export default function VehicleListTile({ data, navigation}){

    //console.log(data);

    //var latestDate = new Date(data.maintenance.latest_maintenance).toLocaleDateString('pt-BR');
    var nextDate = new Date(data.maintenance.next_maintenance).toLocaleDateString('pt-BR');

    let image = imageMap[data.image_perfil] || require("../../assets/images/gol.jpg");

    const imageKm = require("../../assets/icons/km.png");

    return(
        <TouchableOpacity style={styles.containerListTile} onPress={() => navigation.navigate('Vehicle', data)}>
            <Image
            source={image}
            style={styles.img}
            />

            <View styles={styles.img}></View>

            <View style={styles.infoVehicle}>
              <Text style={styles.plate}>{data.plate}</Text>
              <Text style={styles.vehicleBrand}>Fiat Mobi</Text>
              
              <View style={styles.alertContainer}>
                <View style={styles.alertIcon}></View>
                
                <Text style={styles.textIcon}>Ativo</Text>

              </View>

              <View style={styles.kmContainer}>
                <Image source={imageKm} style={styles.imageKm} />

                <Text style={styles.textIcon}>79.000km</Text>

              </View>

              <Text style={styles.nextMaintenance}>Próxima manutenção: {nextDate}</Text>
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
      borderColor: '#000',
      elevation: 2,
      backgroundColor: '#FFF',
      borderRadius: 5,
      padding: 5,
      marginBottom: 20,
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
  