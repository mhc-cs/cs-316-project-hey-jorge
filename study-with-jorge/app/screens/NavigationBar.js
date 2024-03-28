import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileScreen from './ProfileScreen';
import StudyReportScreen from './StudyReportScreen';
import SleepReportScreen from './SleepReportScreen';
import HomeScreen from './HomeScreen';

const homeName = "Home";
const profileName = "Profile";


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

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
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70},
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

                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={profileName} component={ProfileScreen} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default NavigationBar;