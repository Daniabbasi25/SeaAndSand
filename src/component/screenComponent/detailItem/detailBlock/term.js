import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextApp, SizedBox } from '@BaseComponent';
import TitleBlock from './titleBlock';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Term = ({ data }) => {
    let arrComponent = [];
    const listTerm = (terms) => {
        let list = [];
        terms && terms.map(element => {
            list.push(<View key={element?.id} style={styles.itemTerm}>
                <MaterialCommunityIcons name={'check-circle-outline'} size={16} />
                <SizedBox width={5} />
                <TextApp>{element?.title}</TextApp>
            </View>)
        });
        return list
    }

    data && Object.values(data).map(element => {
        arrComponent.push(
            <View key={`term_${element?.parent?.id}`} style={styles.wrapContent}>
                <TitleBlock title={element?.parent?.title.toUpperCase()} style={styles.titleBlock}/>
                {listTerm(element?.child)}
            </View>

        )
    });
    return (
        <View>
            {arrComponent}
        </View>
    )
}
const styles = StyleSheet.create({
    wrapContent: {
        paddingVertical:10
    },
    titleBlock: {
        paddingTop:5,
        paddingBottom:5
    },
    itemTerm: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

export default React.memo(Term);