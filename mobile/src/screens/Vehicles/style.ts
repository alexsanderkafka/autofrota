import { colors } from "../../theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary.white,     
    },
    buttonContainer:{
        width: '100%',
        height: 'auto',
        marginTop: 30,
        backgroundColor: colors.primary.white,
    },
    searchField:{
        width: '100%',
        maxHeight: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        backgroundColor: colors.primary.white,
        borderRadius: 5,
        marginTop: 25,
    },
    searchButton:{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: colors.primary.main,
        borderRadius: 5,
        justifyContent: 'center',
        height: '100%',
        elevation: 2,
    },
    list:{
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    latestElement:{

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


    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100%',
        width: 'auto',
        borderTopEndRadius: 5,
        borderBottomEndRadius: 5,
        paddingHorizontal: 20,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    gestureContainer:{
        backgroundColor: colors.primary.white,
        overflow: 'visible',
        elevation: 2,
        borderColor: colors.primary.dark,
        borderRadius: 5,
    },
});

export default styles;