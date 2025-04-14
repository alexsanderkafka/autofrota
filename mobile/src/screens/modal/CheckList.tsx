import { useState, useRef} from 'react';

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
    FlatList
} from 'react-native'

import { Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';

const { height } = Dimensions.get('window');

interface Props{
    visible: any;
    slideAnim: any;
}


export default function Checklist({visible, slideAnim}: any){

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
        { label: "Pneu", description: "Calibragem, desgate", valueKey: "tire" },
        { label: "Freios", description: "Pastilhas, fluido, regulagem do frio", valueKey: "breaks" },
        { label: "Faróis/Lanternas", description: "Baixa, alta, seta", valueKey: "headlights" },
        { label: "Óleo do motor", description: "Nível, qualidade, filtro, vencimento", valueKey: "oil" },
        { label: "Corrente/Coroa", description: "Tensão, lubrificação", valueKey: "chain" },
        { label: "Combustível", description: "Nível adequado", valueKey: "fuel" },
        { label: "Bateria", description: "Carga, terminais, condições", valueKey: "battery" },
        { label: "Retrovisores", description: "Ajustados, defeitos", valueKey: "mirrors" },
        { label: "Capacete", description: "Viseira, fecho, estrutura, interna", valueKey: "helmet" },
        { label: "Água do Radiador", description: "Nível, qualidade", valueKey: "water" },
        { label: "Palhetas", description: "Funcionamento, desgate", valueKey: "wiperBlade" },
        { label: "Ar-condicionado", description: "Funcionamento, filtros, odores", valueKey: "airConditioner" },
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
                    <Text style={styles.descriptionItem}>{ item.description }</Text>
                </View>
            </View>
        );
    }

    function disapprovedCard({ item }: any): any{

        if(!checklist[item.valueKey]){
            return(
                <View style={styles.disapprovedItemsCard}>
                                
                    <Text style={styles.disapprovedTitle}>{ item.label }</Text>
                    <Text style={styles.descriptionItem}>{ item.description }</Text>
                               
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

                        <TouchableOpacity style={styles.scheduledMaintenanceButton} onPress={ closeModal }>
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