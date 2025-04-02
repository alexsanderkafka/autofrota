import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import VehicleScreen from '../screens/AddVehicleScreen';
import Perfil from '../screens/Perfil';
import ReportScreen from '../screens/ReportScreen';
import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
              name="home"
              size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
          />,
          tabBarLabel: "Home"
          }}
        />

        <Tab.Screen name="Veículos" component={VehicleScreen}
        options={{
            headerTintColor: '#176585',
            tabBarIcon: ({ focused }) => <Icon
            name="car"
            size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
          />,
          }}
        />

        <Tab.Screen name="Relatórios" component={ReportScreen}
        options={{
            headerTintColor: '#176585',
            tabBarIcon: ({ focused }) => <Icon
            name="chart-bar"
            size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
            />,
          }}
        />

      <Tab.Screen name="Configurações" component={VehicleScreen}
        options={{
            headerTintColor: '#176585',
            tabBarIcon: ({ focused }) => <Icon
            name="cog"
            size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
            />,
          }}
        />
    </Tab.Navigator>
  );
}

//user-shape