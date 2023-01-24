import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import {
    MaterialIndicator,
} from 'react-native-indicators';
import { useTheme } from 'react-native-paper';

const Indicator = (props) => {
    const { colors } = useTheme();
    return (
        <View style={styles.wrapIndicator}>
            <MaterialIndicator
                size={35}
                color={props?.color ? props?.color : colors.primary}
                animationDuration={3000}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapIndicator: {
        position: 'absolute',
        top: -(70 + StatusBar.currentHeight),
        top:-70,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
});
export default React.memo(Indicator);