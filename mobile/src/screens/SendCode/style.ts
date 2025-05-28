import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.primary.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    inputs:{
        borderWidth: 2,
        borderColor: colors.border.main,
        borderRadius: 8,
        width: 50,
        height: 50,
        textAlign: 'center',
        fontSize: 20,
    },
    fieldsContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        height: 'auto',
        gap: 25,
    },
    button:{
        width: "100%",
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 38,
        marginBottom: 30,
    },
    buttonText:{
        color: colors.text.white,
        fontSize: 16
    },
    timerText: {
        fontSize: 14,
        marginVertical: 20,
        color: colors.text.secondaray,
    },
    timer: {
        color: '#2563eb',
        fontStyle: 'italic',
        fontWeight: 'bold'

    },
    resendText: {
        color: colors.text.secondaray,
        fontStyle: 'italic'
    },
});

export default styles;