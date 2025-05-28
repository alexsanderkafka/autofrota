import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.primary.white,
        flexDirection: 'column',
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
        marginHorizontal: 15
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
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary.main,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // para Android
    },
    maintenanceCard:{
        flexDirection: 'column',
        borderRadius: 5,
        backgroundColor: colors.primary.white,
        elevation: 2,
        marginHorizontal: 15,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 7,
    },
    observation:{
        fontSize: 13,
        textAlign: 'justify',
    },
    list:{
        marginTop: 20,
        paddingVertical: 6,
        paddingHorizontal: 15,
    },
    latestElement:{

    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary.white,
    },
    notFoundContainer:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.primary.white,
        paddingTop: 120
    },
    notFoundMessage:{
        fontSize: 16,
        textAlign: 'center',
        color: colors.text.primary,
        marginTop: 10,
    },
    notFoundImage:{
        width: 300,
        height: 150,
        resizeMode: 'center',
    }
});

export default styles;