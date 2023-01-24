import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, SizedBox } from '@BaseComponent';
import Swiper from 'react-native-swiper';
import FirstScreen from './firstScreen';
import SecondScreen from './secondScreen';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View>
            {/* <FirstScreen /> */}
            <SecondScreen />
        </View>
    )
}

const styles = StyleSheet.create({


});

export default React.memo(WelcomeScreen);