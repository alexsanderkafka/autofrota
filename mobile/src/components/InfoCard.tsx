import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';
import { colors } from '../theme';

interface Props{
    icon: string;
    amount: number;
    title: string;
    color: string;
}


export default function InfoCard({ icon, amount, title, color}: Props){
    return(
        <View style={styles.card}>

            <View style={styles.infoCardHeader}>
                <Icon name={icon} size={24} color={color}/>
                <Text style={[styles.count, { color: color }]}>{amount}</Text>
            </View>
    

            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        width: 134,
        height: 'auto',
        padding: 10,
        elevation: 2,
        backgroundColor: '#FFF',
        borderRadius: 5
    },
    infoCardHeader:{
        display: 'flex',
        flexDirection: 'row',
        fontSize: 13,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        marginTop: 11,
        color: colors.text.secondaray
    },
    count:{

    }
    
});