import { useState, useRef, useEffect} from 'react';

import {
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native'

import { Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import Select from '../../components/Select';
import Fuel from '../../types/fuel';
import Storage from '../../service/storage';
import { saveNewFuelByVehicle } from '../../service/fuelService';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

import styles from './styles';

interface Props{
    navigation: any;
    route: any;
}

export default function AddNewFuel({navigation, route}: Props){

    const [tokenJwt, setTokenJwt] = useState<string>("");

    const vehicleId: number = route.params;

    useEffect(() => {
        async function getInStorage(){
            try {
                const currentStorage: Storage = await Storage.getInstance();
              
                setTokenJwt(currentStorage!.tokenJwt!);
              
            } catch (error) {
                console.log("Error to get in storage: ", error);
            }
        }
              
        getInStorage();   
    }, []);


    const [form, setForm] = useState<any>({
        total: 0,
        km: 0,
        liters: 0
    });

    const [errorsForm, setErrorsForm] = useState<any>({})
    const [selectedFuel, setSelectedFuel] = useState<string>("Gasolina");
    const [loading, setLoading] = useState<boolean>(false);
    const [datePicker, setDatePicker] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    function handleChange(key: string, value: string){
        const number: number = parseFloat(value) || 0;
        setForm({ ...form, [key]: number });
    }

    function validateForm(){
        let newErrors: any = {};

        if(form.total <= 0) newErrors.total = "Total precisa ser maior que 0";
        if(form.km <= 0) newErrors.km = "Km precisa ser maior que 0";
        if(form.liters <= 0) newErrors.liters = "Litros precisa ser maior que 0"

        setErrorsForm(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function saveNewFuel(){
        setLoading(true);

        if(!validateForm()) {
            setLoading(false);
            return;
        }

        const fuel: Fuel = {
            id: null,
            liters: form.liters,
            km: form.km,
            totalValue: form.total,
            date: datePicker.toISOString(),
            fuelType: selectedFuel.toUpperCase(),
        }

        console.log(fuel);

        const response: number = await saveNewFuelByVehicle(tokenJwt, fuel, vehicleId);

        //Aqui tem a response

        setLoading(false)
        if(response === 201) navigation.goBack();

        //voltar algum error para o user
        
    }


    function renderLoading(){
        if(loading){
            return(
                <ActivityIndicator color={colors.primary.white} size={24}/>
            );
        }

        return(
            <Text style={{ color: colors.text.white, fontSize: 16 }}>Salvar</Text>
        );
    }

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || datePicker;
        setShowPicker(Platform.OS === 'ios'); // no iOS ele fica aberto, no Android fecha
        setDatePicker(currentDate);
    };

    return(
            <Modal animationType='fade' style={styles.modal}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Novo abastecimento</Text>
                </View>

                <View style={{ paddingHorizontal:15 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 19}}>
                        <View style={styles.fieldSelectDate}>
                            <Text style={styles.rangeDateSelect}>{datePicker.toLocaleDateString('pt-BR')}</Text>
                            <TouchableOpacity 
                                style={styles.dateButton}
                                onPress={() => setShowPicker(true)}
                            >
                                <Icon name="calendar-range" size={24} color={colors.primary.white} />
                            </TouchableOpacity>
                        </View>
                        <Select selectedFuel={selectedFuel} setSelectedFuel={setSelectedFuel} isAddVehicle={false}/>
                    </View>

                    {showPicker && (
                        <DateTimePicker
                        value={datePicker}
                        mode="date"
                        display="default"
                        style={{ backgroundColor: colors.primary.main }}
                        onChange={onChange}
                        />
                    )}
                    


                    <View style={ styles.field}>
                        <Text style={[ styles.label, {color: errorsForm.total ? colors.text.red : colors.text.primary}]}>{errorsForm.total ? errorsForm.total : 'Valor total'}</Text>
                        <TextInput
                        style={[ styles.inputs, {borderColor: errorsForm.total ? colors.border.error : colors.primary.main} ]}
                        placeholder='R$ 00,00'
                        value={form.total}
                        onChangeText={ (text) => handleChange('total', text)}
                        keyboardType='numeric'
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={[ styles.label, {color: errorsForm.km ? colors.text.red : colors.text.primary}]}>{errorsForm.km ? errorsForm.km : 'Km atual'}</Text>
                        <TextInput
                        style={[ styles.inputs, {borderColor: errorsForm.km ? colors.border.error : colors.primary.main} ]}
                        placeholder='Km de abastecimento'
                        value={form.km}
                        onChangeText={ (text) => handleChange('km', text)}
                        keyboardType='numeric'
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={[styles.label, {color: errorsForm.liters ? colors.text.red : colors.text.primary}]}>{errorsForm.liters ? errorsForm.liters : 'Litros'}</Text>
                        <TextInput
                        style={[ styles.inputs, {borderColor: errorsForm.liters ? colors.border.error : colors.primary.main} ]}
                        placeholder='Quantidade de litros'
                        value={form.liters}
                        onChangeText={ (text) => handleChange('liters', text)}
                        keyboardType='numeric'
                        />
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={saveNewFuel}>
                        {
                            renderLoading()
                        }
                    </TouchableOpacity>
                </View>
            </Modal>
    );

}