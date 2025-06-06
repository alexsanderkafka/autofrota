import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: '#000',
      backgroundColor: colors.primary.white,
    },
    infosContainer:{
      width: '100%',
      height: 'auto',
      marginTop: 30,
      marginBottom: 26,
      display: 'flex',
      flexDirection: 'row',
      gap: 15,
      marginHorizontal: 15
    },
    containerPicker:{
      width: '100%',
    },
    alertText:{
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    containerListTile:{
      width: '100%',
      height: 'auto',
      flexDirection: 'row',
      display: 'flex',
      borderColor: '#000',
      elevation: 5,
      backgroundColor: '#FFF',
      borderRadius: 5,
      padding: 3,
      marginBottom: 10,
    },
    mapContainer:{
      width: '100%',
      height: 'auto',
      paddingHorizontal: 15
    },
    titles:{
      fontSize: 16,
      marginBottom: 15
    },
    mapBox:{
      width: '100%',
      height: 262,
      borderRadius: 5,
      overflow: 'hidden'
    },
    map:{
      width: '100%',
      height: '100%',
    },
    actionContainer:{
      marginTop: 16,
      paddingHorizontal: 15,
    },
    buttonContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 18,
      //flexWrap: 'wrap',
    },
    recentVehiclesContainer:{
      marginTop: 26,
      flex: 1
    },
    list:{
      paddingHorizontal: 15,
      paddingBottom: 10,
    },
    img:{
      width: 131,
      height: 102.16,
      borderRadius: 5,
      marginRight: 8,
    },
    infoVehicle: {
      display: 'flex',
      width: 'auto',
    },
    plate:{
      fontWeight: 'bold',
      fontSize: 20,
    },
    vehicleCode:{
      fontSize: 12  
    },
    date:{
      fontSize: 10
    },
    alertIcon:{
      maxWidth: 199,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textAlertIcon:{
      fontSize: 9,
    },
    containerCenter:{
      width: '100%',
      height: '100%',
      alignItems: 'center',
      marginTop: 100
    },
    textNotFoundVehicles:{
      fontSize: 20,
      textAlign: 'center'
    },
    latestElement:{
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notFoundVehiclesContainer:{
      width: '100%',
      height: '100%',
      paddingHorizontal: 15,
      alignItems: 'center',
      
    },
    notFoundVehiclesImage:{
      width: 200,
      height: 200,
      marginBottom: 20
    },
    notFoundVehiclesText:{
      fontSize: 16,
      textAlign: 'center',
      fontStyle: 'italic'
    }
});

export default styles;