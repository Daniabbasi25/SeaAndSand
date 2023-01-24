import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextApp } from '@BaseComponent';

const NewAccount = ({ navigation }) => {
    const goToSignUpScreen = () => {
        navigation.navigate('SignUp');
    }
    return (
        <View style={styles.root}>
            <TextApp regular style={{ textAlign: global.isRtl ? 'right' : 'left', marginHorizontal: 5 }}>{`${global.language[`DontHaveAccount`]}? `}</TextApp>
            <TouchableOpacity onPress={() => goToSignUpScreen()}>
                <TextApp bold primary style={{ textAlign: global.isRtl ? 'right' : 'left' }}>{`${global.language['SignUp']}`}</TextApp>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        paddingTop: 30,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },


})
export default React.memo(NewAccount);