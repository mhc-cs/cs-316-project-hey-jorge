import React, { useRef } from 'react'
import { View, ScrollView, Dimensions, TouchableHighlight, Text, PanResponder } from 'react-native'

const SCREENWIDTH = Dimensions.get('window').width;
const SCREENHEIGHT = Dimensions.get('window').height;

const DemoScroll = () => {
    return (
        <View style={{ width: SCREENWIDTH, height: SCREENHEIGHT }}>
            <ScrollView>
                <ScrollView style={{ height: 200, width: SCREENWIDTH }} nestedScrollEnabled={true}>
                    <View style={{ width: SCREENWIDTH, height: 1000, backgroundColor: 'lightgreen' }}></View>
                </ScrollView>
                <View style={{ height: 1000, width: SCREENWIDTH, backgroundColor: 'skyblue' }}></View>
            </ScrollView>
        </View>
    )
}

export default DemoScroll;