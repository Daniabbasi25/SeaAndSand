import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { TouchableScale, SizedBox, TextApp } from '@BaseComponent';
import HeaderList from './headerList';
import { useTheme } from 'react-native-paper';
import DetailNews from './detailNews';
import _ from 'lodash';

const ListLastestNew = ({ navigation, data }) => {
    if (data && !_.isEmpty(data)) {
        return (
            <View>
                <HeaderList title={global.language['LastestNews']} navigation={navigation} />
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => <ItemLastestNew item={item} />}
                    keyExtractor={(item) => `item_lastest_new_${item.id}`}
                    ItemSeparatorComponent={() => <SizedBox width={15} />}
                    style={styles.flatList}
                    contentContainerStyle={styles.contentFlatList}
                />
            </View>

        )
    }
}


const ItemLastestNew = ({ item }) => {
    const { deviceSize } = useTheme();
    const itemSize = deviceSize.width * .65;
    const imageAuthorSize = itemSize * .15;
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
                <View style={[styles.wrapItem, { width: itemSize, height: itemSize }]}>
                    <View style={[styles.overlay, { width: itemSize, height: itemSize }]} />
                    {item?.image_url && <Image style={[styles.imageItem, { width: itemSize, height: itemSize }]} source={{ uri: item?.image_url }} />}
                    <View style={styles.contentItem}>
                        <TextApp
                            bold
                            title
                            quaternary
                            style={styles.titleItem}>{item?.title}</TextApp>
                        <View style={styles.authorItem}>
                            {item?.author?.avatar_url && <Image style={[styles.authorImage, { width: imageAuthorSize, height: imageAuthorSize, borderRadius: imageAuthorSize / 2 }]} source={{ uri: item?.author?.avatar_url }} />}
                            <TextApp
                                style={styles.authorName} medium quaternary>{item?.author?.display_name}</TextApp>
                        </View>
                    </View>
                </View>
            </TouchableScale>
            <DetailNews item={item} visible={visible} closeModal={() => closeModal()} />
        </>
    )
}

const styles = StyleSheet.create({
    wrapItem: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 9,
    },
    imageItem: {
    },
    contentItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        alignItems: global.isRtl ? 'flex-end' : 'flex-start',
    },
    titleItem: {
        textAlign: global.isRtl ? 'right' : 'left'
    },
    authorItem: {
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
    },
    authorImage: {
        marginHorizontal: 5
    },
    authorName: {
        paddingLeft: 10,
        textAlign: global.isRtl ? 'right' : 'left'
    },
    flatList: {
        marginRight: -10,
    },
    contentFlatList: {
        paddingRight: 10,
    },
    title: {
        textAlign: global.isRtl ? 'right' : 'left'
    }

});

export default React.memo(ListLastestNew);