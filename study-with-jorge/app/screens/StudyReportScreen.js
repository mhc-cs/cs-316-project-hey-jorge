import React from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';



function StudyReportScreen(props) {
    const data = [
        {value: 2, label: 'M'},
        {value: 1, label: 'T'},
        {value: 3, label: 'W'},
        // {value: 3, label: 'W', frontColor: '#177AD5'},
        {value: 1, label: 'T'},
        {value: 0, label: 'F'},
        {value: 5, label: 'S'},
        {value: 3, label: 'S'}
    ];
    const Data1 = [
        {value: 3, label: 'M'},
        {value: 2, label: 'T'},
        {value: 2, label: 'W'},
        // {value: 3, label: 'W', frontColor: '#177AD5'},
        {value: 4, label: 'T'},
        {value: 0.5, label: 'F'},
        {value: 5, label: 'S'},
        {value: 3, label: 'S'}
    ];
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{paddingTop: 30, paddingBottom: 30}}>
                    <Text style={styles.title}>This Week</Text>
                    <BarChart data={data}/>
                {/* <Text style={{ color: "blue", textAlign: "center", fontSize: 18 }}>Here is your study report!</Text> */}
                </View>

                <View style={styles.block}></View>

                <View style={{paddingTop: 30, paddingBottom: 30}}>
                    <Text style={styles.title}>Last Week</Text>
                    <LineChart data={Data1}/>
                {/* <Text style={{ color: "blue", textAlign: "center", fontSize: 18 }}>Here is your study report!</Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        paddingBottom: 10
    },
    block: {
        backgroundColor: 'grey',
        height: 10,
    }
});

export default StudyReportScreen;