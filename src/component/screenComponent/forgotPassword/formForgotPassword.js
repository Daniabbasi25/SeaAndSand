import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';

const FormForgotPassWord = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { email }
            }
        }),
    )
    const { colors } = useTheme();
    const [email, setEmail] = useState('');

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
                right={<TextInput.Icon
                    name={'mail'}
                    forceTextInputFocus={false}
                    color={colors.primary}
                    disabled={true}
                />}
            />
        </View>
    )
});

const styles = StyleSheet.create({
    root: {
        paddingTop: 30
    }
})
export default React.memo(FormForgotPassWord);