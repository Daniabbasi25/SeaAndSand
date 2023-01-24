import React, { useRef } from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
// import { DescriptionUserInformation, FormUserInformation, ButtonUserInformation } from '@UserInformationScreenComponent';
import { HeaderApp } from '@BaseComponent';

const UserInformationScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={"User Information"} />}
            usePadding
        >
        </BaseScreen>
    );
};
export default React.memo(UserInformationScreen);
