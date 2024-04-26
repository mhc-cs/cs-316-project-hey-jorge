import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';  // Using FontAwesome

import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import HomeScreen from "./screens/homeScreen";
import FriendsScreen from "./screens/friendScreen";
import ChatsScreen from "./screens/chatsScreen";
import ChatsMessageScreen from "./screens/chatsMessageScreen";
import Library from './screens/Library';
import Humanity from './screens/3rd';
import Science from './screens/2nd';
import Social from './screens/1st';
import ClassroomDetail from './screens/ClassroomDetail';
import ProfileScreen from './screens/ProfileScreen';
import StudyReportScreen from './screens/StudyReportScreen';
import SleepReportScreen from './screens/SleepReportScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create a Bottom Tab Navigator
// Create a Bottom Tab Navigator
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Chat') {
            iconName = focused ? 'comments' : 'comments-o';  // Home icon for Main
          } else if (route.name === 'Study') {
            iconName = focused ? 'book' : 'book';  // Book icon for Study
          } else if (route.name === 'Me') {
            iconName = focused ? 'user' : 'user';  // User icon for Me
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: { paddingBottom: 5, fontSize: 10 },
        style: { padding: 10, height: 70 }
      }}
    >
      <Tab.Screen name="Chat" component={HomeScreen} />
      <Tab.Screen name="Study" component={Library} />
      <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
  );
}



// Main Stack Navigator that includes the Tab Navigator
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Messages" component={ChatsMessageScreen} />
        <Stack.Screen name='Humanity' component={Humanity} />
        <Stack.Screen name='Math & Science' component={Science} />
        <Stack.Screen name='Social Science' component={Social} />
        <Stack.Screen name="ClassroomDetail" component={ClassroomDetail} />
        <Stack.Screen name="Study Report" component={StudyReportScreen} />
        <Stack.Screen name="Sleep Report" component={SleepReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

