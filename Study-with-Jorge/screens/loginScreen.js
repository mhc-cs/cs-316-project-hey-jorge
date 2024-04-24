import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const backImage = require("../assets/Jorge.jpeg");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8080/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      });
  };

  return (
    <ImageBackground
      source={backImage} // Replace with the correct path to your image file
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Sign in</Text>
            <Text style={styles.headerSubtitle}>Sign In to Your Account</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholderTextColor={"white"}
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor={"white"}
              placeholder="Enter your password"
            />
          </View>

          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Don't have an account? Sign Up</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardView: {
    width: '100%',
  },
  headerContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: "#4A55A2",
    fontSize: 17,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    fontSize: 18,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
    color: "white"
  },
  loginButton: {
    width: 200,
    backgroundColor: "#4A55A2", // You can replace with your preferred shade of blue
    padding: 15,
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 6,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerButton: {
    marginTop: 15,
  },
  registerButtonText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
  },
});

