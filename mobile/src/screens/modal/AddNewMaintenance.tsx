import { useState, useRef, useEffect} from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native'

import { Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import FilterButton from '../../components/FilterButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import MaintenanceDone from '../../types/maintenanceDone';
import Maintenance from '../../types/scheduledMaintenance';
import Service from '../../types/service';
import Storage from '../../service/storage';
import { saveMaintenanceDoneByVehicleId, saveScheduledMaintenanceByVehicleId } from '../../service/maintenanceService';
import { ActivityIndicator } from 'react-native';
import { add } from '@shopify/react-native-skia';


const { height } = Dimensions.get('window');

interface Props{
    visible: any;
    slideAnim: any;
    vehicleId: number;
}

export default function AddNewMaintenance({visible, slideAnim, vehicleId}: Props){

    const [tokenJwt, setTokenJwt] = useState<string>("");
    
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

    function closeModalAddMaitenance(){
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            visible(false);
        });
    }

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

        if(response === 201) closeModalAddMaitenance();
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
        <Portal>
            <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeModalAddMaitenance} style={styles.closeModal}>
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
    containerFilterButton:{
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 15
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
        marginBottom: 6,
    },
    rangeDateSelect:{
        fontSize: 10,
        color: colors.text.secondaray,
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
    fieldAddService:{
        marginTop: 15,
    },
    boxAddService:{
        width: '100%',
        height: 155,
        borderColor: colors.primary.main,
        borderWidth: 1,
        borderRadius: 5
    },
    inputContainer:{
        flexDirection: 'row',
        width: '100%',
        maxHeight: 38,
        fontSize: 18,
        color: '#000',
        borderBottomWidth: 1,
        borderColor: colors.border.main,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addServiceInput:{
        padding: 0,
        marginLeft: 10,
        fontSize: 15,
        flex: 1,
    },
    addServiceButton:{
        backgroundColor: colors.primary.main,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        borderTopRightRadius: 2
    },
    addedServices:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        margin: 5
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
    serviceMade:{
        height: 'auto',
        width: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    observationInput:{
        borderRadius: 5,
        borderColor: colors.primary.main,
        borderWidth: 1,
        textAlignVertical: 'top',
        height: 155,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
    

});