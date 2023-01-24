// getItemWishList
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, ImageApp } from '@BaseComponent';
import { Identify } from '@Helper';
import { theme } from '@Theme';

const ItemWishList = ({ item, navigation }) => {
    
    const handleSelectItem = () => {
        navigation.navigate('DetailItem', { type: item?.object_model, id: item?.object_id })
    }

    return (
        <TouchableScale onPress={() => handleSelectItem()}>
            <View style={styles.wrapItem}>
                <View style={styles.leftContent}>
                    <ImageApp source={{ uri: item?.service?.image }} style={styles.image} />
                </View>
                <View style={styles.rightContent}>
                    <View style={styles.wrapLabel}>
                        <TextApp style={styles.label} quaternary bold>{Identify.upperCaseFirstCharacter(item?.object_model)}</TextApp>
                    </View>
                    <TextApp bold style={styles.title}>{item?.service?.title}</TextApp>
                    <TextApp caption>{item?.service?.location?.name}</TextApp>
                    <View style={styles.wrapPrice}>
                        {!Identify.isExistValue(item?.service?.sale_price) && <TextApp bold primary title>{item?.service?.price}</TextApp>}
                        {Identify.isExistValue(item?.service?.sale_price) && <TextApp style={styles.originPrice}>{item?.service?.price}</TextApp>}
                        {Identify.isExistValue(item?.service?.sale_price) && <TextApp bold primary title>{item?.service?.sale_price}</TextApp>}
                    </View>
                </View>
            </View>
        </TouchableScale>
    )
}


const styles = StyleSheet.create({
    leftContent: {
        width: '35%',
    },
    wrapItem: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1,
        paddingVertical: 20
    },
    rightContent: {
        width: '65%',
        alignItems: 'flex-start'
    },
    image: {
        width: 120,
        height: 120
    },
    wrapLabel: {
        alignItems: 'center',
    },
    label: {
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: theme.colors.light.primary
    },
    title: {
        paddingVertical: 5
    },
    wrapPrice: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginTop: 10
    },
    originPrice: {
        textDecorationLine: 'line-through',
        marginRight: 5
    }
});
export default React.memo(ItemWishList);