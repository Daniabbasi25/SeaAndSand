import React from 'react';
import BaseScreen from '../base';
import { TextApp, SizedBox, TouchableScale } from '@BaseComponent';
import { View, Image, StyleSheet } from 'react-native';
import { thankyou } from '@Images';
import { useTheme } from 'react-native-paper';
import { BASE_DOMAIN } from 'react-native-dotenv';

const ThankYouScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const handleBack = () => {
        navigation.navigate('Home');
    }
    return (
        <BaseScreen
            usePadding
        >
            <View style={styles.container}>
                <Image source={thankyou} style={styles.image} />
                <SizedBox height={15} />
                <TextApp bold h5 style={styles.transformText}>{global.language['ThankYou']}!</TextApp>
                <SizedBox height={5} />
                <TextApp bold h8 style={styles.transformText}>{global.language['ForYourOrder']}</TextApp>
                <TextApp style={styles.transformText}>{global.language['AndSupportingUs']}</TextApp>
                <SizedBox height={40} />
                <TextApp button style={{ ...styles.des, ...styles.transformText }}>{global.language['ThankYouQuote']}</TextApp>
                <SizedBox height={10} />
                <TextApp primary medium style={styles.transformText}>{BASE_DOMAIN && `@${BASE_DOMAIN.replace(/ /g, '')}`}</TextApp>
                <TouchableScale onPress={() => handleBack()}>
                    <View style={[styles.wrapBack, { backgroundColor: colors.primary }]}>
                        <TextApp bold quaternary style={styles.transformText}>{global.language['GoHome']}</TextApp>
                    </View>
                </TouchableScale>
            </View>
        </BaseScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150
    },
    wrapBack: {
        height: 50,
        paddingHorizontal: 60,
        borderRadius: 10,
        marginVertical: 20,
        justifyContent: 'center'
    },
    des: {
        textAlign: 'center'
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left'
    }
})
export default React.memo(ThankYouScreen);
