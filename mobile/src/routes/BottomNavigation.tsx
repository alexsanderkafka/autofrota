import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Vehicles from '../screens/Vehicles';
import ReportScreen from '../screens/Report';
import { colors } from '../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: colors.text.other,
        tabBarInactiveTintColor: colors.icon.main,
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
          headerTintColor: colors.text.other,
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

        <Tab.Screen name="Veículos" component={Vehicles}
        options={{
            headerTintColor: colors.text.other,
            tabBarIcon: ({ focused }) => <Icon
            name="car"
            size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
          />,
          }}
        />

        <Tab.Screen name="Relatórios" component={ReportScreen}
        options={{
            headerTintColor: colors.text.other,
            tabBarIcon: ({ focused }) => <Icon
            name="chart-bar"
            size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
            />,
          }}
        />

      <Tab.Screen name="Perfil" component={Profile}
        options={{
            headerTintColor: colors.text.other,
            tabBarIcon: ({ focused }) => <Icon
            name="account"
            size={24} color={focused ? colors.icon.mainBlue : colors.icon.main}
            />,
          }}
        />
    </Tab.Navigator>
  );
}