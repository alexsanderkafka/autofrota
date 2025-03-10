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

export default function VehicleListTile({ data, navigation}){

    var latestDate = new Date(data.maintenance.latest_maintenance).toLocaleDateString('pt-BR');
    var nextDate = new Date(data.maintenance.next_maintenance).toLocaleDateString('pt-BR');

    let image = imageMap[data.image_perfil] || require("../../assets/images/gol.jpg");

    return(
        <TouchableOpacity style={styles.containerListTile} onPress={() => navigation.navigate('Vehicle', data)}>
            <Image
            source={image}
            style={styles.img}
            />

            <View styles={styles.img}></View>

            <View style={styles.infoVehicle}>
            <Text style={styles.plate}>Placa: {data.plate}</Text>
            <Text style={styles.vehicleCode}>Código: {data.vehicle_code !== "" ? data.vehicle_code : "Sem código"}</Text>
            
            <Text style={styles.date}>Data da última manutenção: {latestDate}</Text>
            <Text style={styles.date}>Data da próxima manutenção: {nextDate}</Text>

            <View style={styles.alertIcon}>

                <Icon
                name="check-symbol"
                height="24"
                width="24"
                color="#00A843"
                style={{ marginRight: 13 }} 
                />

                <Text style={styles.textAlertIcon}>Nenhuma observação.</Text>

            </View>
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
    }
  });
  