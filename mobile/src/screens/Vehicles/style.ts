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
        paddingHorizontal: 15,
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
        marginTop: 35,
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
        marginTop: 16,
        paddingHorizontal: 15,
        paddingTop: 10
    },
    latestElement:{

    }
});

export default styles;