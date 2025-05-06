import { StyleSheet } from 'react-native';
  
import { colors } from '../../theme';

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary.white,
        flex: 1,
        paddingHorizontal: 15
    },
    filterButtonContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between'
    },
    containerVehiclesInfos:{
        width: '100%',
        height: 'auto',
        marginTop: 26,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
    },
    chartContainer:{
        width: '100%',
        height: 255,
        marginTop: 26,
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5
    },
    reportContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 26,
        flexDirection: 'column',
        marginBottom: 15,
    },
    title:{
        fontSize: 16,
        marginBottom: 15
    },
    reportButton:{
        width: '100%',
        backgroundColor: colors.primary.white,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between'
    }
    
});

export default styles;