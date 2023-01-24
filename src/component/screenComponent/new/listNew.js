import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ItemCommonNew from './itemCommonNew';
import { SizedBox } from '@BaseComponent';
import { useSelector } from 'react-redux';

const ListNew = () => {
    const data = useSelector(state => state.new.listNew);
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ItemCommonNew item={item} />}
            keyExtractor={(item) => `item_list_new_${item?.id}`}
            ItemSeparatorComponent={() => <SizedBox height={15} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentFlatList}
        />
    )
}
const styles = StyleSheet.create({
    contentFlatList: {
        paddingTop: 10,
        paddingBottom: 20
    }
})
export default React.memo(ListNew);