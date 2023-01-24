import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, TextInput, Checkbox } from 'react-native-paper';
import { SizedBox, TextApp } from '@BaseComponent';
import { termPage } from '../../../config/path';
import { Identify } from '@Helper';
import { BASE_DOMAIN } from 'react-native-dotenv';

const FormSignUp = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { first_name: firstName, last_name: lastName, phone, email, password, term }
            }
        }),
    )
    const { colors, fontSizes } = useTheme();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [term, setTerm] = useState(0);

    const openTerm = () => {
        let terms = termPage;
        if (!terms.includes(BASE_DOMAIN)) {
            terms = Identify.checkBaseDomain(BASE_DOMAIN) + terms;
        }
        props.navigation.navigate('WebView', {
            url: terms,
            screen: ''
        });
    }

    return (
        <View style={styles.root}>
            <TextInput
                label={global.language['FirstName']}
                autoCapitalize={'none'}
                textContentType={'familyName'}
                autoCorrect={false}
                value={firstName}
                onChangeText={text => setFirstName(text)}
                mode={'outlined'}
                outlineColor={colors.disabled}
                theme={{ roundness: 10 }}
                style={{ backgroundColor: '#F3F5F7', textAlign: global.isRtl ? 'right' : 'left' }}
                right={<TextInput.Icon
                    name={'account'}
                    forceTextInputFocus={false}
                    color={colors.primary}
                    disabled={true}
                />}

            />
            <SizedBox height={10} />
            <TextInput
                label={global.language['LastName']}
                autoCapitalize={'none'}
                textContentType={'name'}
                autoCorrect={false}
                value={lastName}
                onChangeText={text => setLastName(text)}
                mode={'outlined'}
                outlineColor={colors.disabled}
                theme={{ roundness: 10 }}
                style={{ backgroundColor: '#F3F5F7', textAlign: global.isRtl ? 'right' : 'left' }}
                right={<TextInput.Icon
                    name={'account'}
                    forceTextInputFocus={false}
                    color={colors.primary}
                    disabled={true}
                />}

            />
            <SizedBox height={10} />
            <TextInput
                label={global.language['Phone']}
                autoCapitalize={'none'}
                textContentType={'telephoneNumber'}
                keyboardType={'phone-pad'}
                autoCorrect={false}
                value={phone}
                onChangeText={text => setPhone(text)}
                mode={'outlined'}
                outlineColor={colors.disabled}
                theme={{ roundness: 10 }}
                style={{ backgroundColor: '#F3F5F7', textAlign: global.isRtl ? 'right' : 'left' }}
                right={<TextInput.Icon
                    name={'phone'}
                    forceTextInputFocus={false}
                    color={colors.primary}
                    disabled={true}
                />}

            />
            <SizedBox height={10} />
            <TextInput
                label={global.language['EmailAddress']}
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
            <SizedBox height={10} />
            <TextInput
                label={global.language['Password']}
                autoCapitalize={'none'}
                textContentType={'password'}
                autoCorrect={false}
                value={password}
                onChangeText={text => setPassword(text)}
                mode={'outlined'}
                outlineColor={colors.disabled}
                theme={{ roundness: 10 }}
                style={{ backgroundColor: '#F3F5F7', textAlign: global.isRtl ? 'right' : 'left' }}
                right={<TextInput.Icon
                    name={'lock'}
                    forceTextInputFocus={false}
                    color={colors.primary}
                    disabled={true}
                />}
            />
            <SizedBox height={5} />
            <View style={styles.action}>
                <View style={styles.wrapLeftCheckBox}>
                    <Checkbox.Item
                        labelStyle={{ textAlign: 'left', color: colors.textSecondary }}
                        style={{ marginLeft: 0, paddingLeft: 0, marginRight: 0, paddingRight: 0 }}
                        position={'leading'}
                        mode={'android'}
                        color={colors.primary}
                        uncheckedColor={colors.disabled}
                        status={term ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTerm(term == 0 ? 1 : 0);
                        }}
                    />
                </View>
                <View style={styles.term}>
                    <TouchableOpacity
                        onPress={() => openTerm()}
                    >
                        <View style={styles.wrapTerm}>
                            <TextApp style={{
                                fontSize: fontSizes.body,
                                color: colors.primary,
                                textAlign: global.isRtl ? 'right' : 'left'
                            }}>{global.language['TermsAndPrivacyPolicy']}</TextApp>
                        </View>
                    </TouchableOpacity>
                </View>
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
    },
    wrapLeftCheckBox: {
        width: '10%'
    },
    term: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        width: '90%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

})
export default React.memo(FormSignUp);