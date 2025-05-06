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

} from '../../theme';

import styles from "./style";


//import SlideOne from '../../assets/onboarding/slide-1.jpg';

const { width, height } = Dimensions.get("window");

const slides = [
  {
    image: require("../../../assets/onboarding/slide-1.png"),
    title: "Pronto para gerenciar a sua frota? ",
    description: "Gerencia sua frota de uma  forma simples e eficiente",
  },
  {
    image: require("../../../assets/onboarding/slide-2.png"),
    title: "Análise completa de dados",
    description: "Acompanhe o histórico de abastecimento e manutenções da sua frota",
  },
  {
    image: require("../../../assets/onboarding/slide-3.jpg"),
    title: "Geração de relatórios",
    description: "Insights detalhados da sua frota para tomada de decisões",
  },
  {
    image: require("../../../assets/onboarding/slide-4.png"),
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