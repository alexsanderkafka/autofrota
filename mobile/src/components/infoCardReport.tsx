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
    amount: string;
    title: string;
    color: string;
}

export default function InfoCardReport({ icon, amount, title, color}: Props){
    return(
        <View style={styles.card}>
            <Icon name={icon} size={24} color={color}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.count]}>{amount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        flex: 1,
        height: 'auto',
        paddingVertical: 15,
        paddingLeft: 10,
        elevation: 2,
        backgroundColor: '#FFF',
        borderRadius: 5,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 5
    },
    title:{
        color: colors.text.primary
    },
    count:{
        
    }
    
});