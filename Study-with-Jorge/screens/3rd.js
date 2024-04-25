import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, FlatList, TextInput, Text } from 'react-native';

const generateChairsForClassroom = (classroomTag) => {
  const CHAIRS_PER_CLASSROOM = 20;
  let chairsData = [];
  
  for (let i = 1; i <= CHAIRS_PER_CLASSROOM; i++) {
    chairsData.push({
      id: `${classroomTag}-${i}`, // Unique ID for each chair, now using classroomTag
      tag: `Seat ${i}`,
      imageSource: require('../assets/chair.jpg')
    });
  }
  
  return chairsData;
};

const TAG_NAMES = [
  'ARCH', 'ARTH', 'ARTST', 'ASIAN','CLASS', 'DANCE', 'ENGL', 'FMT', 
  'FREN', 'GNDST', 'GREEK', 'GRMST', 'HIST', 'ITAL', 'JWST', 'LATAM', 
  'LATIN', 'MUSIC', 'PHIL', 'RELIG', 'RES', 'SPAN',
];

const BUTTONS_DATA = []; // Initialize an empty array

for (let i = 0; i < TAG_NAMES.length; i++) {
  const tagName = TAG_NAMES[i];
  const classroomData = {
    id: tagName, // Using tagName as the unique ID for each classroom
    tag: tagName, // The classroom name from TAG_NAMES
    imageSource: require('../assets/classroom.jpg'),
    chairs: generateChairsForClassroom(tagName) // Generating chairs using tagName
  };
  BUTTONS_DATA.push(classroomData);
}


// Humanity
const Humanity = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredButtons, setFilteredButtons] = useState(BUTTONS_DATA);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = text.trim() === '' ? BUTTONS_DATA : BUTTONS_DATA.filter(item => item.tag.toLowerCase().includes(text.toLowerCase()));
    setFilteredButtons(filtered);
  };

  const renderButton = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ClassroomDetail', { classroomId: item.id, chairs: item.chairs, classroomName: item.tag })} style={styles.button}>
      <Image source={item.imageSource} style={styles.image} />
      <Text style={styles.tagText}>{item.tag}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by tag..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredButtons}
        renderItem={renderButton}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '25%', // Fill the width of the list
    height: 150, // Set the height of the button
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    overflow: 'hidden', // Ensures the image doesn't go outside the button bounds
    marginBottom: 10, // Add some space between buttons
  },
  image: {
    position: 'absolute', // Ensure the image covers the button background
    width: '100%', // Cover the button area
    height: '100%', // Cover the button area
    resizeMode: 'cover', // Cover the button area without distorting the image
  },
  tagText: {
    color: '#fff', // Text color
    fontSize: 14, // Adjusted for better fit within the box
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    paddingHorizontal: 4, // Horizontal padding
    paddingVertical: 2, // Vertical padding
    borderRadius: 4, // Rounded corners for the background box
    overflow: 'hidden', // Ensures the background does not overflow the rounded corners
    alignSelf: 'center', // Center the tag text box within the button
    marginTop: 5, // Margin at the top to separate from the top edge of the button
  },
  
  searchBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    margin: 10,
    borderRadius: 5,
  },
});

export default Humanity;