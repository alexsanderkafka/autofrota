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
import Storage from '../../service/storage';
import { saveMaintenanceDoneByVehicleId, saveScheduledMaintenanceByVehicleId } from '../../service/maintenanceService';
import { ActivityIndicator } from 'react-native';
import styles from './style';

interface Props{
    navigation: any;
    route: any;
}

export default function AddNewMaintenance({navigation, route}: Props){

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

    const [total, setTotal] = useState<any>(0);
    const [service, setService] = useState<string>('');
    const [listServies, setAddedServices] = useState<string[]>([]);
    const [observation, setObservation] = useState<string>('');
    const [errorsForm, setErrorsForm] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false);

    const [filter, setFilter] = useState<string>("made"); //scheduled

    //Date picker
    const [datePicker, setDatePicker] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    //Filter buttons
    const filters: string[] = ['Feitas', 'Agendadas'];
    const [selectedFilter, setSelectedFilter] = useState<string | null>(filters[0]);

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

        if(filter === 'made'){
            if(listServies.length <= 0) newErrors.service = "Você precisa adicionar os serviços feitos"
            if(total <= 0) newErrors.total = "Total precisa ser maior que 0";
        }else{
            if(observation.length < 20) newErrors.observation = "Observação precisa possuir no mínimo 20 caracteres";
        }

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

        let response: number | null = null;

        if(filter === "made"){
            const maintenance: Maintenance = {
                id: null,
                date: datePicker.toISOString(),
                done: true,
                observation: observation,
                scheduled: false,
                totalValue: total,
                vehicleId: vehicleId
            }

            const services: Service[] = listServies.map((service: string) => {
                return {
                    id: null,
                    type: service
                }
            })

            const maintenanceDone: MaintenanceDone = {
                maintenance: maintenance,
                services: services
            }

            response = await saveMaintenanceDoneByVehicleId(tokenJwt, maintenanceDone);
        }else{
            const maintenance: Maintenance = {
                id: null,
                date: datePicker.toISOString(),
                done: false,
                observation: observation,
                scheduled: true,
                totalValue: 0,
                vehicleId: vehicleId
            }

            response = await saveScheduledMaintenanceByVehicleId(tokenJwt, maintenance)
        }

        //Voltar algo para o usuário
        setLoading(false);

        if(response === 201) navigation.goBack();
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

    function clearFields(){
        setErrorsForm({});
        setAddedServices([]);
        setDatePicker(new Date());
    }

    function renderField(){
        if(filter === 'made'){
            return(
                <>
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
                </>
            )
        }

        return(
            <View style={styles.field}>
                <Text style={[styles.label, {color: errorsForm.observation ? colors.text.red : colors.text.primary}]}>{errorsForm.observation ? errorsForm.observation : 'Observação'}</Text>
                <TextInput
                multiline={true}
                numberOfLines={12}
                placeholder='Digite alguma observação...'
                value={observation}
                style={[styles.observationInput, {borderColor: errorsForm.observation ? colors.border.error : colors.primary.main}]}
                onChangeText={ (text) => setObservation(text)}
                />

            </View>
        )
    }

    return(
            <Modal animationType='fade' style={styles.modal}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Nova manutenção</Text>
                </View>

                <View style={styles.containerFilterButton}>
                    {
                        filters.map((filter: string) => (
                            <FilterButton
                            key={filter}
                            text={filter}
                            selected={filter === selectedFilter}
                            onPress={() => {
                                if(filter === filters[0]) setFilter('made');
                                else setFilter('scheduled');
                                                
                                setSelectedFilter(filter);
                                clearFields();
                            }}/>
                        ))
                    }
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

                    

                    {
                        renderField()
                    }

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