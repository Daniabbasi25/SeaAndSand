import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ItemHistory from './itemHistory';
import { getListBookingHistory } from '../../../redux/otherRedux';
import { Indicator, SizedBox, EmptyData } from '@BaseComponent';

const ListHistory = ({ navigation }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getListBookingHistory().then(res => {
            setData(res?.data);
        });
    }, []);
    if (!data) {
        return <Indicator />
    }
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ItemHistory item={item} navigation={navigation} />}
            keyExtractor={(item) => `key_item_${item?.id}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 5 }}
            ItemSeparatorComponent={() => <SizedBox height={20} />}
            ListEmptyComponent={() => <EmptyData message={global.language['EmptyBookingHistory']}/>}
        />
    )
}

const styles = StyleSheet.create({

});
export default React.memo(ListHistory);