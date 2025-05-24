import { useState, useRef, useEffect} from 'react';

import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput,
    Modal
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import FilterButton from '../../components/FilterButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import MaintenanceDone from '../../types/maintenanceDone';
import Maintenance from '../../types/maintenance';
import Service from '../../types/service';
import Storage from '../../utils/storage';
import updateScheduledMaintenanceToDone, { saveMaintenanceDoneByVehicleId, saveScheduledMaintenanceByVehicleId } from '../../service/maintenanceService';
import { ActivityIndicator } from 'react-native';
import styles from './style';
import UpdateMaintenance from '../../types/updateMaintenance';

interface Props{
    navigation: any;
    route: any;
}

export default function UpdateScheduledMaintenance({navigation, route}: Props){

    const [tokenJwt, setTokenJwt] = useState<string>("");

    const scheduledMaintenance: Maintenance = route.params;
    
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

    const [total, setTotal] = useState<any>(0);
    const [service, setService] = useState<string>('');
    const [listServies, setAddedServices] = useState<string[]>([]);
    const [observation, setObservation] = useState<string>('');
    const [errorsForm, setErrorsForm] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false);

    //Date picker
    const [datePicker, setDatePicker] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    function addedServices(){
        if (service.trim() === '') return;

        setAddedServices((prevServices) => [...prevServices, service]);

        setService('');
    }

    useEffect(() => {
        console.log(listServies)
    }, [listServies])

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || datePicker;
        setShowPicker(Platform.OS === 'ios'); // no iOS ele fica aberto, no Android fecha
        setDatePicker(currentDate);
    };

    function validateForm(){
        let newErrors: any = {};

        if(listServies.length <= 0) newErrors.service = "Você precisa adicionar os serviços feitos"
        if(total <= 0) newErrors.total = "Total precisa ser maior que 0";
        
        setErrorsForm(newErrors);

        console.log(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function saveNewMaintenance(){
        setLoading(true);

        if(!validateForm()) {
            setLoading(false);
            return;
        }

        const maintenance: UpdateMaintenance = {
            id: scheduledMaintenance.id,
            date: datePicker.toISOString(),
            totalValue: total,
            services: listServies,
        }

        const response: number = await updateScheduledMaintenanceToDone(tokenJwt, maintenance);

        setLoading(false);

        if(response === 204) navigation.goBack();

        //Voltar algo para o usuário
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

    return(
            <Modal animationType='fade' style={styles.modal}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Editar manutenção</Text>
                </View>

                <View style={{ paddingHorizontal: 15 }}>
                    <View style={styles.fieldSelectDate}>
                        <Text style={styles.rangeDateSelect}>{datePicker.toLocaleDateString('pt-BR')}</Text>
                        <TouchableOpacity 
                        style={styles.dateButton}
                        onPress={() => setShowPicker(true)}
                        >
                            <Icon name="calendar-range" size={24} color={colors.primary.white} />
                        </TouchableOpacity>
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
                            <Text style={[styles.label, {color: errorsForm.total ? colors.text.red : colors.text.primary}]}>{errorsForm.total ? errorsForm.total : 'Total'}</Text>
                            <TextInput
                            style={[styles.inputs, {borderColor: errorsForm.total ? colors.border.error : colors.primary.main}]}
                            placeholder='R$ 00,00'
                            keyboardType='numeric'
                            value={total}
                            onChangeText={ (text) => {
                                const number: number = parseFloat(text) || 0;
                                setTotal(number);
                            }}
                            />
                    </View>

                    <View style={ styles.fieldAddService}>
                        <Text style={[styles.label, {color: errorsForm.service ? colors.text.red : colors.text.primary}]}>{errorsForm.service ? errorsForm.service : 'Total'}</Text>

                        <View style={[styles.boxAddService, {borderColor: errorsForm.service ? colors.border.error : colors.primary.main}]}>
                            <View style={[styles.inputContainer, {borderColor: errorsForm.service ? colors.border.error : colors.primary.main}]} >
                                <TextInput
                                style={styles.addServiceInput}
                                placeholder='Digite o nome do serviço'
                                value={service}
                                onChangeText={ (text) => setService(text)}
                                />

                                <TouchableOpacity style={[styles.addServiceButton, {backgroundColor: errorsForm.service ? colors.border.error : colors.primary.main}]} onPress={addedServices}>
                                    <Icon name="plus" size={24} color={colors.icon.white}/>
                                </TouchableOpacity>
                            </View>

                        <View style={styles.addedServices}>
                            {
                                listServies.map((service: any, index: any) => (
                                    <View key={index} style={styles.serviceMade}>
                                        <Text style={{ color: colors.text.white, fontSize: 10 }}>{service}</Text>
                                    </View>
                                ))
                            }
                        </View>                
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton}
                    onPress={saveNewMaintenance}
                    >
                        {
                            renderLoading()
                        }
                    </TouchableOpacity>
                </View>

            </Modal>
    );

}