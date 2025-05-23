import {
    StyleSheet
} from 'react-native'
import { colors } from '../../theme';

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
    fieldSelectDate:{
        marginTop: 30,
        flex: 1,
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
        borderWidth: 1,
        borderColor: colors.primary.main,
        paddingHorizontal: 10
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
});

export default styles;