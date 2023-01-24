import React, { useState, useImperativeHandle, forwardRef } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, SizedBox } from '@BaseComponent';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';
import DateRangePicker from './DateRangePicker';

const PickTime = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { dataSelected }
            }
        }),
    );

    const [dataSelected, setDateSelected] = useState({});
    const [visible, setVisible] = useState(false);
    const { colors } = useTheme();

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const onSelectRangeDay = (start, end) => {
        setDateSelected({
            start_date: start,
            end_date: end
        });
    }

    const modal = () => {
        return (
            <Modal
                isVisible={visible}
                backdropTransitionOutTiming={0}
            >
                <View style={styles.wrapModal}>
                    <TouchableScale onPress={() => closeModal()}>
                        <View style={styles.wrapTitleModal}>
                            <TextApp bold title style={styles.transformText}>{global.language['CheckInOut']}?</TextApp>
                            <MaterialCommunityIcons
                                name={'close'}
                                size={30}
                                color={colors.primary} />
                        </View>
                    </TouchableScale>
                    <DateRangePicker
                        minDate={new Date()}
                        onSuccess={(s, e) => onSelectRangeDay(s, e)}
                        theme={{ markColor: colors.primary, markTextColor: 'white' }} />
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.root}>
            <TextApp medium title style={styles.transformText}>{props?.element?.title}</TextApp>
            <TouchableScale onPress={() => openModal()}>
                <View style={styles.wrapLocation}>
                    <MaterialCommunityIcons name={'clock-outline'} size={30} color={colors.primary} />
                    <SizedBox width={5} />
                    <TextApp medium primary style={styles.transformText}>{dataSelected?.start_date && dataSelected?.end_date ? `${dataSelected?.start_date} - ${dataSelected?.end_date}` : global.language['ChooseTimeCheckInOut']}</TextApp>
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
    wrapModal: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        height: 400

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
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10
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

export default React.memo(PickTime);