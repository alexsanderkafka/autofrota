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
        flex: 1,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        marginBottom: 30
    },
    btnText:{
        fontSize: 16,
        color: colors.text.white,
    },
    disapprovedItemsCard:{
        width: '100%',
        padding: 10,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        elevation: 2,
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    disapprovedTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text.red
    },
    buttonContainer:{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        marginBottom: 30,
        gap: 18
    },
    backButton:{
        flex: 1,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        borderColor: colors.border.main,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
    },
    backBtnText:{
        fontSize: 13,
        color: colors.text.primary,
    },
    scheduledMaintenanceButton:{
        flex: 1,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingVertical: 12,
        
    },
    scheduledMaintenanceTextButton:{
        fontSize: 13,
        color: colors.text.white,
    },
    list:{
        marginTop: 16,
        paddingHorizontal: 15,
        paddingTop: 10
    }
});

export default styles;