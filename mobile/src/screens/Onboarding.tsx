import React, { useState } from "react";
import Swiper from "react-native-swiper";

import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Dimensions,
  SafeAreaView,
  StatusBar
 } from "react-native";

import { 
  colors,
  typography,

} from '../theme';


//import SlideOne from '../../assets/onboarding/slide-1.jpg';

const { width, height } = Dimensions.get("window");

const slides = [
  {
    image: require("../../assets/onboarding/slide-1.png"),
    title: "Pronto para gerenciar a sua frota? ",
    description: "Gerencia sua frota de uma  forma simples e eficiente",
  },
  {
    image: require("../../assets/onboarding/slide-2.png"),
    title: "Análise completa de dados",
    description: "Acompanhe o histórico de abastecimento e manutenções da sua frota",
  },
  {
    image: require("../../assets/onboarding/slide-3.jpg"),
    title: "Geração de relatórios",
    description: "Insights detalhados da sua frota para tomada de decisões",
  },
  {
    image: require("../../assets/onboarding/slide-4.png"),
    title: "Emissão de alertas",
    description: "Receba alertas de vencimento de manutenções",
  },
];

interface Props {
  navigation: any;
}

export default function OnboardingScreen ({ navigation }: Props){

  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSkip = () => {
    console.log("Skipped onboarding");
  };

  function handleLogin(){
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Swiper
        loop={false}
        onIndexChanged={(index) => setIsLastSlide(index === slides.length - 1)}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={styles.title}>{slide.title}</Text>
              <Text numberOfLines={2} style={styles.description}>{slide.description}</Text>
                <TouchableOpacity onPress={handleLogin} style={styles.startButton}>
                  <Text style={styles.startText}>Login</Text>
                </TouchableOpacity>

                <Text onPress={() => {}} style={styles.textStartNow}>Não tem uma conta? <Text style={{color: colors.text.other}}>Comece agora!</Text></Text>

            </View>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

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



