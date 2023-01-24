import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import Modal from 'react-native-modal';
import { currency } from '../../../config/currency/index';
import { Storage, Device } from '@Helper';
import RNRestart from 'react-native-restart';

const SettingCurrency = () => {
    const [showModal, setShowModal] = useState(false);

    const itemCurrency = (item) => {
        return (
            <TouchableOpacity onPress={() => onSetLanguage(item)}>
                <View style={styles.wrapitemCurrency}>
                    <TextApp>{item.code} ({item.symbol})</TextApp>
                </View>
            </TouchableOpacity>
        )
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const onSetLanguage = (item) => {
        Alert.alert(
            `${global.language['Attention']}!`,
            `${global.language['ConfirmChangeCurrency']}${item.code}?`,
            [
                {
                    text: global.language["Cancel"],
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: global.language["OK"], onPress: async () => {
                        closeModal();
                        const res = await Storage.saveData('currency', JSON.stringify(item));
                        RNRestart.Restart();
                    }
                }
            ]
        )
    }

    const modal = () => (
        <Modal
            isVisible={showModal}
            backdropTransitionOutTiming={0}
            animationInTiming={1}
            style={styles.modal}
            onBackdropPress={() => closeModal()}
        >
            <TextApp bold style={styles.wrapTitleModal}>{global.language['ChooseCurrency']}</TextApp>
            <FlatList
                data={Object.values(currency)}
                renderItem={({ item }) => itemCurrency(item)}
                keyExtractor={(item, index) => `flat_item_language_${index}`}
            />
        </Modal>
    )

    return (
        <>
            <TouchableScale onPress={() => openModal()}>
                <View style={styles.wrapSettingCurrency}>
                    <View>
                        <TextApp>{global.language['Currency']}</TextApp>
                    </View>
                    <View style={styles.wrapRightItem}>
                        <TextApp>{global.currency.currency_main.toUpperCase()}</TextApp>
                        <MaterialIcons name={'chevron-right'} size={24} />
                    </View>
                </View>
            </TouchableScale>
            {modal()}
        </>
    )
}

const styles = StyleSheet.create({
    wrapSettingCurrency: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderBottomColor: '#DEDEDE',
        borderWidth: 1,
        paddingBottom: 15,
        paddingTop: 10
    },
    wrapRightItem: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingBottom: 15,
        marginTop: Device.isIphoneX() ? 40 : 10
    },
    wrapitemCurrency: {
        padding: 15,
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1
    },
    wrapTitleModal: {
        padding: 15
    }
});
export default React.memo(SettingCurrency);