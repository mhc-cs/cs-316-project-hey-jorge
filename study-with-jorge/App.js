import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './app/screens/ProfileScreen';
import StudyReportScreen from './app/screens/StudyReportScreen';
import SleepReportScreen from './app/screens/SleepReportScreen';

const ProfileStack = createStackNavigator();

export default function App() {
  return(
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
    <NavigationContainer>
      <ProfileStack.Navigator initialRouteName='Profile'>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="Study Report" component={StudyReportScreen} />
        <ProfileStack.Screen name="Sleep Report" component={SleepReportScreen} />
      </ProfileStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
