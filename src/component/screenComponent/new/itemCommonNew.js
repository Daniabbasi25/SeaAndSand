import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import { useTheme } from 'react-native-paper';
import DetailNews from './detailNews';

const ItemCommonNew = ({ item }) => {
    const { deviceSize } = useTheme();
    const itemSize = deviceSize.width - 20;
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <>
            <TouchableScale
                scaleTo={0.95}
                onPress={() => openModal()}
            >
                <View style={[styles.contentItem, { width: itemSize }]}>
                    <View style={styles.leftContent}>
                        {item?.image_url && <Image source={{ uri: item?.image_url }} style={styles.image} />}
                    </View>
                    <View style={styles.rightContent}>
                        <TextApp bold style={{...styles.textTitle,...styles.title}} numberOfLines={3}>{item?.title}</TextApp>
                        <View style={styles.informationItem}>
                            <TextApp caption style={styles.informationText}>{item?.created_at}</TextApp>
                            <View style={styles.dot} />
                            <TextApp caption style={styles.informationText}>{item?.author?.display_name}</TextApp>
                        </View>
                    </View>
                </View>
            </TouchableScale>
            <DetailNews item={item} visible={visible} closeModal={() => closeModal()} />
        </>
    )
}
const styles = StyleSheet.create({
    contentItem: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
    },
    leftContent: {
        width: '30%'
    },
    image: {
        width: '100%',
        height: 80,
        borderRadius: 10
    },
    rightContent: {
        width: '66%',
        justifyContent: 'flex-start',
    },
    informationItem: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
    },
    textTitle: {

    },
    informationText: {

    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: '#DEDEDE',
        borderRadius: 2.5,
        marginHorizontal: 10,
    },
    title: {
        textAlign: global.isRtl ? 'right' : 'left'
    }
});

export default React.memo(ItemCommonNew);