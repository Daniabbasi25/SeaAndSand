import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import Modal from 'react-native-modal';
import RNRestart from 'react-native-restart';
import { languages } from '../../../config/languages/index';
import { Identify, Storage, Device } from '@Helper';

const SettingLanguage = () => {
    const [showModal, setShowModal] = useState(false);

    const itemLanguage = (item) => {
        return (
            <TouchableOpacity onPress={() => onSetLanguage(item)}>
                <View style={styles.wrapItemLanguage}>
                    <TextApp>{item}</TextApp>
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
            `${global.language['ConfirmChangePassword']} ${item}?`,
            [
                {
                    text: global.language["Cancel"],
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: global.language["OK"], onPress: async () => {
                        closeModal();
                        const res = await Storage.saveData('language', item);
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
            <TextApp bold style={styles.wrapTitleModal}>{global.language['ChooseLanguage']}</TextApp>
            <FlatList
                data={Object.keys(languages)}
                renderItem={({ item }) => itemLanguage(item)}
                keyExtractor={(item, index) => `flat_item_language_${index}`}
            />
        </Modal>
    )

    return (
        <>
            <TouchableScale onPress={() => openModal()}>
                <View style={styles.wrapSettingLanguage}>
                    <View>
                        <TextApp>{global.language['Language']}</TextApp>
                    </View>
                    <View style={styles.wrapRightItem}>
                        <TextApp>{Identify.languageSelected}</TextApp>
                        <MaterialIcons name={'chevron-right'} size={24} />
                    </View>
                </View>
            </TouchableScale>
            {modal()}
        </>
    )
}

const styles = StyleSheet.create({
    wrapSettingLanguage: {
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
        marginTop:Device.isIphoneX() ? 40 : 10
    },
    wrapItemLanguage: {
        padding: 15,
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1
    },
    wrapTitleModal: {
        padding: 15
    }
});
export default React.memo(SettingLanguage);