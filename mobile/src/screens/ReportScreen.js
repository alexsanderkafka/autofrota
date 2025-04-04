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
  
import { colors } from '../theme';

import FilterButton from '../components/FilterButton';
import InfoCardReport from '../components/infoCardReport';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ReportScreen(){
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.filterButtonContainer}>
                    <FilterButton text="Frota"/>
                    <FilterButton text="Manutenção"/>
                    <FilterButton text="Combustível"/>
                </View>

                <View style={styles.containerVehiclesInfos}>
                    <InfoCardReport icon="car" color={colors.icon.mainBlue} amount="500" title="Veículos"/>
                    <InfoCardReport icon="car" color={colors.icon.secondaray} amount="50000 km" title="Km rodados"/>
                    <InfoCardReport icon="currency-usd" color={colors.icon.money} amount="R$ 30.000,00" title="Gastos"/>
                </View>

                <View style={styles.chartContainer}>

                </View>

                <View style={styles.reportContainer}>
                    <Text style={styles.title}>Geração de relatório</Text>

                    <TouchableOpacity style={styles.reportButton}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../assets/icons/pdf.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        <Icon name="cloud-download" size={24} color={colors.icon.main}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reportButton}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../assets/icons/docx.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        <Icon name="cloud-download" size={24} color={colors.icon.main}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary.white,
        flex: 1,
        paddingHorizontal: 15
    },
    filterButtonContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between'
    },
    containerVehiclesInfos:{
        width: '100%',
        height: 'auto',
        marginTop: 26,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    chartContainer:{
        width: '100%',
        height: 255,
        marginTop: 26,
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5
    },
    reportContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 26,
        flexDirection: 'column',
        marginBottom: 15,
    },
    title:{
        fontSize: 16,
        marginBottom: 15
    },
    reportButton:{
        width: '100%',
        backgroundColor: colors.primary.white,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between'
    }
    
});