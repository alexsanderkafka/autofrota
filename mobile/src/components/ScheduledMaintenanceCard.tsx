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
import Maintenance from '../types/maintenance';

interface MaintenanceCardProps {
    maintenance: Maintenance
    navigation: any;
    vehicle: boolean;
}

export default function ScheduledMaintenanceCard(props: MaintenanceCardProps) {

    function goToMaintenance(){
        props.navigation.navigate('UpdateScheduledMaintenance', props.maintenance);
    }

    const formatDate = new Date(props.maintenance.date).toLocaleDateString('pt-BR');

    return(
        <View style={styles.maintenanceCard}>
            <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>{formatDate}</Text>
                </View>
        
                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1}}/>
    
        
                <View style={styles.row}>
                    <Icon name="alert-box" size={24} color={colors.icon.mainBlue} />
                    <Text>Observações:</Text>
                </View>

                <Text style={styles.observation}>{ props.maintenance.observation }</Text>
            </View>

            {
                props.vehicle && (
                    <TouchableOpacity style={styles.cardButton} onPress={ goToMaintenance }>
                        <Text style={{ color: colors.text.white, fontSize: 13 }}>Editar</Text>
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
    },
    observation:{
        fontSize: 13,
        textAlign: 'justify',
        marginBottom: 10
    },

});