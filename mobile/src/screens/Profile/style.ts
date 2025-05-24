import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: colors.primary.white,
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    profileImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    businessName:{
        fontSize: 13,   
        fontWeight: 'bold',
        marginTop: 10,
    },
    galleryButton:{
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    sectionContainer:{
        marginTop: 26,
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
    },
    titles:{
        fontSize: 16,
    },
    informationCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
        width: '100%',
        height: 'auto',
        padding: 10,
        marginTop: 15
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
    },
    driverImage:{
        width: 48,
        height: 48,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    driverName:{
        fontSize: 13,
        fontWeight: '600'
    },
    driverEmail:{
        fontSize: 10,
        color: colors.text.secondaray
    },
    driversCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
        width: '100%',
        height: 'auto',
        padding: 10,
        marginTop: 15,
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
    },
    imageArea:{
        width: '100%',
        height: 188,
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        borderColor: colors.primary.main,
        borderWidth: 1
    }
});

export default styles;