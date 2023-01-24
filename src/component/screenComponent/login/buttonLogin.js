import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TextApp, IndicatorComponent, TouchableScale } from '@BaseComponent';
import * as Animatable from 'react-native-animatable';

const ButtonLogin = ({ executeLogin, loading }) => {
    const { colors } = useTheme();
    const handlePress = () => {
        return executeLogin();
    }
    return (
        <Animatable.View
            style={styles.root}
            iterationDelay={400}
            animation={'shake'}
        >
            <TouchableScale onPress={() => handlePress()}>
                <View style={[styles.button, { backgroundColor: colors.primary }]}>
                    {loading ? <IndicatorComponent color={'#FFFFFF'} /> : <TextApp bold quaternary>{global.language['SignIn']}</TextApp>}
                </View>
            </TouchableScale>
        </Animatable.View>
    )
}
const styles = StyleSheet.create({
    root: {
        paddingTop: 20,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }

})
export default React.memo(ButtonLogin);