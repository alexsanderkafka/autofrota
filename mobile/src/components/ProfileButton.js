import React from 'react';
import { 
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { colors } from '../theme';

export default function ProfileButton(){
    return(
        <TouchableOpacity style={styles.profileButtonButton}>
            <Text>Teste TEste</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    profileButtonButton:{
        width: '100%',
        height: 68,
        backgroundColor: colors.primary.white,
        elevation: 2,
        borderRadius: 5,
    }
})