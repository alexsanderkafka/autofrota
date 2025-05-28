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

interface Props{
    icon: string;
    text: string;
    onPress: () => void;
}

export default function({ icon, text, onPress }: Props){
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={icon} size={24} color={colors.primary.main} />
            <Text style={{ color: colors.text.other, fontSize: 13 }}>{text}</Text>
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