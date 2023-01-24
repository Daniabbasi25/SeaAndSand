import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

const ButtonForgotPassWord = ({ navigation, executeForgotPassWord, sent }) => {
    const { fonts } = useTheme();
    const handlePress = () => {
        if (sent) {
            return navigation.goBack();
        }
        return executeForgotPassWord();
    }
    return (
        <View style={styles.root}>
            <Button mode={'contained'} onPress={() => handlePress()} style={styles.button} theme={{ roundness: 10 }}>
                <Text style={fonts.bold}>{sent ? global.language['SignIn'] : global.language['GetNewPassword']}</Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        paddingTop: 20,
        marginVertical: 10
    },
    button: {
        paddingVertical: 7
    }

})
export default React.memo(ButtonForgotPassWord);