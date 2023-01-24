import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { TouchableScale, TextApp, SizedBox, IndicatorComponent } from '@BaseComponent';
import { getListLocation } from '../../../../redux/listRedux';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';
import _ from 'lodash';

const PickLocation = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { [props?.element?.field]: locationSelected?.id }
            }
        }),
    );

    const [locationSelected, setLocationSelected] = useState({});
    const [page, setPage] = useState(1);
    const [listLocation, setListLocation] = useState([]);
    const [total, setTotal] = useState();
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [visible, setVisible] = useState(false);
    const { colors } = useTheme();
    const requestData = () => {
        if (_.isEmpty(listLocation)) {
            getListLocation().then(res => {
                setListLocation(res.data);
                setTotal(res.total_pages);
            });
        }
    }

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    const handleSelectedItem = (item) => {
        setLocationSelected(item)
        closeModal();
    }

    const loadMoreData = () => {
        setLoadingLocation(true);
        if (page < total) {
            getListLocation({ page: page + 1 }).then(res => {
                let newData = [];
                newData = _.concat(listLocation, res.data)
                setListLocation(newData);
                setLoadingLocation(false);
                setPage(page + 1);
            });
        }
    }

    const itemLocation = (item) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectedItem(item)}
            >
                <View style={styles.wrapItemLocation}>
                    <Image
                        source={{ uri: item?.image }}
                        style={styles.imageBackground}
                    />
                    <View style={styles.overlay} />
                    <TextApp quaternary bold title style={styles.textImageBackground}>{item?.title}</TextApp>
                </View>
            </TouchableOpacity>
        )
    }

    const buttonLoadMore = () => {
        if (!_.isEmpty(listLocation) && page < total) {
            return (
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    paddingHorizontal: 15,
                }}>
                    {!loadingLocation && <View style={{
                        borderColor: colors.primary,
                        borderRadius: 10,
                        borderWidth: 2,
                        paddingVertical: 7,
                        paddingHorizontal: 15,
                    }}>
                        <TouchableScale
                            onPress={() => loadMoreData()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <MaterialCommunityIcons name={'chevron-double-down'} size={20} color={colors.primary} />
                            <TextApp primary>More</TextApp>

                        </TouchableScale>
                    </View>}
                    {loadingLocation && <IndicatorComponent color={colors.primary} />}
                </View>
            )
        }
        return <></>
    }

    const modal = () => {
        return (
            <Modal
                isVisible={visible}
                backdropTransitionOutTiming={0}
                onModalShow={() => requestData()}
            >
                <View style={styles.wrapModal}>
                    <TouchableScale onPress={() => closeModal()}>
                        <View style={styles.wrapTitleModal}>
                            <TextApp bold title>{global.language['WhereAreYouGoing']}</TextApp>
                            <MaterialCommunityIcons
                                name={'close'}
                                size={30}
                                color={colors.primary} />
                        </View>
                    </TouchableScale>
                    <FlatList
                        data={listLocation}
                        renderItem={({ item }) => itemLocation(item)}
                        keyExtractor={(item) => `key_location_${item?.id}`}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => buttonLoadMore()}
                    />
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.root}>
            <TextApp medium title style={styles.transformText}>{props?.element?.title}</TextApp>
            <TouchableScale onPress={() => openModal()}>
                <View style={styles.wrapLocation}>
                    <MaterialCommunityIcons name={'map-legend'} size={30} color={colors.primary} />
                    <SizedBox width={5} />
                    <TextApp medium primary>{locationSelected?.id ? locationSelected?.title : global.language['WhereAreYouGoing']}</TextApp>
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
        height: 500,
        paddingBottom: 10

    },
    imageBackground: {
        height: 100,
        borderRadius: 10,
    },
    textImageBackground: {
        position: 'absolute',
        left: global.isRtl ? undefined : 20,
        right: global.isRtl ? 20 : undefined,
        zIndex: 99999999,
        top: 20
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

export default React.memo(PickLocation);