import { useState, useRef} from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Text,
    Modal,
    FlatList
} from 'react-native'

import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Select(){
    const typeFuel = ['Gasolina', 'Diesel', 'Álcool'];

    const [selectedFuel, setSelectedFuel] = useState(typeFuel[0]);
    const [visible, setVisible] = useState(false)

    function updateItem(item){
        setSelectedFuel(item)
        setVisible(false)
    }


    return(
        <View style={{
            flex: 1,
            height: 'auto',
            position: 'relative'
        }} >
            <TouchableOpacity style={ styles.selected } onPress={() => setVisible(!visible)}>
                <Text style={{ fontSize: 10, marginLeft:10 }}>{selectedFuel}</Text>
            
                <View style={styles.iconContainer}>
                    <Icon name="chevron-down" size={24} color={colors.primary.white} />
                </View>             
            </TouchableOpacity>

            {
                visible &&
                <View style={styles.itens}>
                    <FlatList 
                    showsVerticalScrollIndicator={false}  
                    data={typeFuel}
                    renderItem={ ({ item }) => <TouchableOpacity style={styles.item} onPress={() => updateItem(item)}><Text>{item}</Text></TouchableOpacity>}
                    onEndReachedThreshold={1} 
                    style={styles.list}
                    />
                </View>   
            }
        </View>
    );
}

const styles = StyleSheet.create({
    selected:{
        marginTop: 30,
        width: '100%',
        height: 38,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        borderColor: colors.primary.main,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    iconContainer:{
        backgroundColor: colors.primary.main,
        width: 38,
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    itens:{
        backgroundColor: colors.primary.white,
        width: '100%',
        height: 'auto',
        elevation: 2,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 1000
    },
    item:{
        padding: 10
    }
});