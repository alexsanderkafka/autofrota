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
    ScrollView
} from 'react-native'

import { Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme';

const { height } = Dimensions.get('window');


export default function Checklist({visible, slideAnim}){

    const [tire, setTire] = useState(false);
    const [breaks, setBreaks] = useState(false);
    const [headlights, setHeadlights] = useState(false);
    const [oil, setOil] = useState(false);
    const [chain, setChain] = useState(false);
    const [fuel, setFuel] = useState(false);
    const [battery, setBattery] = useState(false);
    const [mirrors, setMirrors] = useState(false);
    const [helmet, setHelmet] = useState(false);

    function closeModal(){
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
                    <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
                        <Icon name="close" size={24} color={colors.icon.mainBlue} />
                    </TouchableOpacity>
                
                    <Text style={styles.headerTitle}>Checklist</Text>
                </View>


                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15, marginTop: 10, paddingBottom: 30}}>
                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setTire(!tire)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: tire ? colors.primary.green : colors.primary.white, borderColor: tire ? colors.primary.green : colors.border.main }]}>
                                    {tire && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Pneu</Text>
                                <Text style={styles.descriptionItem}>Calibragem, desgate</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setBreaks(!breaks)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: breaks ? colors.primary.green : colors.primary.white, borderColor: breaks ? colors.primary.green : colors.border.main }]}>
                                    {breaks && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Freios</Text>
                                <Text style={styles.descriptionItem}>Pastilhas, fluido, regulagem do frio</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setHeadlights(!headlights)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: headlights ? colors.primary.green : colors.primary.white, borderColor: headlights ? colors.primary.green : colors.border.main }]}>
                                    {headlights && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Faróis/Lanternas</Text>
                                <Text style={styles.descriptionItem}>Baixa, alta, seta</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setOil(!oil)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: oil ? colors.primary.green : colors.primary.white, borderColor: oil ? colors.primary.green : colors.border.main }]}>
                                    {oil && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Óleo do motor</Text>
                                <Text style={styles.descriptionItem}>Nível, qualidade, filtro, vencimento</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setChain(!chain)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: chain ? colors.primary.green : colors.primary.white, borderColor: chain ? colors.primary.green : colors.border.main }]}>
                                    {chain && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Corrente/Coroa</Text>
                                <Text style={styles.descriptionItem}>Tensão, lubrificação</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setFuel(!fuel)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: fuel ? colors.primary.green : colors.primary.white, borderColor: fuel ? colors.primary.green : colors.border.main }]}>
                                    {fuel && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Combustível</Text>
                                <Text style={styles.descriptionItem}>Nível adequado</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setBattery(!battery)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: battery ? colors.primary.green : colors.primary.white, borderColor: battery ? colors.primary.green : colors.border.main }]}>
                                    {battery && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Bateria</Text>
                                <Text style={styles.descriptionItem}>Carga, terminais, condições</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setMirrors(!mirrors)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: mirrors ? colors.primary.green : colors.primary.white, borderColor: mirrors ? colors.primary.green : colors.border.main }]}>
                                    {mirrors && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Retrovisores</Text>
                                <Text style={styles.descriptionItem}>Ajustados, defeitos</Text>
                            </View>
                        </View>

                        <View style={styles.checkListCard}>
                            <Pressable
                            onPress={() => setHelmet(!helmet)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                            >
                                <View style={[styles.checkBox, { backgroundColor: helmet ? colors.primary.green : colors.primary.white, borderColor: helmet ? colors.primary.green : colors.border.main }]}>
                                    {helmet && <Icon name="check" size={20} color="#FFF" />}
                                </View>
                            </Pressable>

                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={styles.titleItem}>Capacete</Text>
                                <Text style={styles.descriptionItem}>Viseira, fecho, estrutura, interna</Text>
                            </View>
                        </View>
                        
                        
                        <TouchableOpacity style={styles.finalButton} onPress={() => {}}>
                            <Text style={styles.btnText}>Entrar</Text>
                        </TouchableOpacity>
                        

                        
                    </ScrollView>
                
                
        
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
        width: "100%",
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 38,
        marginBottom: 30
    },
    btnText:{
        fontSize: 16,
        color: colors.text.white,
    }
});