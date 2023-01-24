import React from 'react';
import {
    MaterialIndicator,
} from 'react-native-indicators';
import { useTheme } from 'react-native-paper';

const IndicatorComponent = ({ color, size }) => {
    const { colors } = useTheme();
    return (
        <MaterialIndicator
            size={size ? size : 26}
            color={color ? color : colors.primary}
            animationDuration={3000}
        />
    )
}

export default React.memo(IndicatorComponent);