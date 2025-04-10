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

interface Props{
    data: any;
    navigation: any;
}


export default function MaintenanceListTile({ data, navigation}: Props){

    var nextMaintenance = new Date(data.next_maintenance).toLocaleDateString('pt-BR');
    //var dayMaintenance = new Date(data.date_maintenance).toLocaleDateString('pt-BR');

    var statusColor = data.status === "atrasada" ? "#AB0C0C" : "#00A843";
    var dayDate = data.status === "feita" ? data.date_maintenance : "Não realizada";

    return(
        <View style={styles.maintenance}>
            <View style={styles.informations}>
                <Text style={styles.textInformations}>Data prevista: </Text>
                <Text style={styles.textInformations}>{nextMaintenance}</Text>
            </View>

            <View style={styles.informations}>
                <Text style={styles.textInformations}>Data da manutenção: </Text>
                <Text style={styles.textInformations}>{dayDate}</Text>
            </View>

            <View style={styles.informations}>
                <Text style={styles.textInformations}>Situação: </Text>
                <Text style={[styles.textInformations, { color: `${statusColor}`}]}>{data.status.toUpperCase()}</Text>
            </View>

            <Text style={styles.observation}>
                 Observação:
            </Text>

            <Text style={styles.informationObservation}>
                {data.observation}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    maintenance:{
        marginTop: 10,
        width: '100%',
        backgroundColor: '#FFF',
        height: 'auto',
        borderRadius: 5,
        borderColor: '#000',
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
    },
    informations:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    textInformations:{
        flexShrink: 1,
        fontSize: 16,
    },
    observation:{
        fontSize: 16,
        marginBottom: 10,
        marginTop: 14
    },
    informationObservation:{
        marginBottom: 16,    
    },
});