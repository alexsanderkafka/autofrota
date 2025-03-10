import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-ico-material-design';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.logo}>
          <Icon
          name="car-front"
          height="72"
          width="72"
          color="#176585"
          style={{ marginRight: 13 }} 
          />
          <Icon
          name="car-front"
          height="72"
          width="72"
          color="#176585"
          style={{ marginRight: 13 }} 
          />
          <Icon
          name="car-front"
          height="72"
          width="72"
          color="#176585"
          />          
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27B1BF',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  loadingBar:{
    backgroundColor: '#000',

    width: '50px',
    height: '50px',
    marginTop: '10px'
  },
  informations:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo:{
    width: 'auto',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
