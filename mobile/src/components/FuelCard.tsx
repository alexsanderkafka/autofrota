import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';

import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fuel from '../types/fuel';

interface FuelCardProps {
    fuel: Fuel;
    navigation: any;
    vehicleId: number;
    screenVehicles: boolean;
}

export default function FuelCard(props: FuelCardProps) {

    function goToFuel(){
        props.navigation.navigate('Fuel', props.vehicleId);
    }

    const formatDate = new Date(props.fuel.date).toLocaleDateString('pt-BR');
    const totalValue = props.fuel.totalValue; //Colocar no padrão pt-br
    const km = props.fuel.km;
    const fuelType = props.fuel.fuelType;
    const liters = props.fuel.liters;

    return(
        <View style={styles.fuelCard}>
            <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>{formatDate}</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
        
                <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>R$ {totalValue}</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
        
                <View style={styles.row}>
                    <Icon name="gas-station" size={24} color={colors.icon.mainBlue} />
                    <Text>{km}km</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
        
                <View style={styles.row}>
                    <Icon name="gas-station" size={24} color={colors.icon.mainBlue} />
                    <Text>{fuelType}</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
        
                <View style={styles.row}>
                            <Icon name="fuel" size={24} color={colors.icon.mainBlue} />
                            <Text>{liters}L</Text>
                </View>
            </View>

            {
                props.screenVehicles && (
                    <TouchableOpacity style={styles.cardButton} onPress={ goToFuel }>
                        <Text style={{ color: colors.text.white, fontSize: 13 }}>Abastecimentos</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    fuelCard:{ 
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
        marginVertical: 10
    },
    cardButton:{
        width: '100%',
        backgroundColor: colors.primary.main,
        height: 40,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
});