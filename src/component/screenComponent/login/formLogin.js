import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput, Checkbox, Button } from 'react-native-paper';
import SizedBox from '../../baseComponent/sizedBox';
import { Storage } from '@Helper';
import _ from 'lodash';

const FormLogin = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { email, password, remember }
            }
        }),
    )
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const handleForgotPassword = () => {
        props.navigation.navigate('ForgotPassword');
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            getLocalData();
        });
        return unsubscribe;
    }, [props.navigation]);

    const getLocalData = async () => {
        const response = await Storage.getCustomerRemebermeLoginInfo();
        if (!_.isNull(response) && response['remember']) {
            setEmail(response?.email);
            setPassword(response?.password);
            setRemember(response?.remember);
        }
    }

    return (
        <View style={styles.root}>
            <TextInput
                label={global.language["EmailAddress"]}
                autoCapitalize={'none'}
                textContentType={'emailAddress'}
                autoCorrect={false}
                value={email}
                onChangeText={text => setEmail(text)}
                mode={'outlined'}
                outlineColor={colors.disabled}
                theme={{ roundness: 10 }}
                style={{ backgroundColor: '#F3F5F7', textAlign: global.isRtl ? 'right' : 'left' }}

            />
            <SizedBox height={10} />
            <TextInput
                label={global.language["Password"]}
                autoCapitalize={'none'}
                textContentType={'password'}
                secureTextEntry={hiddenPassword}
                autoCorrect={false}
                value={password}
                onChangeText={text => setPassword(text)}
                mode={'outlined'}
                outlineColor={colors.disabled}
                theme={{ roundness: 10 }}
                style={{ backgroundColor: '#F3F5F7', textAlign: global.isRtl ? 'right' : 'left' }}
                right={<TextInput.Icon
                    name={hiddenPassword ? 'eye-off' : 'eye'}
                    forceTextInputFocus={false}
                    onPress={() => setHiddenPassword(!hiddenPassword)}
                    color={colors.primary}
                />}
            />
            <SizedBox height={5} />
            <View style={styles.action}>
                <Checkbox.Item
                    label={global.language['RememberMe']}
                    labelStyle={{ textAlign: 'left', color: colors.textSecondary }}
                    style={{ marginLeft: 0, paddingLeft: 0 }}
                    position={'leading'}
                    mode={'android'}
                    color={colors.primary}
                    uncheckedColor={colors.disabled}
                    status={remember ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setRemember(!remember);
                    }}
                />
                <Button
                    onPress={() => handleForgotPassword()}
                    uppercase={false}
                >
                    {global.language['ForgotPassword']}
                </Button>
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    root: {
        paddingTop: 30
    },
    action: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

})
export default React.memo(FormLogin);