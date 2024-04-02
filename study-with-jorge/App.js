import { StatusBar } from 'expo-status-bar';
import React,  { useState, createContext, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './app/config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './app/screens/NavigationBar';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';


const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged(
            auth,
            async authenticatedUser => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setIsLoading(false);
            }
        );
    // unsubscribe auth listener on unmount
        return unsubscribeAuth;
        }, [user]);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
            </View>
        );
        }
    
    return (
      <NavigationContainer>
        {user ? <NavigationBar/> : <AuthStack />}
      </NavigationContainer>
    );
  }  

export default function App() {
  return(
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
