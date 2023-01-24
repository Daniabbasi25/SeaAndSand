import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';
import { TextApp, TouchableScale, IndicatorComponent } from '@BaseComponent';
import Toast from 'react-native-toast-message';
import { changePassword } from '../../../redux/userRedux';

const FormPassWord = ({ navigation }) => {
    const [passWord, setPassWord] = useState(null);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const handleSetData = (name, value) => {
        let newPassWord = {
            ...passWord, ...{ [name]: value }
        };
        setPassWord(newPassWord)
    }

    const changePass = () => {
        if (!passWord?.current_password || !passWord?.new_password || !passWord?.new_password_again) {
            Toast.show({
                type: 'info',
                text1: global.language['Attention'],
                text1Style: { fontSize: 40 },
                text2: global.language['PleaseFillAllFields'],
                visibilityTime: 3000,
            });
            return;
        }
        if (passWord?.new_password != passWord?.new_password_again) {
            Toast.show({
                type: 'info',
                text1: global.language['Attention'],
                text1Style: { fontSize: 40 },
                text2: global.language['PassWordNotMatch'],
                visibilityTime: 3000,
            });
            return;
        }
        let dataPost = passWord;
        delete dataPost?.new_password_again;
        setLoading(true);
        changePassword(dataPost).then(res => {
            setLoading(false);
            if (res.status) {
                navigation.goBack();
                Toast.show({
                    type: 'success',
                    text1: global.language['Successfully'],
                    text1Style: { fontSize: 40 },
                    text2: res?.message,
                    visibilityTime: 3000,
                });

            }
            else {
                Toast.show({
                    type: 'error',
                    text1: global.language['Oops'],
                    text1Style: { fontSize: 40 },
                    text2: res?.message,
                    visibilityTime: 3000,
                });
            }
        })

    }

    const itemFormInput = (label, name, icon) => (
        <TextInput
            label={label}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={passWord?.[name]}
            onChangeText={text => handleSetData(name, text)}
            mode={'outlined'}
            outlineColor={colors.disabled}
            theme={{ roundness: 10 }}
            style={{ backgroundColor: '#F3F5F7', marginVertical: 10, textAlign: global.isRtl ? 'right' : 'left' }}
            right={<TextInput.Icon
                name={icon}
                forceTextInputFocus={false}
                color={colors.primary}
                disabled={true}
            />}

        />
    )

    return (
        <View>
            {itemFormInput(global.language['CurrentPassword'], 'current_password', 'lock')}
            {itemFormInput(global.language['NewPassword'], 'new_password', 'lock')}
            {itemFormInput(global.language['NewPasswordAgain'], 'new_password_again', 'lock')}
            <TouchableScale onPress={() => changePass()}>
                <View style={[styles.touchable, { backgroundColor: colors.primary }]}>
                    {loading ? <IndicatorComponent color={'#FFFFFF'} /> : <TextApp bold quaternary>{global.language['ChangePassword'].toUpperCase()}</TextApp>}
                </View>
            </TouchableScale>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapItemDateTime: {
        paddingVertical: 20,
        backgroundColor: '#F3F5F7',
        marginVertical: 10,
        borderColor: '#DEDEDE',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    touchable: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20
    }
});
export default React.memo(FormPassWord);