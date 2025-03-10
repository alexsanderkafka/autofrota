import React from 'react';
import Icon from 'react-native-ico-material-design';
import imageMap from '../service/image';
import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

export default function Vehicle({ navigation, route }) {

  const data = route.params;

  var vehicleId = data.vehicle_characteristic.id;

  console.log(vehicleId);

  var dateNextMaintenance = new Date(data.maintenance.next_maintenance).toLocaleDateString('pt-BR');
  var dateLatestFuel = new Date(data.fuel.latest_fuel).toLocaleDateString('pt-BR');

  let image = imageMap[data.image_perfil] || require("../../assets/images/gol.jpg");

  function renderMaintenance(){
    if(data.maintenance.id == null){
      return(
        <View style={styles.nextMain}>
          
          <Text style={styles.textIdentification}>Próxima manutenção</Text>
          <Text style={styles.textWithoutHistory}>Nenhum histórico de manutenção</Text>
          <View style={styles.containerBtn}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Maintenance')}
                  >
                      <Icon
                      name="right-arrow-forward"
                      height="24"
                      width="24"
                      color="#176585"
                      style={{ marginRight: 13 }}
                      />
                  </TouchableOpacity>
            </View>
        </View>
      );
    }else{
      return(
      <View style={styles.nextMain}>
              <Text style={styles.textIdentification}>Próxima manutenção</Text>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Data:</Text>
                  <Text style={styles.textInformations}>{dateNextMaintenance}</Text>
              </View>

            <Text style={styles.observacao}>
              Observação:
            </Text>

            <Text style={styles.observacaoInformacao}>
              {data.maintenance.observation}
            </Text>

            <View style={styles.containerBtn}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Maintenance', vehicleId)}
                  >
                      <Icon
                      name="right-arrow-forward"
                      height="24"
                      width="24"
                      color="#176585"
                      style={{ marginRight: 13 }}
                      />
                  </TouchableOpacity>
            </View>
          </View>);
    }
  }

  function renderFuel(){
    if(data.fuel.id == null){
      return(
        <View style={styles.abastecimento}>
              <Text style={styles.textIdentification}>Último abastecimento</Text>

              <Text style={styles.textWithoutHistory}>Nenhum histórico de abastecimento.</Text>

              <View style={styles.containerBtn}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Fuel')}
                  >
                      <Icon
                      name="right-arrow-forward"
                      height="24"
                      width="24"
                      color="#176585"
                      style={{ marginRight: 13 }} 
                      />
                  
                  </TouchableOpacity>
              </View>

          </View>
      );
    }else{
      return(
        <View style={styles.abastecimento}>
              <Text style={styles.textIdentification}>Último abastecimento</Text>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Data</Text>
                  <Text style={styles.textInformations}>{dateLatestFuel}</Text>
              </View>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Valor</Text>
                  <Text style={styles.textInformations}>R$ {data.fuel.price.toFixed(2).replace('.', ',')}</Text>
              </View>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Km</Text>
                  <Text style={styles.textInformations}>{data.fuel.km}</Text>
              </View>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Combustivel</Text>
                  <Text style={styles.textInformations}>{data.fuel.fuel_type}</Text>
              </View>

              <View style={styles.containerBtn}>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Fuel')}
                  >
                      <Icon
                      name="right-arrow-forward"
                      height="24"
                      width="24"
                      color="#176585"
                      style={{ marginRight: 13 }} 
                      />
                  
                  </TouchableOpacity>
              </View>

          </View>
      )
    }
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          <Image
            source={image}
            style={styles.img}
          />

        <View style={styles.containerInformations}>
          <View style={styles.identification}>
              <Text style={styles.textIdentification}>Identificação</Text>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Marca</Text>
                  <Text style={styles.textInformations}>{data.brand}</Text>
              </View>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Modelo</Text>
                  <Text style={styles.textInformations}>{data.model}</Text>
              </View>
              

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Placa</Text>
                  <Text style={styles.textInformations}>{data.plate}</Text>
              </View>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Código</Text>
                  <Text style={styles.textInformations}>{data.vehicle_code}</Text>
              </View>

              <View style={styles.informations}>
                  <Text style={styles.textInformations}>Quilometragem</Text>
                  <Text style={styles.textInformations}>{data.vehicle_characteristic.currentKm}</Text>
              </View>
          </View>

          {
            renderMaintenance()
          }
          {
            renderFuel()
          }

          <TouchableOpacity style={styles.btn} >
            <Text style={styles.btnText}>Fazer checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} >
            <Text style={styles.btnText}>Gerar relatório</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
  img:{
    width: '100%',
    height: 217,
    elevation: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  containerInformations:{
    paddingHorizontal: 8,
    height: 'auto',
    width: '100%',
    marginTop: 13,
    paddingBottom: 36,
  },
  identification:{
    width: '100%',
    backgroundColor: '#FFF',
    height: 'auto',
    borderRadius: 5,
    borderColor: '#000',
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },
  textIdentification:{
    fontSize: 22,
    fontWeight: 'bold'
  },
  informations:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInformations:{
    flexShrink: 1,
    fontSize: 16
  },
  nextMain:{
    width: '100%',
    backgroundColor: '#FFF',
    height: 'auto',
    borderRadius: 5,
    borderColor: '#000',
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginTop: 10,

  },
  observacao:{
    fontSize: 16,
    marginBottom: 10,
  },
  observacaoInformacao:{
    marginBottom: 16,

  },
  btn:{
    width: "100%",
    backgroundColor: "#176585",
    height: 40,
    borderWidth: 1,
    borderColor: '#176585',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  btnText:{
    fontSize: 16,
    color: '#FFF'
  },
  containerBtn:{
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 6,
    marginTop: 16,
  },
  abastecimento:{
    width: '100%',
    backgroundColor: '#FFF',
    height: 'auto',
    borderRadius: 5,
    borderColor: '#000',
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginTop: 10,
    marginBottom: 13
  },
  textWithoutHistory:{
    color: '#AB0C0C'
  }

});
