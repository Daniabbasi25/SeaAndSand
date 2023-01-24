import React from 'react';
import BaseScreen from '../base';
import {  } from '@OptionScreenComponent';
import { HeaderApp } from '@BaseComponent';

const OptionScreen = ({ navigation }) => {
    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp middleContent={"Choose option"} />}
            usePadding
        >
        </BaseScreen>
    );
};
export default React.memo(OptionScreen);
