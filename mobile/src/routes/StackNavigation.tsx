
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
import ChangePassword from '../screens/ChangePassword';
import SendCode from '../screens/SendCode';
import AddNewVehicle from '../modal/AddNewVehicle';
import AddNewFuel from '../modal/AddNewFuel';
import AddNewMaintenance from '../modal/AddNewMaintenance';
import Checklist from '../modal/Checklist';
import UpdateScheduledMaintenance from '../modal/UpdateScheduledMaintenance';

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

            <Stack.Screen 
                name="SendCode" 
                component={SendCode}
                options={{
                    title: "",
                    headerStyle:{
                        backgroundColor: colors.primary.white,
                    },
                    headerTintColor: colors.text.other,
                }}
            />

            <Stack.Screen 
                name="ChangePassword" 
                component={ChangePassword}
                options={{
                    title: "",
                    headerStyle:{
                        backgroundColor: colors.primary.white,
                    },
                    headerTintColor: colors.text.other,
                }}
            />

            <Stack.Screen
            name="AddVehicle"
            component={AddNewVehicle}
            options={{
                 presentation: 'modal', 
                 headerShown: false, 
                 animation: 'slide_from_bottom',
                 autoHideHomeIndicator: true,
                }}
            />

            <Stack.Screen
            name="AddNewFuel"
            component={AddNewFuel}
            options={{
                 presentation: 'modal', 
                 headerShown: false, 
                 animation: 'slide_from_bottom',
                 autoHideHomeIndicator: true,
                }}
            />

            <Stack.Screen
            name="AddNewMaintenance"
            component={AddNewMaintenance}
            options={{
                 presentation: 'modal', 
                 headerShown: false, 
                 animation: 'slide_from_bottom',
                 autoHideHomeIndicator: true,
                }}
            />

            <Stack.Screen
            name="Checklist"
            component={Checklist}
            options={{
                 presentation: 'modal', 
                 headerShown: false, 
                 animation: 'slide_from_bottom',
                 autoHideHomeIndicator: true,
                }}
            />

            <Stack.Screen
            name="UpdateScheduledMaintenance"
            component={UpdateScheduledMaintenance}
            options={{
                 presentation: 'modal', 
                 headerShown: false, 
                 animation: 'slide_from_bottom',
                 autoHideHomeIndicator: true,
                }}
            />

            </Stack.Navigator>  
      </NavigationContainer>
      </Provider>
    );
}