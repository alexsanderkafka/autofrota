import React from 'react';
import { 
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme';

export default function({ icon, text }){
    return(
        <TouchableOpacity style={styles.button}>
            <Icon name={icon} size={24} color={colors.primary.main} />
            <Text style={{ colors: colors.text.other, fontSize: 13 }}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        flex: 1,
        height: 'auto',
        paddingVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#FFF',
        borderRadius: 5
    }
});