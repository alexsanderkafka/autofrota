import React, { useState, useRef } from 'react';
import imageMap from '../service/image';
import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Animated
} from 'react-native';
import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AddNewMaintenance from './modal/AddNewMaintenance';
import Checklist from './modal/CheckList';

const { height } = Dimensions.get('window');

interface Props{
  navigation: any;
  route: any;
}

export default function Vehicle({ navigation, route }: Props) {

  const [visible, setVisible] = useState(false);
  const [visibleChecklist, setVisibleChecklist] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current; // começa fora da tela
  const slideAnimCheckList = useRef(new Animated.Value(height)).current; // começa fora da tela

  const data = route.params;

  var vehicleId = data.vehicle_characteristic.id;

  console.log(vehicleId);

  var dateNextMaintenance = new Date(data.maintenance.next_maintenance).toLocaleDateString('pt-BR');
  var dateLatestFuel = new Date(data.fuel.latest_fuel).toLocaleDateString('pt-BR');

  let image = imageMap[data.image_perfil] || require("../../assets/images/gol.jpg");

  function handleDriverButton() {
    
  }

  function goToFuel(){
    navigation.navigate('Fuel', vehicleId);
  }

  function goToMaintenance(){
    navigation.navigate('Maintenance', vehicleId);
  }

  function openModalAddMaitenance(){
          setVisible(true);
          Animated.timing(slideAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
          }).start();
  }

  function openChecklistModal(){
    setVisibleChecklist(true);
    Animated.timing(slideAnimCheckList, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    }).start();
}

  return (
    <View style={styles.container}>
        <ScrollView>
          <Image
            source={image}
            style={styles.img}
          />

          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.identificationCard}>
              <View style={styles.leftColumn}>
                <Text style={styles.plate}>BRA2E19</Text>
                <Text style={styles.textInfo}>Fiat Mobi</Text>

                <View style={styles.containerWithIcon}>
                  <Image source={require('../../assets/icons/km.png')} style={{ width: 12, height: 12 }} />
                  <Text style={styles.textInfo}>79.000km</Text>
                </View>

                <View style={styles.containerWithIcon}>
                  <Icon name="gas-station" size={12} color={colors.icon.mainBlue} />
                  <Text style={styles.textInfo}>Flex</Text>
                </View>
              </View>

              <View style={styles.rightColumn}>
                <View style={styles.statusContainer}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Ativo</Text>
                </View>

                <TouchableOpacity style={styles.driverButton} onPress={ () => {}}>
                  <Text style={{ color: colors.text.white, fontSize: 13 }}>Dirigir</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.fuelContainer}>
              <Text style={styles.title}>Último abastecimento</Text>

              <View style={styles.fuelCard}>

                <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                  <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>00/00/2030</Text>
                  </View>

                  <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                  <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>R$ 500,00</Text>
                  </View>

                  <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                  <View style={styles.row}>
                    <Icon name="gas-station" size={24} color={colors.icon.mainBlue} />
                    <Text>78.990km</Text>
                  </View>

                  <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                  <View style={styles.row}>
                    <Icon name="gas-station" size={24} color={colors.icon.mainBlue} />
                    <Text>Gasolina</Text>
                  </View>

                  <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                  <View style={styles.row}>
                    <Icon name="fuel" size={24} color={colors.icon.mainBlue} />
                    <Text>70L</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.cardButton} onPress={ goToFuel }>
                  <Text style={{ color: colors.text.white, fontSize: 13 }}>Abastecimentos</Text>
                </TouchableOpacity>

              </View>

            </View>

            <View style={styles.maintenanceContainer}>
              <Text style={styles.title}>Último abastecimento</Text>

              <View style={styles.maintenanceCard}>

                <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                  <View style={styles.row}>
                    <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                    <Text>00/00/2030</Text>
                  </View>

                  <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                  <View style={styles.row}>
                    <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                    <Text>R$ 500,00</Text>
                  </View>

                  <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                  <View style={styles.row}>
                    <Icon name="wrench" size={24} color={colors.icon.mainBlue} />
                    <Text>Serviços feitos:</Text>
                  </View>

                  <View style={styles.serviceBoxMade}>
                    <View style={styles.serviceMade}>
                      <Text style={{ color: colors.text.white, fontSize: 10 }}>Troca de óleo</Text>
                    </View>
                  </View>

    
                </View>

                <TouchableOpacity style={styles.cardButton} onPress={ goToMaintenance }>
                  <Text style={{ color: colors.text.white, fontSize: 13 }}>Manutenções</Text>
                </TouchableOpacity>

              </View>

            </View>

            <View style={styles.actionContainer}>
              <Text style={styles.title}>Ações</Text>

              <View style={styles.actionCard}>

                <TouchableOpacity style={styles.rowAction} onPress={openChecklistModal}>
                  <Text>Fazer checklist</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction}>
                  <Text>Relatório</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction}>
                  <Text>Trocar status</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

                <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>

                <TouchableOpacity style={styles.rowAction} onPress={ openModalAddMaitenance }>
                  <Text>Agendar manutenção</Text>
                  <Icon name="chevron-right" size={24} color={colors.icon.mainBlue} />
                </TouchableOpacity>

              </View>
            </View>
          </View>

        
        </ScrollView>

        {
          visibleChecklist && (
            <Checklist visible={setVisibleChecklist} slideAnim={slideAnimCheckList}/>
          )
        }

        {
          visible && (
            <AddNewMaintenance visible={setVisible} slideAnim={slideAnim}/>
          )
        }

        
    </View>
  );
}

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
  },
  fuelCard:{ 
    flexDirection: 'column',
    borderRadius: 5,
    backgroundColor: colors.primary.white,
    elevation: 2,
    marginTop: 15,
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
  maintenanceContainer:{
    marginTop: 26,
    width: '100%',
  },
  maintenanceCard:{
    flexDirection: 'column',
    borderRadius: 5,
    backgroundColor: colors.primary.white,
    elevation: 2,
    marginTop: 15,
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
    marginTop: 15,
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

/**
 *<View style={styles.identificationCardHeader}>  
                
                
              </View>
 * 
 * / */
