import React, { useState, useImperativeHandle, forwardRef } from 'react';
import _ from 'lodash';
import { View, StyleSheet, FlatList } from 'react-native';
import { TouchableScale, TextApp, SizedBox } from '@BaseComponent';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';
import { boatHours } from '../../../../config/params/defaultParams';
import { Device } from '@Helper';

const SelectHour = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { dataSelected }
            }
        }),
    );

    const [dataSelected, setDateSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    const { colors } = useTheme();

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const handleSelectTime = (time) => {
        setDateSelected(time);
        closeModal();
    }

    const itemTimeModal = (value) => {
        return (
            <TouchableScale onPress={() => handleSelectTime(value)}>
                <View style={dataSelected == value ? styles.wrapTitleModalSelected : styles.wrapTitleModal}>
                    {dataSelected == value ? <TextApp title quaternary style={styles.transformText}>{value}</TextApp> : <TextApp title style={styles.transformText}>{value}</TextApp>}
                </View>
            </TouchableScale >
        )
    }
    const modal = () => {
        return (
            <Modal
                isVisible={visible}
                backdropTransitionOutTiming={0}
                onBackdropPress={() => closeModal()}
                style={styles.modal}
            >
                <View style={styles.wrapModal}>
                    <FlatList
                        data={boatHours}
                        renderItem={({ item }) => itemTimeModal(item)}
                        keyExtractor={(item) => `key_${item}`}
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                    />
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.root}>
            <TextApp medium title style={styles.transformText}>{global.language['StartTime']}</TextApp>
            <TouchableScale onPress={() => openModal()}>
                <View style={styles.wrapLocation}>
                    <MaterialCommunityIcons name={'clock-outline'} size={30} color={colors.primary} />
                    <SizedBox width={5} />
                    <TextApp medium primary style={styles.transformText}>{dataSelected ? `${dataSelected}` : global.language['ChooseStartTime']}</TextApp>
                    {modal()}
                </View>
            </TouchableScale>
        </View>
    )
});

const styles = StyleSheet.create({
    root: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    wrapLocation: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        ...CommonStyle.dropShadow
    },
    modal: {
        // alignItems: 'center',
    },
    wrapModal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        height: 400,
        width: '100%',
        paddingVertical: 5
    },
    imageBackground: {
        height: 100,
        borderRadius: 10,
    },
    textImageBackground: {
        position: 'absolute',
        top: 25,
        left: 20,
        zIndex: 99999999
    },
    wrapTitleModal: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#FFFFFF',
        borderBottomColor: '#EEEEEE',
        borderWidth: 2,
        textAlign: 'center',
        width: (Device.width - 40) / 4
    },
    wrapTitleModalSelected: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#FFFFFF',
        borderBottomColor: '#EEEEEE',
        borderWidth: 2,
        textAlign: 'center',
        width: (Device.width - 40) / 4,
        backgroundColor: '#4286F9',
        borderRadius: 10,
    },
    wrapItemLocation: {
        padding: 10,
    },
    overlay: {
        position: 'absolute',
        left: 10,
        top: 10,
        height: 100,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 9999
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left'
    }

});

export default React.memo(SelectHour);