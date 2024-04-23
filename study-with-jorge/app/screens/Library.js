import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function Library({ navigation }) {
    return (
        <ImageBackground 
          source={require('../assets/campus.jpg')}
          style={styles.backgroundImage}
        >
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Humanity')}
                >
                    <Text style={styles.buttonText}>3rd Floor: Humanity</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Math & Science')}
                >
                    <Text style={styles.buttonText}>2nd Floor: Math & Science</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Social Science')}
                >
                    <Text style={styles.buttonText}>1st Floor: Social Science</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      justifyContent: 'center', // Align content vertically in the center
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center', // Align content vertically in the center
      alignItems: 'center', // Align content horizontally in the center
    },
    button: {
        width: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 5,
        margin: 5
    },
    buttonText: {
        color: '#000000',  
        fontSize: 14,
    },
    
  });

export default Library;