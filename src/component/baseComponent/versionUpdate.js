import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import VersionCheck from 'react-native-version-check';
import { View, Image, StyleSheet, Linking } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import { CommonStyle } from '@Style';
import { headerUpdate } from '@Images';
import { useTheme } from 'react-native-paper';
import {useSelector} from 'react-redux';

const VersionUpdate = () => {
    const [visible, setVisible] = useState(false);
    const [information, setInformation] = useState({});
    const showSplash = useSelector(state => state.app.showSplash);
    const { colors } = useTheme();

    useEffect(() => {
        VersionCheck.needUpdate()
            .then(async res => {
                if (res?.isNeeded) {
                    openModal();
                    setInformation(res);
                }
            });
    }, []);

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const handleUpdate = () => {
        Linking.openURL(information?.storeUrl);
        closeModal();
    }
    if(visible && !showSplash) {
        return (
            <Modal
                visible={true}
                onBackdropPress={() => closeModal()}
                style={styles.modal}
            >
                <View style={styles.wrapModal}>
                    <Image source={headerUpdate} style={styles.imageHeader} resizeMode={'stretch'} />
                    <TextApp
                        bold
                        quaternary
                        title
                        style={styles.textHeader}>{global.language['UpdateAvailable']}</TextApp>
                    <View style={styles.wrapMessage}>
                        <TextApp>{global.language['QuoteUpdate']}</TextApp>
                    </View>
                    <TouchableScale onPress={() => handleUpdate()}>
                        <View style={styles.wrapButton}>
                            <View style={[styles.contentButton, , { backgroundColor: colors.primary }]}>
                                <TextApp quaternary bold>{global.language['UpdateNow']}</TextApp>
                            </View>
                        </View>
                    </TouchableScale>
                </View>
            </Modal>
        )
    }
    return null;
    
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        margin: 0,
        paddingHorizontal: 20
    },
    wrapModal: {
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        ...CommonStyle.dropShadow
    },
    imageHeader: {
        height: 70,
        width: '100%'
    },
    textHeader: {
        position: 'absolute',
        left: 20,
        top: 20
    },
    wrapButton: {
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
        marginBottom: 20
    },
    contentButton: {
        paddingVertical: 15,
        paddingHorizontal: 70,
        borderRadius: 10
    },
    contentText: {

    },
    wrapMessage: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 5
    }
});

export default React.memo(VersionUpdate);