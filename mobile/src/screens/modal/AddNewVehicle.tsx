import { useState, useRef, useEffect} from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput,
    Image
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
import Select from '../../components/Select';

import * as ImagePicker from 'expo-image-picker';
import { saveVehicle } from '../../service/vehicleService';


const { height } = Dimensions.get('window');

interface Props{
    visible: any;
    slideAnim: any;
}

export default function AddNewVehicle({visible, slideAnim}: Props){

    const [tokenJwt, setTokenJwt] = useState<string>("");
    const [companyId, setCompanyId] = useState<string>("");
    
    useEffect(() => {
            async function getInStorage(){
                try {
                    const currentStorage: Storage = await Storage.getInstance();
                  
                    setTokenJwt(currentStorage!.tokenJwt!);
                    setCompanyId(currentStorage!.companyExternalId!);
                  
                } catch (error) {
                    console.log("Error to get in storage: ", error);
                }
            }
                  
            getInStorage();   
    }, []);

    const [errorsForm, setErrorsForm] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false);

    //forms
    const [forms, setForms] = useState<any>({
        plate: "",
        brand: "",
        model: "",
        typeFuel: "",
        km: "",
        category: "",
        active: true
    });
    const [selectedFuel, setSelectedFuel] = useState<string>("Gasolina");

    useEffect(() => {
        setForms((prev: any) => ({...prev, typeFuel: selectedFuel}));
    }, [selectedFuel]);

    //upload area
    const [image, setImage] = useState<any>(null);

    const categories: string[] = [
        "CARRO",
        "CAMINHÃO",
        "MOTO",
        "VAN",
    ]


    function closeModalAddMaitenance(){
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            visible(false);
        });
    }

    function handleChangeForm(field: string, value: any){
        setForms((prev: any) => ({...prev, [field]: value}));
    }


    function validateForm(){
        let newErrors: any = {};

        if(forms.brand === null || forms.brand === "") newErrors.brand = "Você precisa adicionar a marca do veículo";
        if(forms.model === null || forms.model === "") newErrors.model = "Você precisa adicionar o modelo do veículo";
        if(forms.km === null || forms.km === "") newErrors.km = "Você precisa adicionar a quilometragem do veículo";
        if(forms.plate === null || forms.plate === "") newErrors.plate = "Você precisa adicionar a placa do veículo";
        if(!categories.includes(forms.category.toUpperCase())) newErrors.category = "Categoria inválida, escolha entre: CARRO, CAMINHÃO, MOTO ou VAN";

        setErrorsForm(newErrors);

        console.log(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function saveNewVehicle(){
        const verify: boolean = validateForm();

        if(!verify){
            return;
        }

        const formData: FormData = new FormData();

        const type: string = image.assets[0].mimeType;
        const name: string = image.assets[0].fileName;

        formData.append('file', {
                uri: image.assets[0].uri,
                name: name,
                type: type
        } as any)

        formData.append('form', JSON.stringify(forms));

        const response: number = await saveVehicle(companyId, tokenJwt, formData);

        console.log("Response: ", response);

        if(response === 201){
            alert("Veículo cadastrado com sucesso!");
            closeModalAddMaitenance();
        }

        //Voltar algum error ou algo se foi bem sucedido
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

    async function selectImage(){

        // Solicitar permissão para acessar a galeria
        //const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        /*
        if (permissionResult.granted === false) {
            alert("Você precisa permitir o acesso às imagens para continuar!");
            return;
        }
         */

        //open image picker
        // Abrir a galeria
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            
        });

        if (!result.canceled) {
            setImage(result);
        }
    }

    return(
        <Portal>
            <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeModalAddMaitenance} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Novo veículo</Text>
                </View>

                <View style={{
                    paddingHorizontal: 15,
                    paddingVertical: 30,
                }}>

                    <TouchableOpacity
                    style={styles.uploadArea}
                    onPress={selectImage}
                    >
                        {
                            image ? (
                                <Image
                                    source={{ uri: image.assets[0].uri }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 5,
                                    }}
                                />
                            ) : (
                                <View style={styles.boxInUploadArea}>
                                    <Icon name="camera" size={24} color={colors.icon.mainBlue} />
                                    <Text style={styles.textAddImage}>Adicionar foto do veículo</Text>
                                </View>
                            )
                        }

                    </TouchableOpacity>

                    <Select selectedFuel={selectedFuel} setSelectedFuel={setSelectedFuel} isAddVehicle={true}/>

                    <View style={ styles.field}>
                        <Text style={[styles.label, {color: errorsForm.brand ? colors.text.red : colors.text.primary}]}>{errorsForm.brand ? errorsForm.brand : 'Marca do veículo'}</Text>
                        <TextInput
                        style={[styles.inputs, {borderColor: errorsForm.brand ? colors.border.error : colors.primary.main}]}
                        placeholder='Ex: Fiat'
                        value={forms.brand}
                        onChangeText={ (text) => handleChangeForm('brand', text)}
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={[styles.label, {color: errorsForm.model ? colors.text.red : colors.text.primary}]}>{errorsForm.model ? errorsForm.model : 'Modelo'}</Text>
                        <TextInput
                        style={[styles.inputs, {borderColor: errorsForm.model ? colors.border.error : colors.primary.main}]}
                        placeholder='Ex: Marea'
                        value={forms.model}
                        onChangeText={ (text) => handleChangeForm('model', text)}
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={[styles.label, {color: errorsForm.km ? colors.text.red : colors.text.primary}]}>{errorsForm.km ? errorsForm.km : 'Quilometragem atual'}</Text>
                        <TextInput
                        style={[styles.inputs, {borderColor: errorsForm.km ? colors.border.error : colors.primary.main}]}
                        placeholder='Ex: 2000'
                        value={forms.km}
                        onChangeText={ (text) => handleChangeForm('km', text)}
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={[styles.label, {color: errorsForm.category ? colors.text.red : colors.text.primary}]}>{errorsForm.category ? errorsForm.category : 'Categoria do veículo'}</Text>
                        <TextInput
                        style={[styles.inputs, {borderColor: errorsForm.category ? colors.border.error : colors.primary.main}]}
                        placeholder='Ex: Caminhão'
                        value={forms.category}
                        onChangeText={ (text) => handleChangeForm('category', text)}
                        />
                    </View>

                    <View style={ styles.field}>
                        <Text style={[styles.label, {color: errorsForm.plate ? colors.text.red : colors.text.primary}]}>{errorsForm.plate ? errorsForm.plate : 'Placa'}</Text>
                        <TextInput
                        style={[styles.inputs, {borderColor: errorsForm.plate ? colors.border.error : colors.primary.main}]}
                        placeholder='Ex: BRA02Z00'
                        value={forms.plate}
                        onChangeText={ (text) => handleChangeForm('plate', text)}
                        />
                    </View>

                    <TouchableOpacity style={styles.saveButton}
                        onPress={saveNewVehicle}
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
    },
    uploadArea:{
        width: '100%',
        height: 188,
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        borderColor: colors.primary.main,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    boxInUploadArea:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
    },
    textAddImage:{
        fontSize: 16,
        color: colors.text.secondaray,
    }
});