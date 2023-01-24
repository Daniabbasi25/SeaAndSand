import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import styled from 'styled-components';

const DescriptionSignUp = () => {
    const { fontSizes, colors, fonts } = useTheme();
    const TextContent = styled.Text`
        font-size: ${fontSizes.body}px;
    `;
    return (
        <View style={styles.root}>
            <TextContent style={[styles.quote, { ...fonts.regular, color: colors.textSecondary }]}>{global.language['SignUpQuote']}</TextContent>
        </View>
    )
}
const styles = StyleSheet.create({
    quote: {
        paddingTop: 5,
        textAlign: 'center',
    }
})
export default React.memo(DescriptionSignUp);