import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TextApp, IndicatorComponent, TouchableScale } from '@BaseComponent';

const ButtonSignUp = ({ executeSignUp, loading }) => {
    const { colors } = useTheme();
    const handlePress = () => {
        return executeSignUp();
    }
    return (
        <View style={styles.root}>
            <TouchableScale onPress={() => handlePress()}>
                <View style={[styles.button, { backgroundColor: colors.primary }]}>
                    {loading ? <IndicatorComponent color={'#FFFFFF'} /> : <TextApp bold quaternary>{global.language['SignUp'].toUpperCase()}</TextApp>}
                </View>
            </TouchableScale>
        </View>
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
export default React.memo(ButtonSignUp);