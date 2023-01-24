import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getListWishlist } from '../../../redux/otherRedux';
import ItemWishList from './itemWishList';
import { Indicator, EmptyData } from '@BaseComponent';

const ListWishList = ({ navigation }) => {
    const [list, setList] = useState(null);
    useEffect(() => {
        getListWishlist().then(res => {
            if (res.status) {
                setList(res?.data)
            }
        })
    }, []);
    if (!list) {
        return <Indicator />
    }
    return (
        <FlatList
            data={list}
            renderItem={({ item }) => <ItemWishList item={item} navigation={navigation} />}
            keyExtractor={(item) => `item_wish_list_${item?.id}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 20 }}
            ListEmptyComponent={() => <EmptyData message={`${global.language['EmptyWishList']}!`} />}
        />
    )
}

export default React.memo(ListWishList);