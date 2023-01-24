import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icons } from '@Assets';
import { useTheme } from 'react-native-paper';
import styled from 'styled-components';
import { TouchableScale } from '@BaseComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TitleLogin = ({ navigation }) => {
    const { fontSizes, colors, fonts } = useTheme();
    const TextTitle = styled.Text`
        font-size: ${fontSizes.h6}px;
        color: ${colors.primary};
    `;
    const TextContent = styled.Text`
        font-size: ${fontSizes.body}px;
    `;

    const openSetting = () => {
        navigation.navigate('Setting');
    }
    return (
        <View style={styles.root}>
            <View style={styles.wrapperTitle}>
                <View style={{ flexDirection: 'row' }}>
                    <TextTitle style={fonts.bold}>{global.language['WelcomeBack']}</TextTitle>
                    <Image source={Icons.wavingHand} style={styles.iconWaving} />
                </View>
                <TouchableScale onPress={() => openSetting()}>
                    <Ionicons name={'ios-settings-sharp'} size={26} />
                </TouchableScale>
            </View>
            <TextContent style={[styles.quote, { ...fonts.regular, color: colors.textSecondary }]}>{global.language['SignInQuote']}</TextContent>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        paddingTop: 30
    },
    wrapperTitle: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconWaving: {
        width: 25,
        height: 25,
        marginHorizontal: 10
    },
    quote: {
        paddingTop: 10,
        textAlign: global.isRtl ? 'right' : 'left'
    }
})
export default React.memo(TitleLogin);