import { useState, useRef} from 'react';

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


const { height } = Dimensions.get('window');

interface Props{
    visible: any;
    slideAnim: any;
}

export default function AddNewMaintenance({visible, slideAnim}: Props){

    const [total, setTotal] = useState('');
    const [service, setService] = useState('');
    const [addedServies, setAddedServices] = useState<any>([]);
    const [observation, setObservation] = useState('');

    const [filter, setFilter] = useState('made'); //scheduled

    

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
        setAddedServices([...addedServies, service]);
        setService('');
    }

    function renderField(){
        if(filter === 'made'){
            return(
                <View style={ styles.fieldAddService}>
                    <Text style={styles.label}>Total</Text>

                    <View style={styles.boxAddService}>
                        <View style={styles.inputContainer} >
                             <TextInput
                            style={styles.addServiceInput}
                            placeholder='Digite o nome do serviço'
                            value={service}
                            onChangeText={ (text) => setService(text)}
                            />

                            <TouchableOpacity style={styles.addServiceButton} onPress={addedServices}>
                                <Icon name="plus" size={24} color={colors.icon.white}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.addedServices}>
                            {
                                addedServies.map((service: any, index: any) => (
                                    <View key={index} style={styles.serviceMade}>
                                        <Text style={{ color: colors.text.white, fontSize: 10 }}>{service}</Text>
                                    </View>
                                ))
                            }
                        </View>                
                    </View>
                </View>
            )
        }

        return(
            <View style={styles.field}>
                <Text style={styles.label}>Observação</Text>
                <TextInput
                multiline={true}
                numberOfLines={12}
                placeholder='Digite alguma observação...'
                value={observation}
                style={styles.observationInput}
                //onChangeText={ (text) => setObservation(text)}
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
                    <FilterButton text="Feita"/>
                    <FilterButton text="Agendar"/>
                </View>

                <View style={{ paddingHorizontal: 15 }}>
                    <View style={styles.fieldSelectDate}>
                        <Text style={styles.rangeDateSelect}>00/00/0000</Text>
                        <TouchableOpacity style={styles.dateButton}>
                            <Icon name="calendar-range" size={24} color={colors.primary.white} />
                        </TouchableOpacity>
                    </View>

                    <View style={ styles.field}>
                        <Text style={styles.label}>Total</Text>
                        <TextInput
                        style={styles.inputs}
                        placeholder='R$ 00,00'
                        value={total}
                        onChangeText={ (text) => setTotal(text)}
                        />
                    </View>

                    {
                        renderField()
                    }

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={{ color: colors.text.white, fontSize: 16 }}>Salvar</Text>
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
        color: colors.text.gray,
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
        width: 38
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