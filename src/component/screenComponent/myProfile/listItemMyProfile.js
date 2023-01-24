import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';
import { TextApp, TouchableScale } from '@BaseComponent';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux';

const ListItemMyProfile = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { dataForm }
            }
        }),
    )
    const [dataForm, setDataForm] = useState({});
    const [visible, setVisible] = useState(false);
    const { colors } = useTheme();
    const userInformation = useSelector(state => state.user.userInformation);

    useEffect(() => {
        let dataUser = {
            business_name: userInformation?.business_name?.toString(),
            email: userInformation?.email?.toString(),
            first_name: userInformation?.first_name?.toString(),
            last_name: userInformation?.last_name?.toString(),
            phone: userInformation?.phone?.toString(),
            address: userInformation?.address?.toString(),
            address2: userInformation?.address2?.toString(),
            city: userInformation?.city?.toString(),
            zip_code: userInformation?.zip_code?.toString(),
            birthday: userInformation?.birthday?.toString()
        };
        setDataForm(dataUser);
    }, []);

    const handleSetData = (name, value) => {
        let newDataForm = {
            ...dataForm, ...{ [name]: value }
        };
        setDataForm(newDataForm);
    }

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const itemFormInput = (label, type, icon) => (
        <TextInput
            label={label}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={dataForm?.[type]}
            onChangeText={text => handleSetData(type, text)}
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

    const handleChooseTime = () => {
        openModal();
    }
    const handleSelectDate = (day) => {
        handleSetData('birthday', day?.dateString);
        closeModal();
    }

    const itemDateTime = () => (
        <>
            <TouchableScale onPress={() => handleChooseTime()}>
                <View style={styles.wrapItemDateTime}>
                    <TextApp placeholder>{dataForm?.birthday ? dataForm?.birthday : global.language[`Birthday`]}</TextApp>
                    <MaterialCommunityIcons
                        name={'calendar'}
                        color={'#B2CCF7'}
                        size={22}
                    />
                </View>
            </TouchableScale>
            <Modal
                isVisible={visible}
                backdropTransitionOutTiming={0}
                onBackdropPress={() => closeModal()}
            >
                <Calendar
                    minDate={'1900-05-10'}
                    onDayPress={(day) => { handleSelectDate(day) }}
                    style={{ borderRadius: 10 }}
                />
            </Modal>
        </>
    )
    return (
        <View>
            {itemFormInput(global.language['BusinessName'], 'business_name', 'account')}
            {itemFormInput(global.language['Email'], 'email', 'mail')}
            {itemFormInput(global.language['FirstName'], 'first_name', 'account')}
            {itemFormInput(global.language['LastName'], 'last_name', 'account')}
            {itemFormInput(global.language['Phone'], 'phone', 'phone')}
            {itemDateTime()}
            {itemFormInput(global.language['Address'], 'address', 'home')}
            {itemFormInput(global.language['Address2'], 'address2', 'home')}
            {itemFormInput(global.language['City'], 'city', 'city')}
            {itemFormInput(global.language['ZipCode'], 'zip_code', 'credit-card')}
        </View>
    )


});

const styles = StyleSheet.create({
    wrapItemDateTime: {
        paddingVertical: 20,
        backgroundColor: '#F3F5F7',
        marginVertical: 10,
        borderColor: '#DEDEDE',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
export default React.memo(ListItemMyProfile);
/*
business_name
email
first_name
last_name
phone
birthday
bio
address
address2
city
country
zip_code
avatar_id
*/