import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import styled from 'styled-components/native';
import { TextApp } from '@BaseComponent';

const OtherLogin = () => {
    const { colors, spacingLayout } = useTheme();
    const Divider = styled.View`
        height: 1.5px;
        width: 30%;
        background-color: ${colors.disabled}
    `;
    return (
        <View style={styles.root}>
            <Divider/>
                <TextApp textSecondary style={{ paddingHorizontal: spacingLayout.horizontal }}>{global.language['OrContinueWith']}</TextApp>
            <Divider/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 25,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default React.memo(OtherLogin);