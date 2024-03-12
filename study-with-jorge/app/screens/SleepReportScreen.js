import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

function SleepReportScreen(props) {
    const data = [
        {value: 7, label: 'M'},
        {value: 6, label: 'T'},
        {value: 7, label: 'W'},
        // {value: 3, label: 'W', frontColor: '#177AD5'},
        {value: 7, label: 'T'},
        {value: 9, label: 'F'},
        {value: 9, label: 'S'},
        {value: 6, label: 'S'}
    ];
    const noData = [
        {value: 0, label: 'M'},
        {value: 0, label: 'T'},
        {value: 0, label: 'W'},
        // {value: 3, label: 'W', frontColor: '#177AD5'},
        {value: 0, label: 'T'},
        {value: 0, label: 'F'},
        {value: 0, label: 'S'},
        {value: 0, label: 'S'}
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
                    <BarChart data={noData}/>
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

export default SleepReportScreen;