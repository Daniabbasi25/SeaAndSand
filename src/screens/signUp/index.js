import React, { useRef, useState } from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { DescriptionSignUp, FormSignUp, ButtonSignUp } from '@SignUpScreenComponent';
import { HeaderApp } from '@BaseComponent';
import { register } from '../../redux/userRedux';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { Identify } from '@Helper';

const SignUpScreen = ({ navigation }) => {
    const formSignUpRef = useRef(null);
    const { colors } = useTheme();
    const unmounted = useRef(false);
    const [loading, setLoading] = useState(false);

    const handleMessage = message => {
        if (_.isObject(message)) {
            _.forEach(Object.values(message), e => {
                return e[0];
            });
        }
        return `${global.language['SomethingWentWrongs']}!`;
    }
    const handleSignUp = () => {
        let dataRegister = formSignUpRef?.current?.getData();
        if (!dataRegister['term']) {
            Toast.show({
                type: 'info',
                text1: `${global.language['Attention']}!`,
                text1Style: { fontSize: 40 },
                text2: global.language['MustAgreeTerm'],
                visibilityTime: 3000,
            });
            return;
        }
        setLoading(true);
        register(dataRegister).then(res => {
            if (!unmounted.current) {
                setLoading(false);
            }
            if (res?.status) {
                navigation.goBack();
            }
            else {
                Toast.show({
                    type: 'info',
                    text1: `${global.language['Oops']}!`,
                    text1Style: { fontSize: 40 },
                    text2: Identify.handleErrorMessage(res?.message),
                    visibilityTime: 3000,
                });
                return;
            }
        })
    }
    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={global.language["CreateNewAccount"]} />}
            usePadding
        >
            <DescriptionSignUp />
            <FormSignUp ref={formSignUpRef} navigation={navigation} />
            <ButtonSignUp loading={loading} executeSignUp={() => handleSignUp()} />
        </BaseScreen>
    );
};
export default React.memo(SignUpScreen);
