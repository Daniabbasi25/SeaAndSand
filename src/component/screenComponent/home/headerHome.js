import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, ImageApp, SizedBox } from '@BaseComponent';
import { useSelector } from 'react-redux';
import { Identify } from '@Helper';

const HeaderHome = ({ navigation }) => {
    const userInformation = useSelector(state => state.user.userInformation);
    const handlePress = () => {
        if (userInformation) {
            navigation.navigate('Account');
        }
    }
    return (
        <View style={styles.wrapHeaderHome}>
            <View>
                <TextApp bold primary h7 style={styles.quote}>{`${userInformation?.name ? global.language[`Hi`] + ' ' + userInformation?.name : global.language[`HiThere`]}!`}</TextApp>
                <SizedBox height={5} />
                <TextApp textSecondary body style={styles.quote}>{`${global.language['HomeQuote']}`}</TextApp>
            </View>
            <TouchableScale onPress={() => handlePress()}>
                <ImageApp source={{ uri: Identify.generateImageUrl(userInformation?.avatar) }} style={styles.imageAvatar} />
            </TouchableScale>
        </View >
    )
}

const styles = StyleSheet.create({
    wrapHeaderHome: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginTop: 10,
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    quote: {
        textAlign: global.isRtl ? 'right' : 'left'
    }
});

export default React.memo(HeaderHome);