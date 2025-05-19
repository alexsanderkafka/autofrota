import React, { useState, useRef, useEffect} from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput,
    Pressable,
    ScrollView,
    FlatList,
    Platform
} from 'react-native'

import { Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';

const { height } = Dimensions.get('window');

import DateTimePicker from '@react-native-community/datetimepicker';
import Maintenance from '../../types/scheduledMaintenance';
import Storage from '../../service/storage';
import { saveScheduledMaintenanceByVehicleId } from '../../service/maintenanceService';

interface Props{
    visible: any;
    slideAnim: any;
    vehicleId: number;
}


export default function Checklist({visible, slideAnim, vehicleId}: Props){

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

    function closeModal(){
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            visible(false);
        });
    }

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

        if(response == 201) closeModal();
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
        <Portal>
            <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
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
    checkListCard:{
        width: '100%',
        padding: 10,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        elevation: 2,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 14
    },
    checkBox:{
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: colors.border.main,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 50,
    },
    titleItem:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text.primary
    },
    descriptionItem:{
        fontSize: 13,
        color: colors.text.primary
    },
    finalButton:{
        flex: 1,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        marginBottom: 30
    },
    btnText:{
        fontSize: 16,
        color: colors.text.white,
    },
    disapprovedItemsCard:{
        width: '100%',
        padding: 10,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        elevation: 2,
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    disapprovedTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text.red
    },
    buttonContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        marginBottom: 30,
        gap: 18
    },
    backButton:{
        flex: 1,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        borderColor: colors.border.main,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
    },
    backBtnText:{
        fontSize: 13,
        color: colors.text.primary,
    },
    scheduledMaintenanceButton:{
        flex: 1,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        
    },
    scheduledMaintenanceTextButton:{
        fontSize: 13,
        color: colors.text.white,
    },
    list:{
        marginTop: 16,
        paddingHorizontal: 15,
        paddingTop: 10
    }
});