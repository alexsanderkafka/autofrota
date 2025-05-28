import { StyleSheet } from 'react-native';
  
import { colors } from '../../theme';

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.primary.white,
        flex: 1,
        
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
        height: 270,
        marginTop: 26,
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    valueChart:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    dataChart:{
        fontSize: 16
    },
    chart:{
        height: 200,
        width: '100%'
    },
    titleChart:{
        fontSize: 16,
        fontWeight: '500'
    },
    chartHeader:{
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    scrollView:{
        paddingHorizontal: 15
    }
    
});

export default styles;