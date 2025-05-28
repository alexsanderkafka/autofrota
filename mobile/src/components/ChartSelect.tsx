import { useState, useRef, useEffect} from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Text,
    Modal,
    FlatList
} from 'react-native'

import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props{
    selectedData: number;
    onPress: () => void;
}

export default function ChartSelect({selectedData, onPress}: Props){

    /*
    let ano = new Date().getFullYear();

    while (ano >= 1990) {
        years.push();
        ano--;
    }*/

    
    return(
        <TouchableOpacity style={[{
            flex: 1,
            height: 'auto',
            position: 'relative'
        }, styles.selected ]}
        onPress={onPress}
        >
            <Text style={{ fontSize: 10, marginLeft:10, color: colors.primary.white }}>{selectedData}</Text>
            <Icon name="chevron-down" size={20} color={colors.primary.white} style={{ marginRight: 10}} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    selected:{
        maxWidth: '30%',
        height: 38,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    iconContainer:{
        backgroundColor: colors.primary.main,
        width: 38,
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    itens:{
        backgroundColor: colors.primary.white,
        width: '100%',
        height: 'auto',
        elevation: 2,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 1000
    },
    item:{
        padding: 10
    },
    list:{
        
    }
});