import { StyleSheet } from 'react-native';
  
import  {
    colors,
    typography 
} from '../../theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage:{
      width: 169,
      height: 169,
    },
    loadingDescription:{
      fontSize: 13,
      color: '#000',
      fontWeight: 'light',
      marginTop: 10
    }  
});

export default styles;