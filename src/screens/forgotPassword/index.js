import React, { useRef, useState } from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { DescriptionForgotPassword, ImageForgotPassWord, FormForgotPassword, ButtonForgotPassword } from '@ForgotPassWordScreenComponent';
import { HeaderApp } from '@BaseComponent';

const ForgotPasswordScreen = ({ navigation }) => {
    const formForgotPasswordRef = useRef(null);
    const { colors } = useTheme();
    const [sent, setSend] = useState(false);

    const handleForgotPassword = () => {
        setSend(true);
    }
    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp middleContent={global.language["ForgotPassword"]} />}
            usePadding
        >
            <DescriptionForgotPassword sent={sent} />
            <ImageForgotPassWord sent={sent} />
            {!sent && <FormForgotPassword ref={formForgotPasswordRef} navigation={navigation} />}
            <ButtonForgotPassword executeForgotPassWord={() => handleForgotPassword()} sent={sent} navigation={navigation} />
        </BaseScreen>
    );
};
export default React.memo(ForgotPasswordScreen);
