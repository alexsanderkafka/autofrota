import React, { useState } from "react";
import { Pressable, View, Animated, StyleSheet } from "react-native";
import { colors } from "../theme";


export default function SwitchButton(){

    const [isActive, setIsActive] = useState(false);
    const translateX = new Animated.Value(isActive ? 20 : 0);

    const toggleSwitch = () => {
        Animated.timing(translateX, {
        toValue: isActive ? 0 : 20,
        duration: 200,
        useNativeDriver: true,
        }).start();
        setIsActive(!isActive);
    };

    return (
        <Pressable onPress={toggleSwitch} style={[styles.container, isActive && styles.active]}>
            <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
        </Pressable>
    );
}


const styles = StyleSheet.create({
    container: {
      width: 41,
      height: 21,
      borderRadius: 5,
      backgroundColor: "#ddd",
      justifyContent: "center",
      padding: 3,
    },
    active: {
      backgroundColor: colors.primary.main,
    },
    circle: {
      width: 15,
      height: 15,
      borderRadius: 50,
      backgroundColor: colors.primary.white,
    },
  });