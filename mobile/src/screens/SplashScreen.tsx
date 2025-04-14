import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import  {
  colors,
  typography
} from '../theme';

export default function SplashScreen() {

  const logo = require('../../assets/logo/image.jpg');
  

  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logoImage}/>
        <ActivityIndicator size="large" color={colors.primary.main}/>
        <Text style={styles.loadingDescription}>Carregando recursos...</Text>
    </View>
  );
}

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
