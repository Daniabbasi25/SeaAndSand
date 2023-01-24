import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Indicator, SizedBox, TextApp } from '@BaseComponent';
import _ from 'lodash';
import { searchAll } from '../../../redux/searchAllRedux';
import ItemSearch from './itemSearch';

const ListSearch = ({ navigation, keyword }) => {
    const [result, setResult] = useState(null);
    const [total, setTotal] = useState(0);
    const params = {
        'service_name': keyword,
        'limit': 1000
    };
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = () => {
        searchAll({ params }).then(res => {
            if (res.status) {
                setResult(res.data);
                setTotal(res.total)
            }
        })
    }
    if (result == null) {
        return <Indicator />
    }
    const titleResult = () => {
        return (
            <View style={styles.wrapTitleResult}>
                <TextApp>{`${total} ${total > 0 ? global.language['ResultsForKeyword'] : global.language['ResultForKeyword']} "${keyword}"`}</TextApp>
            </View>
        )
    }
    return (
        <FlatList
            data={result}
            renderItem={({ item }) => <ItemSearch navigation={navigation} item={item} />}
            keyExtractor={(item, index) => `item_search_${item?.id}_${index}`}
            ItemSeparatorComponent={() => <SizedBox height={10} />}
            contentContainerStyle={styles.contentFlatList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => titleResult()}
        />
    )
}

const styles = StyleSheet.create({
    contentFlatList: {
        paddingHorizontal: 3,
        paddingTop: 5,
        paddingBottom: 20
    },
    wrapTitleResult: {
        width: '100%',
        paddingBottom: 10
    }
});
export default React.memo(ListSearch);