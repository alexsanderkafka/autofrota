import React, { useState, useRef, useEffect} from 'react';

import {
    View,
    Animated,
    TouchableOpacity,
    Text,
    Pressable,
    FlatList,
    Platform,
    Modal
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';

import DateTimePicker from '@react-native-community/datetimepicker';
import Maintenance from '../../types/maintenance';
import Storage from '../../utils/storage';
import { saveScheduledMaintenanceByVehicleId } from '../../service/maintenanceService';
import styles from './styles';

interface Props{
    navigation: any;
    route: any;
}


export default function Checklist({navigation, route}: Props){

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

    //Date picker
    const [datePicker, setDatePicker] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const [checklist, setChecklist] = useState<any>({
        tire: false,
        breaks: false,
        headlights: false,
        oil: false,
        chain: false,
        fuel: false,
        battery: false,
        mirrors: false,
        helmet: false,
        water: false,
        wiperBlade: false,
        airConditioner: false,
        carJack: false,
    });

    const dataItems: any = [
        { label: "Pneu", items: "Calibragem, desgate", valueKey: "tire", description: "Realizar reparo oou troca dos pneus.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Freios", items: "Pastilhas, fluido, regulagem do frio", valueKey: "breaks", description: "Realizar Manutenção nos frios.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Faróis/Lanternas", items: "Baixa, alta, seta", valueKey: "headlights", description: "Realizar Manutenção nos Faróis/Lanternas.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Óleo do motor", items: "Nível, qualidade, filtro, vencimento", valueKey: "oil", description: "Completar o óleo ou realiar a troca.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Combustível", items: "Nível adequado", valueKey: "fuel", description: "Abastecer o veículo ou verificar possível problema.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Bateria", items: "Carga, terminais, condições", valueKey: "battery", description: "Manutenção na bateria.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Retrovisores", items: "Ajustados, defeitos", valueKey: "mirrors", description: "Realizar o reparo ou a troca dos espelhos.", vehicleCategory: ["moto", "carro", "caminhão"]},
        { label: "Água do Radiador", items: "Nível, qualidade", valueKey: "water", description: "Completar o nível da água ou realizar o reparo no sistema de arrefecimento.", vehicleCategory: ["moto", "carro", "caminhão"]},
    ];

    const [lastStep, setLastStep] = useState(false);

    function toggleItem(key: any){
        setChecklist((prev: any) => ({
          ...prev,
          [key]: !prev[key],
        }));
    };

    async function saveNewScheduledMaintenance(date: Date){

        let description: string = "";

        dataItems.forEach((element: any) => {
            if(!checklist[element.valueKey]){
                description += element.description + " ";
            }
        });

        const maintenance: Maintenance = {
            id: null,
            date: date.toISOString(),
            done: false,
            observation: description,
            scheduled: true,
            totalValue: 0,
            vehicleId: vehicleId
        }

        const response: number = await saveScheduledMaintenanceByVehicleId(tokenJwt, maintenance)

        if(response == 201) navigation.goBack();
    }

    function onChange (event: any, selectedDate: any){
            const currentDate: Date = selectedDate || datePicker;
            setShowPicker(Platform.OS === 'ios'); // no iOS ele fica aberto, no Android fecha

            if(event.type == "set"){
                setDatePicker(currentDate);
                saveNewScheduledMaintenance(currentDate);
            }
            
    };

    function checklistCard({ item }: any){
        return(
            <View style={styles.checkListCard}>
                <Pressable
                onPress={() => toggleItem(item.valueKey)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                >
                    <View style={[styles.checkBox, { backgroundColor: checklist[item.valueKey] ? colors.primary.green : colors.primary.white, borderColor: checklist[item.valueKey] ? colors.primary.green : colors.border.main }]}>
                        {checklist[item.valueKey] && <Icon name="check" size={20} color="#FFF" />}
                    </View>
                </Pressable>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={styles.titleItem}>{ item.label}</Text>
                    <Text style={styles.descriptionItem}>{ item.items }</Text>
                </View>
            </View>
        );
    }

    function disapprovedCard({ item }: any): any{
        if(!checklist[item.valueKey]){
            return(
                <View style={styles.disapprovedItemsCard}>
                    <Text style={styles.disapprovedTitle}>{ item.label }</Text>
                    <Text style={styles.descriptionItem}>{ item.items }</Text>
                </View>
            );
        }

    }

    function renderChecklist(){
        return(
            <View style={{ flex: 1 }}>  
                <FlatList 
                showsVerticalScrollIndicator={false}  
                data={dataItems}
                
                renderItem={checklistCard}
                keyExtractor={(item) => item.valueKey}
                style={styles.list}
                ListFooterComponent={
                    <TouchableOpacity style={styles.finalButton} onPress={() => setLastStep(true)}>
                        <Text style={styles.btnText}>Finalizar</Text>
                    </TouchableOpacity>
                }
                />
            </View>
        );
    }

    function renderLastStep(){
        return(
            <View style={{ flex: 1 }}>
                <FlatList 
                showsVerticalScrollIndicator={false}  
                data={dataItems}
                
                renderItem={disapprovedCard}
                keyExtractor={(item) => item.valueKey}
                style={styles.list}
                ListFooterComponent={
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={() => setLastStep(false)}>
                            <Text style={styles.backBtnText}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.scheduledMaintenanceButton} 
                        onPress={() => {
                            setShowPicker(true);
                        }}
                        >
                            <Text style={styles.scheduledMaintenanceTextButton}>Agendar manutenção</Text>
                        </TouchableOpacity>
                    </View>
                }
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
                
                    <Text style={styles.headerTitle}>Checklist</Text>
                </View>

                {
                    lastStep ? renderLastStep() : renderChecklist()
                }

                {showPicker && (
                        <DateTimePicker
                        value={datePicker}
                        mode="date"
                        display="default"
                        style={{ backgroundColor: colors.primary.main }}
                        onChange={onChange}
                        />
                )}
            </Modal>
    );
}