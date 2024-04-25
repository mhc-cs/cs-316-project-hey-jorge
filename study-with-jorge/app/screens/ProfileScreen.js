import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, Button, ScrollView, StatusBar, TouchableOpacity } from 'react-native';

function ProfileScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.row}>
                    <Image 
                        style={styles.userImage}
                        source={require("../assets/icon.png")} 
                    />
                    <View style={styles.column}>
                        <Text style={styles.userInfo}>UserName {"\n"}</Text>
                        <Text style={styles.userInfo}>Email</Text>
                    </View>
                </View>
                {/* <View style={styles.editButton}></View> */}

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

                <View style={{paddingTop: 25, paddingBottom: 20}}>
                    <View style={{paddingLeft: 30}}>
                        <Text style={styles.title}>Sleep Info</Text>
                        <Text style={styles.info}>Today: </Text>
                        <Text style={styles.info}>Yesterday: </Text>
                        <Text style={styles.info}>This Week: </Text>
                    </View>
                    <View>
                        <TouchableOpacity title='View Report' onPress={() => navigation.navigate('Sleep Report')} >
                            <Text style={styles.reviewButton}>View Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.block}></View>

                <View style={{paddingTop: 25, paddingBottom: 25}}>
                    <View style={{paddingLeft: 30}}>
                        <Text style={styles.title}>Schedule</Text>
                        <View style={styles.scheduleRow}>
                            <Text style={styles.info}>COMSC-316</Text>
                            <Text style={styles.detail}>Tue 1:45pm-3:00pm{"\n"}Thu 1:45pm-4:20pm{"\n"}Reese 301</Text>
                        </View>
                        <View style={styles.scheduleRow}>
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
                        </View>
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
        // paddingTop:100,
        paddingTop: StatusBar.currentHeight
    },
    // editButton: {
    //     width: "60%",
    //     height: 70,
    //     backgroundColor: "#fc5c65",
    //     alignSelf: "flex-start"
    // },
    userImage: {
        width: 100,
        height: 100,
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
    scheduleRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 15,
    },
    block: {
        backgroundColor: 'grey',
        height: 10,
    }
});

export default ProfileScreen;