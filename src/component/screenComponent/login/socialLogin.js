import React from 'react';
import { View, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import TouchableScale from '../../baseComponent/touchableScale';

const SocialLogin = () => {
    const itemSocialLogin = (name, color) => {
        return (
            <TouchableScale style={styles.touchableScale}>
                <Entypo size={42} name={name} color={color} />
            </TouchableScale>
        )
    }
    return (
        <View style={styles.root}>
            {itemSocialLogin('facebook-with-circle', '#4267B2')}
            {itemSocialLogin('google--with-circle', '#db4a39')}
            {itemSocialLogin('twitter-with-circle', '#1DA1F2')}
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        paddingTop: 20,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableScale: {
        marginHorizontal: 10,
        shadowColor: 'grey',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }

})
export default React.memo(SocialLogin);