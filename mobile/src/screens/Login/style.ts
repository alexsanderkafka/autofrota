import { StyleSheet } from 'react-native';

import {
    colors,
    typography
} from '../../theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      paddingVertical: 30,
      paddingHorizontal: 15,
    },
    logoImage:{
      width: 169,
      height: 169,
      marginBottom: 10,
      marginTop: 20
    },
    welcomeTitle:{
      fontSize: 22,
      fontWeight: 'bold',
      fontFamily: typography.fontFamily.primary,
      marginBottom: 4,
    },
    welcomeDescription:{
      fontSize: 13,
      marginBottom: 62
    },  
    textLogin:{
      fontSize: 35,
      marginBottom: 35,
      color: '#176585',
      fontWeight: 'bold'
    },
    inputContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      fontSize: 18,
      color: '#000',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border.main,
      marginBottom: 15,
      paddingVertical: 11,
      paddingHorizontal: 10,
      justifyContent: 'space-between'
    },
    inputs:{
      padding: 0,
      marginLeft: 5,
      fontSize: 15,
      flex: 1,
    },
    eyeBtn:{
      marginLeft: 10
    },
    containerActions:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 20,
      marginTop: 7
    },
    checkBox:{
      width: 24,
      height: 24,
      borderWidth: 1,
      borderColor: colors.border.main,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      borderRadius: 5,
    },
    textForgerPassword:{
      color: '#176585',
      fontStyle: 'italic',
    },
    btn:{
      width: "100%",
      backgroundColor: colors.primary.main,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
      paddingVertical: 12,
      paddingHorizontal: 38,
      marginBottom: 30
    },
    btnText:{
      fontSize: 16,
      color: colors.text.white,
    },
    alert:{
      position: 'absolute',
      bottom: 20,
      width: '100%',
      backgroundColor: '#FF0000',
      borderRadius: 5,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textAlert:{
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff'
    },
    textCreateAccount:{
  
    }
  
});

export default styles;