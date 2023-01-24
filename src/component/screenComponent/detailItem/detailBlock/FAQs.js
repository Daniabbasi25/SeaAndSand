import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextApp, SizedBox } from '@BaseComponent';
import TitleBlock from './titleBlock';
import Collapsible from 'react-native-collapsible';
import _ from 'lodash';

const FAQs = ({ data }) => {
    const listFAQs = () => {
        let list = [];
        let nData = data;
        if (_.isObject(nData)) {
            nData && Object.values(nData).map((element, index) => list.push(<View key={`item_${index}`}>
                <ItemFAQs title={element?.title} content={element?.content} />
            </View>));
        }
        else {
            data && _.isArray(data) && data.map((element, index) => list.push(<View key={`item_${index}`}>
                <ItemFAQs title={element?.title} content={element?.content} />
            </View>));
        }
        return list;
    }

    return (
        <View style={styles.container}>
            <TitleBlock title={global.language['FAQs'].toUpperCase()} />
            <SizedBox height={12} />
            {listFAQs()}
        </View>
    )
}
const ItemFAQs = ({ title, content }) => {
    const [collapsed, setCollapse] = useState(true);

    const toogleCollapse = () => {
        setCollapse(!collapsed);
    }
    return (
        <View style={styles.wrapItemCollapse}>
            <TouchableOpacity onPress={() => toogleCollapse()} activeOpacity={0.5}>
                <View style={styles.titleItemCollapse}>
                    <TextApp medium style={styles.transformText}>{title}</TextApp>
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
                <View style={styles.contentCollapse}>
                    <TextApp style={styles.transformText}>{content}</TextApp>
                </View>
            </Collapsible>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    wrapItemCollapse: {
        paddingVertical: 5
    },
    titleItemCollapse: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ECECEC',
        borderRadius: 3
    },
    contentCollapse: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#F5F5F5',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left',
        justifyContent: 'center'
    }
});

export default React.memo(FAQs);