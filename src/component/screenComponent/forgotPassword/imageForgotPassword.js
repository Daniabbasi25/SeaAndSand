import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { sendMail, receiveMail } from '@Images';

const ImageForgotPassWord = ({ sent }) => {
    return (
        <View style={styles.root}>
            <Image
                source={!sent ? sendMail : receiveMail}
                style={styles.image}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        marginTop: 30,
    },
    image: {
        width: 170,
        height: 170,
    }
})
export default React.memo(ImageForgotPassWord);