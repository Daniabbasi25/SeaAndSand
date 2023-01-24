import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';

const PickSeat = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { [props?.element?.field]: data }
            }
        }),
    );
    const [data, setData] = useState({});
    const { colors } = useTheme();
    useEffect(() => {
        if (props?.element?.seat_types && !_.isEmpty(props?.element?.seat_types)) {
            let initData = {};
            _.forEach(props?.element?.seat_types, element => {
                initData[element?.id] = 0;
            });
            setData(initData);
        }
    }, []);

    const handlePlus = type => {
        if (data[type] < 100) {
            let newData = { ...data };
            newData[type] += 1;
            setData(newData);
        }
    }

    const handleMinus = type => {
        if (data[type] > 0) {
            let newData = { ...data };
            newData[type] -= 1;
            setData(newData);
        }
    }

    const itemPick = (element) => {
        return (
            <View key={`item_pick_${element?.id}`} style={styles.wrapItemPick}>
                <View style={styles.wrapName}>
                    <TextApp bold primary>{element?.name}</TextApp>
                </View>
                <View style={styles.wrapPlusMinus}>
                    <TouchableScale onPress={() => handlePlus(element?.id)}>
                        <View style={styles.wrapPlus}>
                            <MaterialCommunityIcons name={'plus'} size={22} color={colors.primary} />
                        </View>
                    </TouchableScale>
                    <View style={styles.wrapNumber}>
                        <TextApp primary bold title>{data[element?.id]}</TextApp>
                    </View>
                    <TouchableScale onPress={() => handleMinus(element?.id)}>
                        <View style={styles.wrapPlus}>
                            <MaterialCommunityIcons name={'minus'} size={22} color={colors.primary} />
                        </View>
                    </TouchableScale>
                </View>
            </View>
        )
    }
    if (_.isEmpty(props?.element?.seat_types)) return null;
    let listPick = [];
    _.forEach(props?.element?.seat_types, (element, index) => {
        listPick.push(itemPick(element));
    });
    return (
        <View style={styles.root}>
            <TextApp medium title style={styles.transformText}>{props?.element?.title}</TextApp>
            <View style={styles.wrapLocation}>
                {listPick}
            </View>
        </View>
    )
});

const styles = StyleSheet.create({
    root: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    wrapLocation: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        ...CommonStyle.dropShadow
    },
    wrapItemPick: {
        paddingVertical: 7,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    wrapName: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center'
    },
    wrapPlusMinus: {
        width: '50%',
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    wrapPlus: {
        padding: 5,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#4286F9'
    },
    wrapNumber: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left',
    }

});

export default React.memo(PickSeat);