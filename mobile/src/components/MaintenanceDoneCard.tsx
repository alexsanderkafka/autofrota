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

interface MaintenanceCardProps {
    date: string;
    totalValue: number;
    services: any[];
    navigation: any;
    vehicleId: number;
    vehicle: boolean;
}

export default function MaintenanceCard(props: MaintenanceCardProps) {

    function goToMaintenance(){
        props.navigation.navigate('Maintenance', props.vehicleId);
    }

    return(
        <View style={styles.maintenanceCard}>
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>{props.date}</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
        
                <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>R$ {props.totalValue}</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
        
                <View style={styles.row}>
                    <Icon name="wrench" size={24} color={colors.icon.mainBlue} />
                    <Text>Serviços feitos:</Text>
                </View>
        
                <View style={styles.serviceBoxMade}>
                    <View style={styles.serviceMade}>
                        <Text style={{ color: colors.text.white, fontSize: 10 }}>Troca de óleo</Text>
                    </View>

                    {props.services.map((service: any, index: any) => (
                        console.log(service),
                        <View key={index} style={styles.serviceMade}>
                            <Text style={{ color: colors.text.white, fontSize: 10 }}>{service.type}</Text>
                        </View>
                    ))}
                </View>
            </View>
            
            {
                props.vehicle && (
                    <TouchableOpacity style={styles.cardButton} onPress={ goToMaintenance }>
                        <Text style={{ color: colors.text.white, fontSize: 13 }}>Manutenções</Text>
                    </TouchableOpacity>
                )

            }
        </View>
    );
}

const styles = StyleSheet.create({
    maintenanceCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
        marginVertical: 10
    },
    serviceBoxMade:{
        width: '100%',
        height: 116,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        borderColor: colors.primary.main,
        borderWidth: 1,
        marginTop: 10,
        padding: 5,

        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,

        marginBottom: 10
    },
    serviceMade:{
        height: 'auto',
        width: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardButton:{
        width: '100%',
        backgroundColor: colors.primary.main,
        height: 40,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});