import React from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { ListNew } from '@NewScreenComponent';
import { HeaderApp } from '@BaseComponent';

const ListNewScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <BaseScreen
            header={<HeaderApp middleContent={global.language["News"]} />}
            usePadding
        >
            <ListNew />
        </BaseScreen>
    );
};
export default React.memo(ListNewScreen);
