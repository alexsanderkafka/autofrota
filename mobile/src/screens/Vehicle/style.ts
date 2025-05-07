import {
    StyleSheet,
} from 'react-native';

import { colors } from '../../theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary.white,
      flexDirection: 'column',
    },
    img:{
      width: '100%',
      height: 240,
      elevation: 2,
    },
    identificationCard:{
      marginTop: 26, 
      padding: 10,
      width: '100%',
      backgroundColor: colors.primary.white,
      borderRadius: 5,
      elevation: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftColumn:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    rightColumn:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    identificationCardHeader:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statusContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5
    },
    statusDot: {
      width: 8,
      height: 8,
      backgroundColor: colors.icon.green,
      borderRadius: 4,
      marginRight: 4,
    },
    plate:{
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    textInfo:{
      fontSize: 13,
      color: colors.text.primary,
    },
    containerWithIcon:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 5,
    },
    driverButton:{
      width: 98,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary.green,
      borderRadius: 5,
    },
    fuelContainer:{
      marginTop: 26,
      width: '100%',
    },
    title:{
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 15
    },
    
  
    row:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 7,
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
  
    doneMaintenanceContainer:{
      marginTop: 26,
      width: '100%',
    },
    
    serviceBoxMade:{
      width: '100%',
      height: 116,
      backgroundColor: colors.primary.white,
      borderRadius: 5,
      borderColor: colors.primary.main,
      borderWidth: 1,
      marginTop: 10,
      padding: 5
    },
  
    serviceMade:{
      height: 22,
      width: 89,
      backgroundColor: colors.primary.main,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionContainer:{
      marginTop: 26,
      width: '100%',
      marginBottom: 30,
    },
    actionCard:{
      flexDirection: 'column',
      borderRadius: 5,
      backgroundColor: colors.primary.white,
      elevation: 2,
      width: '100%',
      height: 'auto',
      padding: 10
    },
    rowAction:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 'auto'
    },
    statusText:{
  
    }
});

export default styles;