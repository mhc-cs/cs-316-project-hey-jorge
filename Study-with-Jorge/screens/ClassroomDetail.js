import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, FlatList, Text, Alert } from 'react-native';

const ClassroomDetail = ({ route, navigation }) => {
  const { classroomId, chairs } = route.params;  // Retrieve classroomId and chairs from navigation parameters
  const [currentChairs, setCurrentChairs] = useState(chairs);
  const [occupiedChairId, setOccupiedChairId] = useState(null);

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
            body: JSON.stringify({ userId: 'testUserId' })
        });
        const data = await response.json();
        console.log("Server response:", data);
        if (response.ok) {
            const newChairs = currentChairs.map(c => c.id === chair.id ? { ...c, isOccupied: !c.isOccupied } : c);
            setCurrentChairs(newChairs);
            setOccupiedChairId(chair.isOccupied ? chair.id : null);  // Correctly update the occupied chair ID
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
      style={[styles.chairButton, item.isOccupied ? styles.occupiedChair : styles.availableChair]}
    >
      <Text style={styles.chairTagText}>{item.tag}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={currentChairs}
      renderItem={renderChairButton}
      keyExtractor={(item) => item.id.toString()}
      numColumns={4}
    />
  );
};

const styles = StyleSheet.create({
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
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 4,
  },
});

export default ClassroomDetail;