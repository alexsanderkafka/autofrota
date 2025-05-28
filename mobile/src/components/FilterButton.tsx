import React from 'react';
import { 
    Button,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import { colors } from '../theme';

interface Props{
    text: string;
    selected: boolean;
    onPress: () => void;
}


export default function FilterButton({ text, selected, onPress }: Props){
    return(
        <TouchableOpacity style={[styles.button, selected && styles.buttonSelected]}
        onPress={onPress}
        >
            <Text style={[styles.textButton, selected && styles.textButtonSelect]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        flex: 1,
        height: 'auto',
        paddingVertical: 9,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary.white,
        elevation: 2
    },
    textButton:{
        fontSize: 13,
        color: colors.text.primary
    },
    buttonSelected:{
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
    textButtonSelect:{
        fontSize: 13,
        color: colors.text.white
    },
});