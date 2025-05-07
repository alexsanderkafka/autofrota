import React, { useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native';
  
import { colors } from '../../theme';

import FilterButton from '../../components/FilterButton';
import InfoCardReport from '../../components/infoCardReport';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import useReport from '../../hooks/useReport';

export default function ReportScreen(){

    const { report } = useReport();

    console.log(report);

    const totalVehicles: number = report ? report!.totalVehicles : 0;
    const totalKm: number = report ? report!.totalKm : 0;
    const totalExpenseFuel: number = report ? report!.totalExpenseFuel : 0;
    const totalExpenseMaintenance: number = report ? report!.totalExpenseMaintenance : 0;

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.filterButtonContainer}>
                    <FilterButton text="Frota"/>
                    <FilterButton text="Manutenção"/>
                    <FilterButton text="Combustível"/>
                </View>

                <View style={styles.containerVehiclesInfos}>
                    <InfoCardReport icon="car" color={colors.icon.mainBlue} amount={totalVehicles.toString()} title="Veículos"/>
                    <InfoCardReport icon="car" color={colors.icon.secondaray} amount={`${totalKm} Km`} title="Km rodados"/>
                    <InfoCardReport icon="currency-usd" color={colors.icon.money} amount={`R$ ${totalExpenseFuel.toFixed(2)}`} title="Gastos"/>
                </View>

                <View style={styles.chartContainer}>

                </View>

                <View style={styles.reportContainer}>
                    <Text style={styles.title}>Geração de relatório</Text>

                    <TouchableOpacity style={styles.reportButton}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../../assets/icons/pdf.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        <Icon name="cloud-download" size={24} color={colors.icon.main}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reportButton}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../../assets/icons/docx.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        <Icon name="cloud-download" size={24} color={colors.icon.main}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}