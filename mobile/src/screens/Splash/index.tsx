import React from 'react';
import { 
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import  {
  colors,
  typography
} from '../../theme';

import styles from './style';

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