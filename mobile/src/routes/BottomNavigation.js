import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ico-material-design';

import Home from '../screens/Home';
import VehicleScreen from '../screens/AddVehicleScreen';
import Perfil from '../screens/Perfil';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: '#176585',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          marginBottom: 5,
        },
      }}
    >
        <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          title: "AutoFrota",
          headerTintColor: colors.text.title,
          headerStyle: {
              backgroundColor: '#FFF'
          },
          tabBarIcon: ({ focused }) => <Icon
              name="home-button"
              color={focused ? "#176585" : "#000"}
          />,
          tabBarLabel: "Home"
          }}
        />

        <Tab.Screen name="Adicionar" component={VehicleScreen}
        options={{
            headerTintColor: '#176585',
            tabBarIcon: ({ focused }) => <Icon
            name="square-add-button"
            color={focused ? "#176585" : "#000"}
            />,
          }}
        />

        <Tab.Screen name="Perfil" component={Perfil}
        options={{
            headerTintColor: '#176585',
            tabBarIcon: ({ focused }) => <Icon
            name="user-shape"
            color={focused ? "#176585" : "#000"}
            />,
          }}
        />
    </Tab.Navigator>
  );
}

//user-shape