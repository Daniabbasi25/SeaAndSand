
import React from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { ListItemSetting } from '@SettingScreen';
import { HeaderApp } from '@BaseComponent';

const SettingScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <BaseScreen
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={global.language['Settings']} />}
            usePadding
        >
            <ListItemSetting navigation={navigation} />
        </BaseScreen>
    );
};
export default React.memo(SettingScreen);
