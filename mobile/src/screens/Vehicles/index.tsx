import React, { useState, useEffect } from "react";

import { 
    View, 
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator
} from "react-native";
import { colors } from "../../theme";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VehicleListTile from "../../components/VehicleListTile";
import api from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../service/storage";
import useVehicles from "../../hooks/useVehicles";

interface Props{
  navigation: any;
}

export default function Vehicles( {navigation}: Props ) {
    const [search, setSearch] = useState('');

    const [selected, setSelected] = useState("active");

    const sizePage = 12;

    const {vehicles, totalPages, loading, notFoundVehicles, totalVehicles, message, loadMoreVehicles, latestElement} = useVehicles(selected);


    function renderFooterFlatList(){
        if(!latestElement) return null;
    
        return(
          <View style={styles.latestElement}>
            <ActivityIndicator
            size="large" color={colors.primary.main} 
            style={{ marginTop: 20, marginBottom: 20 }}
            />
          </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18 }}>
                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Ativos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Manutenção</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Avisos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filter}>
                        <Text style={styles.textButton}>Em uso</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>


            <View style={{ paddingHorizontal: 15}}>
              <View style={styles.searchField}>
                  <TextInput
                  style={{ marginLeft: 10, flex: 1,}}
                  placeholder='Digite a placa...'
                  value={search}
                  onChangeText={ (text) => setSearch(text)}
                  />

                  <TouchableOpacity
                  style={ styles.searchButton }
                  >
                      <Icon name="magnify" size={24} color={colors.icon.white}/>

                  </TouchableOpacity>

              </View>
            </View>

            <FlatList 
            showsVerticalScrollIndicator={false}  
            data={vehicles}
            //keyExtractor={ item => String(item.vehicle_characteristic.id)}
            renderItem={ ({ item }) => <VehicleListTile data={item} navigation={navigation}/>}
            onEndReached={() => {
                loadMoreVehicles();
            }}
            onEndReachedThreshold={1} 
            ListFooterComponent={renderFooterFlatList}
            style={styles.list}
            />


        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary.white,
        
    },
    buttonContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 30,
        paddingHorizontal: 15,
    },
    filter:{
        width: 'auto',
        height: 'auto',
        paddingVertical: 9,
        paddingHorizontal: 37,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.primary.main,
        elevation: 2
    },
    textButton:{
        fontSize: 13,
        color: colors.text.white
    },
    searchField:{
        width: '100%',
        maxHeight: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        marginTop: 35,
    },
    searchButton:{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        justifyContent: 'center',
        height: '100%',
        elevation: 2,
    },
    list:{
        marginTop: 16,
        paddingHorizontal: 15,
        paddingTop: 10
    },
    latestElement:{

    }
});