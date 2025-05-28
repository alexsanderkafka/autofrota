import {
    StyleSheet
} from 'react-native'

import { colors } from '../../theme';

const styles = StyleSheet.create({
    modal: {
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
        paddingVertical: 12,
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

export default styles;