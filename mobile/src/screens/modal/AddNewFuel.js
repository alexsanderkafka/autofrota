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

import { Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import Select from '../../components/Select';

const { height } = Dimensions.get('window');

export default function AddNewFuel({visible, slideAnim}){


    const [total, setTotal] = useState('');
    const [km, setKm] = useState('');
    const [liters, setLiters] = useState('');

    
    function closeModalAddMaitenance(){
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            visible(false);
        });
    }


    return(
        <Portal>
            <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeModalAddMaitenance} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Novo abastecimento</Text>
                </View>

                <View paddingHorizontal={15}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 19}}>
                        <View style={styles.fieldSelectDate}>
                            <Text style={styles.rangeDateSelect}>00/00/0000</Text>
                            <TouchableOpacity style={styles.dateButton}>
                                <Icon name="calendar-range" size={24} color={colors.primary.white} />
                            </TouchableOpacity>
                        </View>
                        <Select />
                    </View>
                    


                    <View style={ styles.field}>
                        <Text style={styles.label}>Total</Text>
                        <TextInput
                        style={styles.inputs}
                        placeholder='R$ 00,00'
                        value={total}
                        onChangeText={ (text) => setTotal(text)}
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={styles.label}>Km atual</Text>
                        <TextInput
                        style={styles.inputs}
                        placeholder='Km de abastecimento'
                        value={km}
                        onChangeText={ (text) => setKm(text)}
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={styles.label}>Litros</Text>
                        <TextInput
                        style={styles.inputs}
                        placeholder='Quantidade de litros'
                        value={liters}
                        onChangeText={ (text) => setLiters(text)}
                        />
                    </View>

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={{ color: colors.text.white, fontSize: 16 }}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </Portal>
    );

}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: colors.primary.white,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    /*
    closeText: {
        color: '#e74c3c',
        fontSize: 16,
    },*/
    header:{
        width: '100%',
        height: 'auto',
        backgroundColor: colors.primary.white,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center'
    },
    closeModal:{
        marginRight: 20
    },
    headerTitle:{
        fontSize: 20,
        fontWeight: '600',
        color: colors.text.other,
    },
    fieldSelectDate:{
        marginTop: 30,
        flex: 1,
        height: 38,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
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
    },
    field:{
        marginTop:  15
    },
    label:{
        fontSize: 13
    },
    inputs:{
        borderRadius: 5,
        borderColor: colors.primary.main,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    saveButton:{
        marginTop: 40,
        backgroundColor: colors.primary.main,
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 12
    },
});