import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextApp, SizedBox } from '@BaseComponent';
import TitleBlock from './titleBlock';
import Collapsible from 'react-native-collapsible';

const Policy = ({ data }) => {
    const listPolicy = () => {
        let list = [];
        data && data.map((element, index) => list.push(<View key={`item_${index}`}>
            <ItemPolicy title={element?.title} content={element?.content} />
        </View>));
        return list;
    }

    return (
        <View style={styles.container}>
            <TitleBlock title={global.language['Rules'].toUpperCase()} />
            <SizedBox height={12} />
            {listPolicy()}
        </View>
    )
}
const ItemPolicy = ({ title, content }) => {
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
        backgroundColor: '#DEDEDE',
    },
    contentCollapse: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#EEEEEE'
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left'
    }
});

export default React.memo(Policy);