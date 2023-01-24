import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextApp, TouchableScale } from '@BaseComponent';
import { CommonStyle } from '@Style';
import Dash from 'react-native-dash';

const ItemHistory = ({ item, navigation }) => {

    const rowItem = (label, value) => {
        if (label == global.language['OrderDate']) {
            value = value && value.replace(/T/, ' ').replace(/\..+/, '');
            return (
                <View style={styles.wrapRowItem}>
                    <TextApp bold>{label}</TextApp>
                    <TextApp>{value}</TextApp>
                </View>
            )
        }
        return (
            <View style={styles.wrapRowItem}>
                <TextApp bold>{label}</TextApp>
                {label == global.language['Status'] || label == global.language['Remain'] ? <TextApp bold primary>{value}</TextApp> : <TextApp>{value}</TextApp>}
            </View>
        )
    }
    const handleDuration = () => {
        if (item?.start_date && item?.end_date) {
            let date1 = new Date(item?.start_date);
            let date2 = new Date(item?.end_date);
            return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
        }
        return 0;
    }
    return (
        <TouchableScale>
            <View style={styles.wrapItem}>
                <TextApp bold title>{item?.service?.title}</TextApp>
                <Dash
                    style={styles.dash}
                    dashColor={'#DEDEDE'}
                    dashGap={5}
                    dashLength={10}
                    dashThickness={1}
                />
                <View style={styles.wrapInfor}>
                    {rowItem(global.language['OrderDate'], item?.created_at)}
                    {rowItem(global.language['StartDate'], item?.start_date)}
                    {rowItem(global.language['EndDate'], item?.end_date)}
                    {rowItem(global.language['Duration'], handleDuration())}
                    {rowItem(global.language['Status'], item?.status)}
                    <Dash
                        style={styles.dash}
                        dashColor={'#DEDEDE'}
                        dashGap={5}
                        dashLength={10}
                        dashThickness={1}
                    />
                    <View style={styles.wrapInfor}>
                        {rowItem(global.language['Total'], `$${item?.total}`)}
                        {rowItem(global.language['Paid'], `$${item?.paid ? item?.paid : 0}`)}
                        {rowItem(global.language['Remain'], `$${item?.pay_now ? item?.pay_now : 0}`)}
                    </View>
                </View>
            </View>
        </TouchableScale>
    )
}

const styles = StyleSheet.create({
    wrapItem: {
        padding: 10,
        borderRadius: 10,
        ...CommonStyle.dropShadow
    },
    wrapRowItem: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    wrapInfor: {
        paddingVertical: 10
    },
    dash: {
        paddingTop: 20,
    }
});
export default React.memo(ItemHistory);