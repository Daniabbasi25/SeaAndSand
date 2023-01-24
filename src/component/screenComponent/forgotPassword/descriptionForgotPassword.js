import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import styled from 'styled-components';
import { TextApp } from '@BaseComponent';

const DescriptionForgotPassWord = ({ sent }) => {
    const { fontSizes, colors, fonts } = useTheme();
    const TextContent = styled.Text`
        font-size: ${fontSizes.body}px;
    `;
    const textContent = sent ? global.language['CheckInboxWhenMailSuccess'] : global.language['EnterEmail'];
    return (
        <View style={styles.root}>
            {sent && <TextApp bold h7 primary style={styles.sentTitle}>{`${global.language['EmailSentSuccess']}!`}</TextApp>}
            <TextContent style={[styles.quote, { ...fonts.regular, color: colors.textSecondary }]}>{textContent}</TextContent>
        </View>
    )
}
const styles = StyleSheet.create({
    quote: {
        paddingTop: 5,
        textAlign: 'center',
    },
    sentTitle: {
        textAlign: 'center',
        marginTop: 50,
        paddingVertical: 10,
    }
})
export default React.memo(DescriptionForgotPassWord);