import {  
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { colors } from "../theme";

interface Props{
    text: string;
    selected: boolean;
    onPress: () => void;
}

export default function VehicleFilter({ text, selected, onPress }: Props){
    return(
        <TouchableOpacity style={[styles.button, selected && styles.buttonSelected]} onPress={onPress}>
            <Text style={[styles.textButton, selected && styles.selectedText]}>{text}</Text>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    button:{
        width: 'auto',
        height: 'auto',
        paddingVertical: 9,
        paddingHorizontal: 37,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary.white,
        elevation: 2
    },
    buttonSelected:{
        width: 'auto',
        height: 'auto',
        paddingVertical: 9,
        paddingHorizontal: 37,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary.main,
        elevation: 2
    },
    textButton:{
        fontSize: 13,
        color: colors.text.primary
    },
    selectedText:{
        fontSize: 13,
        color: colors.text.white
    }
});