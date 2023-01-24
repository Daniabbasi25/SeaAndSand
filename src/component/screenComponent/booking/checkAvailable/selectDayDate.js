import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, SizedBox } from '@BaseComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonStyle } from '@Style';
import { Identify } from '@Helper';

const SelectDayDate = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { boatTime: data }
            }
        }),
    );
    const [data, setData] = useState({
        days: 0,
        hours: 0
    });

    const handlePlus = type => {
        let newData = { ...data };
        if (type == 'hours') {
            if (data[type] < 23) {
                if (data['days'] != 0) {
                    newData['days'] = 0;
                }
                newData[type] += 1;
                setData(newData);
            }
        }
        else {
            if (data['hours'] != 0) {
                newData['hours'] = 0;
            }
            newData[type] += 1;
            setData(newData);
        }
    }

    const handleMinus = type => {
        if (data[type] > 0) {
            let newData = { ...data };
            if (type == 'hours') {
                if (data['days'] != 0) {
                    newData['days'] = 0;
                }
                newData[type] -= 1;
                setData(newData);
            }
            else {
                if (data['hours'] != 0) {
                    newData['hours'] = 0;
                }
                newData[type] -= 1;
                setData(newData);
            }
        }
    }

    const itemPick = (title) => {
        return (
            <View>
                <View key={`item_pick_${title}`} style={styles.wrapItemPick}>
                    <View style={styles.wrapName}>
                        <TextApp bold title primary>{global.language[Identify.upperCaseFirstCharacter(title)]}</TextApp>
                    </View>
                    <View style={styles.wrapPlusMinus}>
                        <TouchableScale onPress={() => handlePlus(title)}>
                            <View style={styles.wrapPlus}>
                                <MaterialCommunityIcons name={'plus'} size={20} color={'#4286F9'} />
                            </View>
                        </TouchableScale>
                        <View style={styles.wrapNumber}>
                            <TextApp primary bold title>{data[title]}</TextApp>
                        </View>
                        <TouchableScale onPress={() => handleMinus(title)}>
                            <View style={styles.wrapPlus}>
                                <MaterialCommunityIcons name={'minus'} size={20} color={'#4286F9'} />
                            </View>
                        </TouchableScale>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.root}>
            <View style={styles.wrapLocation}>
                <TextApp medium title style={styles.transformText}>{global.language['ReturnOnTheSameDay']}</TextApp>
                {itemPick('hours')}
                {/* <SizedBox height={5} /> */}
                <TextApp medium title style={styles.transformText}>{global.language['ReturnOnAnotherDay']}</TextApp>
                {itemPick('days')}
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
        paddingVertical: 10,
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
        paddingRight: 10,
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

export default React.memo(SelectDayDate);