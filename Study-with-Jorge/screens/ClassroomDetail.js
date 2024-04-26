import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, FlatList, Text, Alert, ImageBackground, Image } from 'react-native';
import { UserType } from '../UserContext';  // Make sure the path is correct

const ClassroomDetail = ({ route, navigation }) => {
  const { classroomId, chairs } = route.params;
  const [currentChairs, setCurrentChairs] = useState(chairs);
  const [occupiedChairId, setOccupiedChairId] = useState(null);

  // Using useContext to access the userId
  const { userId } = useContext(UserType);

  useEffect(() => {
    navigation.setOptions({ title: route.params.classroomName || 'Classroom Details' });
    console.log("Received classroomId:", classroomId);
    console.log("Chairs data at mount:", chairs);
  }, [navigation, route.params]);

  const handleSelectChair = async (chair) => {
    console.log("Chair click event fired", chair.id);
    if (occupiedChairId && occupiedChairId !== chair.id) {
      Alert.alert("Error", "Please release your current chair before selecting a new one.");
      return;
    }

    const url = `http://localhost:3000/classrooms/${classroomId}/chairs/${chair.id}/toggle`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId })  // Using the actual userId from context
      });
      const data = await response.json();
      console.log("Server response:", data);
      if (response.ok) {
        const newChairs = currentChairs.map(c => c.id === chair.id ? { ...c, isOccupied: !c.isOccupied } : c);
        setCurrentChairs(newChairs);
        setOccupiedChairId(chair.isOccupied ? chair.id : null);
        Alert.alert("Status", data.message);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", "Unable to update chair status. Please try again.");
    }
  };

  const renderChairButton = ({ item }) => (
    <TouchableOpacity
      disabled={item.isOccupied && item.id !== occupiedChairId}
      onPress={() => handleSelectChair(item)}
      style={styles.chairButton}
    >
      <ImageBackground
        source={require('../assets/chair.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.textContainer}>
          <Text style={styles.chairTagText}>{item.tag}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={currentChairs}
        renderItem={renderChairButton}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
      />
      <Image source={require('../assets/m&c.png')} style={styles.bottomRightImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  chairButton: {
    width: '25%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  occupiedChair: {
    backgroundColor: 'grey',
  },
  availableChair: {
    backgroundColor: 'lightgrey',
  },
  chairTagText: {
    color: '#3c3d3d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 5, // Rounded corners
    paddingVertical: 4, // Vertical padding
    paddingHorizontal: 10, // Horizontal padding
    margin: 4, // Add some margin if you want to separate the container from the edges of the button
    alignSelf: 'center', // Center the container
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRightImage: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 642/3.8,
    height: 929/3.8,
  },
});

export default ClassroomDetail;
