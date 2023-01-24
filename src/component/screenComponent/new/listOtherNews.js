import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderList from './headerList';
import ItemCommonNew from './itemCommonNew';

const ListOtherNews = ({ navigation, data }) => {
    return (
        <View style={styles.root}>
            <HeaderList title={global.language['OtherNews']} navigation={navigation} />
            <View style={styles.contentList}>
                {
                    data && data.map((item) => (
                        <View style={styles.contentItemList} key={`item_new_${item?.id}`}>
                            <ItemCommonNew item={item} />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        marginTop: 20
    },
    contentList: {
        paddingBottom: 50
    },
    contentItemList: {
        paddingBottom: 15
    }
});

export default React.memo(ListOtherNews);