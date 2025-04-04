import React from 'react';
import { 
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import { colors } from '../theme';

export default function FilterButton({ text }){
    return(
        <TouchableOpacity style={styles.filter}>
            <Text style={styles.textButton}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    filter:{
        flex: 1,
        height: 'auto',
        paddingVertical: 9,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary.main,
        elevation: 2
    },
    textButton:{
        fontSize: 13,
        color: colors.text.white
    }
});