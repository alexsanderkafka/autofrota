import { StyleSheet } from 'react-native';

import { colors } from '../../theme';

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: colors.primary.white,
        paddingHorizontal: 15,
        paddingBottom: 30,
    },
    identificationContainer:{
        marginTop: 30,
        width: '100%',
        height: 200,
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage:{
        width: 89,
        height: 89,
        resizeMode: 'cover',
        borderRadius: 50,
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
    rowTitle:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
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
        color: colors.text.gray
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
    }
});

export default styles;