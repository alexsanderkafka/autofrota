import React from 'react';
import Icon from 'react-native-ico-material-design';

import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground
} from 'react-native';

export default function VehicleScreen() {
  return (
    <SafeAreaView style={styles.container}>
        
        <View style={styles.containerBtn}>
          <ImageBackground
          source={require("../../assets/background/add.jpg")}
          style={styles.img}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5 }}
          >
            <View style={styles.overlay}>
              <View style={styles.boxText}>
                <Text style={styles.text}>Tire fotos do veículo</Text>
              </View>
            </View>
            <Icon
            name="warning-sign"
            height="24"
            width="24"
            color="#AB0C0C"
            style={styles.icon}
            />
          </ImageBackground>

          <ImageBackground
          source={require("../../assets/background/add.jpg")}
          style={styles.img}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5 }}
          >
            <View style={styles.overlay}>
              <View style={styles.boxText}>
                <Text style={styles.text}>Dados operacionais</Text>
              </View>
            </View>
            <Icon
            name="warning-sign"
            height="24"
            width="24"
            color="#AB0C0C"
            style={styles.icon}
            />
          </ImageBackground>
        </View>

        <View style={styles.containerBtn}>
          <ImageBackground
          source={require("../../assets/background/add.jpg")}
          style={styles.img}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5 }}
          >
            <View style={styles.overlay}>
              <View style={styles.boxText}>
                <Text style={styles.text}>Identificação</Text>
              </View>
            </View>
            <Icon
            name="warning-sign"
            height="24"
            width="24"
            color="#AB0C0C"
            style={styles.icon}
            />
          </ImageBackground>

          <ImageBackground
          source={require("../../assets/background/add.jpg")}
          style={styles.img}
          resizeMode='cover'
          imageStyle={{ borderRadius: 5 }}
          >
            <View style={styles.overlay}>
              <View style={styles.boxText}>
                <Text style={styles.text}>Dados adicionais</Text>
              </View>
            </View>
            <Icon
            name="warning-sign"
            height="24"
            width="24"
            color="#AB0C0C"
            style={styles.icon}
            />
          </ImageBackground>

        </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#FFF',
    flexDirection: 'column'
  },
  containerBtn:{
    width: '100%',
    height: 'auto',
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24
  },
  img:{
    width: 160,
    height: 220,
    borderRadius: 5,
    elevation: 5,
  },
  boxText:{
    width: 128,
    height: 58,
    borderColor: '#FFF',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon:{
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});
