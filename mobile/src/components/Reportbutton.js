import React from 'react';
import { 
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { colors } from '../theme';

export default function ReportButton(){
    return(
        <TouchableOpacity style={styles.reportButton}>
            <Text>Teste TEste</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    reportButton:{
        width: '100%',
        height: 50,
        backgroundColor: colors.primary.white,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 20
    }
});