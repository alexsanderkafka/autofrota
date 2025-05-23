import { useState, useRef, useEffect} from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    Modal,
    ScrollView
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';
import Storage from '../../service/storage';
import { ActivityIndicator } from 'react-native';
import Select from '../../components/Select';

import * as ImagePicker from 'expo-image-picker';
import { saveVehicle } from '../../service/vehicleService';
import styles from './styles';

interface Props{
    navigation: any;
}

export default function AddNewVehicle({navigation}: Props){

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
            navigation.goBack();
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
            <Modal animationType='fade' style={styles.modal}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Novo veículo</Text>
                </View>
                <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingHorizontal: 15,
                    paddingVertical: 30,
                    height: '100%',
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
                </ScrollView>
            </Modal>
    );

}