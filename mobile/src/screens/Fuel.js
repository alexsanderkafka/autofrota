import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function FuelCard({ data }) {

    return(
        <View style={styles.fuelCard}>
            <View style={styles.row}>
                <Icon name="calendar-blank" size={24} color={colors.icon.mainBlue} />
                <Text>{data.date}</Text>
            </View>
                
            <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>
                
            <View style={styles.row}>
                <Icon name="currency-usd" size={24} color={colors.icon.mainBlue} />
                <Text>{data.price}</Text>
            </View>
                
            <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>
                
            <View style={styles.row}>
                <Icon name="gas-station" size={24} color={colors.icon.mainBlue} />
                <Text>{data.km}km</Text>
            </View>
                
            <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>
                
            <View style={styles.row}>
                <Icon name="gas-station" size={24} color={colors.icon.mainBlue} />
                <Text>{data.fuelType}</Text>
            </View>
                
            <View style={{ borderBottomColor: "#ddd", borderBottomWidth: 1, marginVertical: 10}}/>
                
            <View style={styles.row}>
                <Icon name="fuel" size={24} color={colors.icon.mainBlue} />
                <Text>{data.liters}L</Text>
            </View>
                    
        </View>
    );
}

export default function Fuel({ navigation }) {

    const [latestElement, setLatestElement] = useState(false);

    const fuel = [
        {
            id: 1,
            date: "00/00/2030",
            price: "R$ 500,00",
            km: "78.990km",
            fuelType: "Gasolina",
            liters: "70"
        },
        {
            id: 2,
            date: "00/00/2030",
            price: "R$ 1000,00",
            km: "90000km",
            fuelType: "Gasolina",
            liters: "100"
        },
        {
            id: 3,
            date: "00/00/2030",
            price: "R$ 10,00",
            km: "80km",
            fuelType: "Gasolina",
            liters: "2"
        },
    ]

    function sendToAddFuel(){

    }

    function renderFooterFlatList(){
        if(!latestElement) return null;
        
        return(
            <View style={styles.latestElement}>
                <ActivityIndicator
                size="large" color={colors.primary.main} />
            </View>
        );
    }

    async function loadMoreFuel(){
        setLatestElement(true);
    
        /*
        console.log(totalVehicles);
    
        if(page === totalPages || totalVehicles < sizePage){
          setLatestElement(false);
          return;
        }
    
        setPage(page + 1);
    
        if(selected === 'todos'){
          await getAllVehicles();
        }else{
          await getStatusVehicles();
        }*/
    }

    return(
        <View style={styles.container}>
            
            <View style={styles.fieldSelectDate}>
                <Text style={styles.rangeDateSelect}>00/00/0000-00/00/0000</Text>
                <TouchableOpacity style={styles.dateButton}>
                    <Icon name="calendar-range" size={24} color={colors.primary.white} />
                </TouchableOpacity>
            </View>

            <FlatList 
            data={fuel}
            keyExtractor={ item => String(item.id)}
            renderItem={ ({ item }) => <FuelCard data={item} />}
            onEndReached={() => {
                loadMoreFuel();
            }}
            onEndReachedThreshold={1} 
            ListFooterComponent={renderFooterFlatList}
            //style={styles.list}
            />

        
            <TouchableOpacity style={styles.fab} onPress={sendToAddFuel}>
                <Icon name="plus" size={24} color={colors.primary.white} />
            </TouchableOpacity>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.primary.white,
        flexDirection: 'column',
    },
    fuelCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
        marginTop: 20,
        padding: 10,
        marginHorizontal: 15,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary.main,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // para Android
      },
      fieldSelectDate:{
        marginTop: 30,
        width: '50%',
        height: 38,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 26
      },
      rangeDateSelect:{
        fontSize: 10,
        color: colors.text.gray,
        marginLeft: 10,
        textAlign: 'center',
      },
      dateButton:{
        backgroundColor: colors.primary.main,
        width: 38,
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }
    
});
