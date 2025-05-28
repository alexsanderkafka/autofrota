import { useEffect, useRef } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity
 } from "react-native";

 import * as Animatable from 'react-native-animatable';
import Icon from "react-native-ico-material-design";

interface Props {
    text: string;
    isError: boolean;
}

export default function Notify({text, isError}: Props) {

    const animatedOpacity = useRef(new Animated.Value(1)).current;

    useEffect( () => {
        Animated.sequence([
            Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false, 
        })
        ]).start();
      }, []);

      /**
       * Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false, 
        })
       */

    return (
        <Animatable.View style={[isError ? styles.errorContainer : styles.sucessContainer, {opacity: animatedOpacity}]} animation="fadeIn" duration={500}>
            <Text style={styles.text}>{text}</Text>
        </Animatable.View>
    );

}

const styles = StyleSheet.create({
    errorContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999, 
        width: '100%',
        height: 'auto',
        backgroundColor: '#FF0000',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sucessContainer:{
        width: '100%',
        height: 'auto',
        backgroundColor: '#00A843',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFF',
        fontSize: 16,
    }
});