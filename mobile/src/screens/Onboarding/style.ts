import { StyleSheet, Dimensions} from "react-native";
  
import { 
    colors,
    typography 
} from '../../theme';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary.white,
    },
    slide: {
      flex: 1,
    },  
    image: {
      width: width,
      height: height * 0.54,
    },
    textContainer: {
      alignItems: "center",
      paddingHorizontal: 30,
      paddingTop: 20,
      height: 237,
  
      /*
      backgroundColor: '#000',
      
      justifyContent: 'space-between'*/
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text.other,
      textAlign: "center",
      marginBottom: 5,
    },
    description: {
      fontSize: 13,
      color: colors.text.secondaray,
      textAlign: "center",
      marginBottom: 20,
  
    },
    startButton: {
      backgroundColor: colors.primary.main,
      paddingVertical: 12,
      paddingHorizontal: 38,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
      marginTop: 53,
    },
    startText: {
      color: colors.text.white,
      fontSize: 16,
      fontWeight: "bold",
    },
    dot: {
      backgroundColor: colors.primary.white,
      borderColor: colors.primary.main,
      borderWidth: 1,
      width: 12,
      height: 12,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: colors.primary.main,
      width: 12,
      height: 12,
      borderRadius: 5,
    },
    textStartNow:{
      fontSize: 13,
      color: colors.text.secondaray,
      textAlign: "center",
      marginTop: 10,
    }
});

export default styles;