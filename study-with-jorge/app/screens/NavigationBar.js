import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ProfileScreen from './ProfileScreen';
import StudyReportScreen from './StudyReportScreen';
import SleepReportScreen from './SleepReportScreen';
import Home from './Home';
import Chat from './Chat';
import Library from './Library';
import Humanity from './3rd';
import Science from './2nd';
import Social from './1st';
import ClassroomDetail from './ClassroomDetail';

const homeName = "HomePage";
const libraryName = "LibraryPage";
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

function LibraryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Library" 
                component={Library}
                options={{ headerTitle: 'Library' }}
            />
            <Stack.Screen name='Humanity' component={Humanity} />
            <Stack.Screen name='Math & Science' component={Science} />
            <Stack.Screen name='Social Science' component={Social} />
            <Stack.Screen name="ClassroomDetail" component={ClassroomDetail} />
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
                    else if (route.name === libraryName) {
                        let iconName = 'book-open';
                        let iconType = focused ? 'solid' : 'light';  // Using solid for focused, light for unfocused
                        return <FontAwesome5 name={iconName} size={size} color={color} solid={focused} light={!focused} />;
                    } 
                    else if (rn === profileName) {
                        icon = focused ? 'user' : 'user-o';
                        return < Icon name={icon} size={size} color={color} />;
                    }
                },
            })}
            >

            <Tab.Screen name={homeName} component={ChatStack} />
            <Tab.Screen name={libraryName} component={LibraryStack} />
            <Tab.Screen name={profileName} component={ProfileStack} />
        </Tab.Navigator>
    );
}

export default NavigationBar;