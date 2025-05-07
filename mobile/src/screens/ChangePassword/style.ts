import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    title:{
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: 15,
        textAlign: 'center'
    },
    descriptions:{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 48
    },
    logoImage:{
        width: 169,
        height: 78,
        marginBottom: 10,
        marginTop: 20,
    },
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        fontSize: 18,
        color: '#000',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.border.main,
        marginBottom: 15,
        paddingVertical: 11,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    inputs:{
        padding: 0,
        marginLeft: 5,
        fontSize: 15,
        flex: 1,
    },
    eyeBtn:{
        marginLeft: 10,
    },
    btn:{
        width: "100%",
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 38,
    },
    btnText:{
        fontSize: 16,
        color: colors.text.white,
    },
});

export default styles;