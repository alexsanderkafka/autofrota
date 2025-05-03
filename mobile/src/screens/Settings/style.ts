import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      backgroundColor: '#FFF'
    },
    profileButtonButton:{
        width: '100%',
        height: 'auto',
        backgroundColor: colors.primary.white,
        elevation: 2,
        borderRadius: 5,
        marginTop: 30,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    profileImage:{
        width: 48,
        height: 48,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    businessName:{
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    email:{
        fontSize: 10,
        color: colors.text.primary,
    },
    notificationContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 26,
    },
    titles:{
        fontSize: 16,
        marginBottom: 15,
    },
    actionBox:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        display: 'flex',
        elevation: 2,
        padding: 10,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
    },
    notificationAction:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAction:{
        fontSize: 13
    },
    securityContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 26,  
    },
    securityAction:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',   
    },
    iconGroup:{
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    apearanceContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        marginTop: 26,  
    },
    exitButton:{
        width: "100%",
        backgroundColor: "#FF4444",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 38,
        marginTop: 40,
        marginBottom: 30,
    }
});

export default styles;