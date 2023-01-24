import React from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { FormPassWord } from '@ChangePassWordScreenComponent';
import { HeaderApp } from '@BaseComponent';

const ChangePassWordScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={global.language["ChangePassword"]} />}
            usePadding
        >
            <FormPassWord navigation={navigation} />
        </BaseScreen>
    );
};
export default React.memo(ChangePassWordScreen);
