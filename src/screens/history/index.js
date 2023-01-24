import React from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { ListHistory } from '@HistoryScreenComponent';
import { HeaderApp } from '@BaseComponent';

const HistoryScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <BaseScreen
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={global.language['BookingHistory']} />}
            usePadding
        >
            <ListHistory navigation={navigation} />

        </BaseScreen>
    );
};
export default React.memo(HistoryScreen);
