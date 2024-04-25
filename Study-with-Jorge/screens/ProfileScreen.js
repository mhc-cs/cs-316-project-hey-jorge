import React, { useEffect, useContext, useState } from 'react';
import { UserType } from "../UserContext";
import { StyleSheet, View, Text, Image, SafeAreaView, Button, ScrollView, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';


const UpdateSchedule = ({ fetchSchedule, onScheduleSaved }) => {
    const { userId } = useContext(UserType);
    const [rows, setRows] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState(false);

    const handleButtonClick = () => {
        setRows(prevRows => [...prevRows, { id: currentIndex }]);
        setCurrentIndex(prevIndex => prevIndex + 1);
        setDisplayText(false); // Reset displayText to false to show the save button
    };

    const handleSaveButtonClick = async (rowId) => {
        const row = rows.find(row => row.id === rowId);
        if (!row) {
            return;
        }
        try {
            const scheduleData = { userId, newTime: row.text1, newCourse: row.text2 };
            await axios.post(`http://localhost:8080/schedule/${userId}`, scheduleData);
            onScheduleSaved();
            // setDisplayText(true); // After saving, hide the save button and show the circle button
            setRows(prevRows => prevRows.filter(r => r.id !== rowId));
        } catch (error) {
            console.log("Error in adding the schedule", error);
        }
    };

    const handleTextInputChange = (rowId, index, text) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === rowId ? { ...row, [`text${index}`]: text } : row
            )
        );
    };

    return (
        <View style={styles.container}>
            {rows.map((row, index) => (
                <View key={row.id} style={styles.rowContainer}>
                    <View style={styles.textboxRow}>
                        <TextInput
                            style={[styles.textInput, { width: 150 }]} // Set a fixed width for the text inputs
                            placeholder="Enter time"
                            value={row[`text1`] || ''}
                            onChangeText={text => handleTextInputChange(row.id, 1, text)}
                            editable={!displayText}
                        />
                        <TextInput
                            style={[styles.textInput, { width: 150 }]} // Set a fixed width for the text inputs
                            placeholder="Enter course"
                            value={row[`text2`] || ''}
                            onChangeText={text => handleTextInputChange(row.id, 2, text)}
                            editable={!displayText}
                        />
                        {!displayText && (
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => handleSaveButtonClick(row.id)}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        )}
                        
                    </View>
                </View>
            ))}
            {displayText}
            <TouchableOpacity style={styles.circleButtonContainer} onPress={handleButtonClick}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};




function ProfileScreen({navigation}) {

    const { userId } = useContext(UserType);
    const [userData, setUserData] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [userStudyTimeArray, setUserStudyTimeArray] = useState([]);

    const fetchSchedule = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/schedule/${userId}`
            );
            console.log('Response status:', response.status);
            if (response.status === 404) {
                console.log('Schedule not found');
                return;
            }
            const data = await response.json();
            console.log('Schedule Response:', data);
    
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch user schedule');
            }
            setSchedule(data); // Update state with schedule data
            console.log('Schedule:', data); // Log schedule data
        } catch (error) {
            console.log("Error in fetching the schedule", error);
        }
    };
    

    useEffect(() => {
        fetchSchedule();
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // const response = await axios.get(`http://localhost:8080/profile/${userId}`);

                const response = await fetch(
                    `http://localhost:8080/profile/${userId}`
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch user profile');
                }
                setUserData(data);

                // Now you have access to email and image data
                console.log('Name:', data.name);
                console.log('Email:', data.email);
                console.log('Image:', data.image);
            } catch (err) {
                console.log("error message profile", err);
            }
        };
        fetchUserProfile();
        fetchSchedule();
    }, [userId]);
    

    // const handleScheduleSaved = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/schedule/${userId}`);
    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error(data.error || 'Failed to fetch user schedule');
    //         }
    //         setSchedule(data);
    //     } catch (error) {
    //         console.log("Error in fetching the updated schedule", error);
    //     }
    // };

    const handleScheduleSaved = () => {
        fetchSchedule();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {userData && (
                    <View style={styles.row}>
                        <Image 
                            style={styles.userImage}
                            source={{ uri: userData.image }}
                        />
                        <View style={styles.column}>
                            <Text style={styles.userInfo}>{userData.name}{"\n"}</Text>
                            <Text style={styles.userInfo}>{userData.email}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.block}></View>

                <View style={{paddingTop: 25, paddingBottom: 20}}>
                    <View style={{paddingLeft: 30}}>
                        <Text style={styles.title}>Study Info</Text>
                        <Text style={styles.info}>Today: </Text>
                        <Text style={styles.info}>Yesterday: </Text>
                        <Text style={styles.info}>This Week: </Text>
                    </View>
                    <View>
                        <TouchableOpacity title='View Report' onPress={() => navigation.navigate('Study Report')} >
                            <Text style={styles.reviewButton}>View Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.block}></View>

                <View style={{paddingTop: 25, paddingBottom: 25}}>
                    <View style={{paddingLeft: 30}}>
                        <Text style={styles.title}>Schedule</Text>
                        <View style={styles.scheduleColumn}>
                            {schedule.map((item, index) => (
                                    <View key={index} style={styles.scheduleRow}>
                                        <Text style={styles.info}>Time: {item.time}</Text>
                                        <Text style={styles.detail}>Course: {item.course}</Text>
                                    </View>
                            ))}
                        </View>
                        <View style={styles.scheduleRow}>
                            <UpdateSchedule
                                fetchSchedule={fetchSchedule} // Pass fetchSchedule function as prop
                                onScheduleSaved={handleScheduleSaved} // Pass handleScheduleSaved function as prop
                            />
                        </View>
                        {/* <View style={styles.scheduleRow}>
                            <Text style={styles.info}>COMSC-243</Text>
                            <Text style={styles.detail}>Tue, Thu 9:00m-10:15am{"\n"}Carr 101</Text>
                        </View>
                        <View style={styles.scheduleRow}>
                            <Text style={styles.info}>COMSC-316</Text>
                            <Text style={styles.detail}>Tue 1:45pm-3:00pm{"\n"}Thu 1:45pm-4:20pm{"\n"}Reese 301</Text>
                        </View>
                        <View style={styles.scheduleRow}>
                            <Text style={styles.info}>COMSC-316</Text>
                            <Text style={styles.detail}>Tue 1:45pm-3:00pm{"\n"}Thu 1:45pm-4:20pm{"\n"}Reese 301</Text>
                        </View> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight
    },
    userImage: {
        width: 100,
        height: 100,
        marginLeft: 30,
        alignSelf: "center",
    },
    userInfo: {
        flexDirection: "column",
        justifyContent: "center",
        fontSize: 22,
        fontWeight: "bold",
    },
    column: {
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        paddingRight: 130,
        paddingBottom: 30,
        paddingTop:20
    },
    title: {
        paddingBottom: 10,
        fontSize: 22,
        fontWeight: "bold"
    },
    info: {
        paddingBottom: 10,
        paddingHorizontal: 5,
        fontSize: 18,
    },
    reviewButton: {
        color: "blue",
        textAlign: "right",
        paddingRight: 30,
        fontSize: 18
    },
    detail: {
        flexDirection:"column",
        fontSize: 18,
        paddingLeft: 50
    },
    scheduleColumn: {
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingBottom: 5,
    },
    scheduleRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    block: {
        backgroundColor: 'grey',
        height: 10,
    },
    button: {
        width: 25,
        height: 25,
        borderRadius: 75,
        backgroundColor: 'blue',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
        marginRight:30,
        alignSelf: 'flex-end'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    textboxRow: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        width: 150,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    saveButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
    textboxContainer: {
        flex: 1,
        marginRight: 30,
    },
    rowContainer: {
        marginRight: 30,
    },
    fixedSize: {
        width: 150,
    },
    circleButtonContainer: {
        width: 25,
        height: 25,
        borderRadius: 75,
        backgroundColor: 'blue',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
        marginRight:30,
        alignSelf: 'flex-end'
    },
});


export default ProfileScreen;