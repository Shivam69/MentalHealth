import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Vector Icons

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CareScreen from '../screens/CareScreen';
import DailyScreen from '../screens/DailyScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HOME') {
              iconName = 'home';
            } else if (route.name === 'EXPLORE') {
              iconName = 'search';
            } else if (route.name === 'CARE') {
              iconName = 'heart';
            } else if (route.name === 'DAILY') {
              iconName = 'calendar';
            } else if (route.name === 'PROFILE') {
              iconName = 'user';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'black',
            paddingVertical: 5,
            borderTopWidth: 0,
            elevation: 10,
            shadowOpacity: 0.1,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: 'bold',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="HOME" component={HomeScreen} />
        <Tab.Screen name="EXPLORE" component={ExploreScreen} />
        <Tab.Screen name="CARE" component={CareScreen} />
        <Tab.Screen name="DAILY" component={DailyScreen} />
        <Tab.Screen name="PROFILE" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
