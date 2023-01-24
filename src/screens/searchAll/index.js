import React from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { ListSearch } from '@SearchAllScreenComponent';
import { HeaderApp } from '@BaseComponent';

const SearchAllScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const { keyword } = route?.params
    return (
        <BaseScreen
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={"Find What You Want"} />}
            usePadding
        >
            <ListSearch navigation={navigation} keyword={keyword}/>
        </BaseScreen>
    );
};
export default React.memo(SearchAllScreen);
