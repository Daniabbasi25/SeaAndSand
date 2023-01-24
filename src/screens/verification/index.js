import React, { useRef } from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
// import { DescriptionHistory, FormHistory, ButtonHistory } from '@VerificationScreenComponent';
import { HeaderApp } from '@BaseComponent';

const VerificationScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={"Verification"} />}
            usePadding
        >
        </BaseScreen>
    );
};
export default React.memo(VerificationScreen);
