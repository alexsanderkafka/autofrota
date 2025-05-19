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
import styles from "./style";
import VehicleFilter from "../../components/VehicleFilter";
import { VehicleStatus } from "../../types/vehicleStatus";

interface Props{
  navigation: any;
}

export default function Vehicles( {navigation}: Props ) {
    const [search, setSearch] = useState('');

    const [selected, setSelected] = useState("active");

    const sizePage = 12;

    const {vehicles, loading, totalVehicles, loadMoreVehicles, latestElement} = useVehicles(selected);

    const [refreshing, setRefreshing] = useState(false);

    //Filter buttons
    //const filters: string[] = ['Ativos', 'Manutenção', 'Aviso', 'Em uso'];
    const filters: any[] = [
        {label: 'Ativos', value: "active"},
        {label: 'Manutenção', value: "maintenance"},
        {label: 'Aviso', value: "alert"},
        {label: 'Em uso', value: "usage"}
    ]
    
    const [selectedFilter, setSelectedFilter] = useState<string>(filters[0].label);

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

                    {
                        filters.map((filter: any) => (
                            <VehicleFilter
                            key={filter.label}
                            text={filter.label}
                            selected={filter.label == selectedFilter}
                            onPress={() => {
                                setSelectedFilter(filter.label);
                                console.log(filter.value);
                                setSelected(filter.value);
                                setRefreshing(true);
                            }}
                            />
                        ))
                    }

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
            keyExtractor={ item => String(item.id)}
            renderItem={ ({ item }) => <VehicleListTile vehicle={item} navigation={navigation}/>}
            onEndReached={() => {
                loadMoreVehicles();
            }}
            onEndReachedThreshold={1} 
            ListFooterComponent={renderFooterFlatList}
            style={styles.list}
            refreshing={refreshing}
            />


        </View>
    );

}

