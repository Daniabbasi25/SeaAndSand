import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, SizedBox } from '@BaseComponent';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PickTerms = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { [props?.element?.field]: data?.terms }
            }
        }),
    );
    const [data, setData] = useState({});

    useEffect(() => {
        if (props?.element?.data && !_.isEmpty(props?.element?.data)) {
            let initData = {};
            initData[props?.element?.field] = [];
            setData(initData);
        }
    }, []);

    const setTerm = (value) => {
        let newData = { ...data };
        if (newData[props?.element?.field].includes(value)) {
            newData[props?.element?.field] = _.without(newData[props?.element?.field], value);
            setData(newData);
        }
        else {
            newData[props?.element?.field].push(value);
            setData(newData);
        }
    }
    let listAttributes = [];
    if (props?.element?.data && _.isEmpty(props?.element?.data)) return null;
    _.forEach(props?.element?.data, (e, i) => {
        let listTerms = [];
        _.forEach(e?.terms, (ce, ci) => {
            listTerms.push(<View key={`item_term_${ci}`}><ItemTerm item={ce} setTerm={(value) => setTerm(value)} /></View>)
        })
        listAttributes.push(
            <View style={styles.root} key={`term_${i}`}>
                <TextApp medium title style={styles.transformText}>{e?.name}</TextApp>
                <View style={styles.wrapLocation}>
                    {listTerms}
                </View>
            </View>
        );
    })
    return listAttributes;
});

const ItemTerm = ({ item, setTerm }) => {
    const [checked, setCheck] = useState(false);
    const { colors } = useTheme();

    const handleCheck = () => {
        setCheck(!checked);
        setTerm(item?.id);
    }

    return (
        <View style={styles.wrapItemCheckStar}>
            <TouchableScale
                onPress={() => handleCheck()}
                scaleTo={0.7}>
                <MaterialIcons
                    name={checked ? 'check-box' : 'check-box-outline-blank'}
                    color={checked ? colors.primary : colors.disabled}
                    size={25}
                />
            </TouchableScale>
            <SizedBox width={5} />
            <TextApp>{item?.name}</TextApp>
        </View>
    )
}

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
    wrapItemCheckStar: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        paddingVertical: 3
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left',
    }
});
export default React.memo(PickTerms);