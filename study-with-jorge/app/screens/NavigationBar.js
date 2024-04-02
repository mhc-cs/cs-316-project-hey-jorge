import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileScreen from './ProfileScreen';
import StudyReportScreen from './StudyReportScreen';
import SleepReportScreen from './SleepReportScreen';
import Home from './Home';
import Chat from './Chat';

const homeName = "HomePage";
const profileName = "ProfilePage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}

function ProfileStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Study Report" component={StudyReportScreen} />
            <Stack.Screen name="Sleep Report" component={SleepReportScreen} />
        </Stack.Navigator>
    )
}

function NavigationBar() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70},
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let icon;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    else if (rn === profileName) {
                        icon = focused ? 'user' : 'user-o';
                        return < Icon name={icon} size={size} color={color} />;
                    }
                },
            })}
            >

            <Tab.Screen name={homeName} component={ChatStack} />
            <Tab.Screen name={profileName} component={ProfileStack} />
        </Tab.Navigator>
    );
}

export default NavigationBar;