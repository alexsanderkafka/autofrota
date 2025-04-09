
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation'

import Home from '../screens/Home';
import Login from '../screens/Login';
import Vehicle from '../screens/Vehicle';
import Maintenance from '../screens/Maintenance';
import Fuel from '../screens/Fuel'
import OnboardingScreen from '../screens/Onboarding';

import {
    colors
} from '../theme'

import { Portal, Provider } from 'react-native-paper';

import { 
    TouchableOpacity,
} from "react-native";
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function MyStack(){
    return (
        <Provider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">

            <Stack.Screen 
                name="Onboarding" 
                component={OnboardingScreen}
                options={{
                    headerShown: false
                }}
            />
                

            <Stack.Screen 
                name="Login" 
                component={Login}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name="BottomNavigation" 
                component={BottomNavigation}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name="Vehicle" 
                component={Vehicle}
                options={{
                    title: "Veículo",
                    headerStyle:{
                        backgroundColor: colors.primary.white,
                    },
                    headerTintColor: colors.text.other,
                }}
            />

            <Stack.Screen 
                name="Maintenance" 
                component={Maintenance}
                options={{
                    title: "Manutenções",
                    headerStyle:{
                        backgroundColor: colors.primary.white,
                    },
                    headerTintColor: colors.text.other,
                }}
            />

            <Stack.Screen 
                name="Fuel" 
                component={Fuel}
                options={{
                    title: "Abastecimentos",
                    headerStyle:{
                        backgroundColor: colors.primary.white,
                    },
                    headerTintColor: colors.text.other,
                }}
            />

            <Stack.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    title: "Perfil",
                    headerStyle:{
                        backgroundColor: colors.primary.white,
                    },
                    headerTintColor: colors.text.other,
                }}
            />

            </Stack.Navigator>  
      </NavigationContainer>
      </Provider>
    );
}