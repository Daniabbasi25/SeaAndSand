import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, SizedBox } from '@BaseComponent';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';
import StarRating from 'react-native-star-rating';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

const PickScore = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { [props?.element?.field]: data }
            }
        }),
    );

    const [data, setData] = useState([]);
    
    const handleSetStar = (value) => {
        let newData = [...data];
        if (!newData.includes(value)) {
            newData.push(value);
            setData(newData);
        }
        else {
            newData = _.without(newData, value);
            setData(newData);
        }
    }

    return (
        <View style={styles.root}>
            <TextApp medium title style={styles.transformText}>{props?.element?.title}</TextApp>
            <View style={styles.wrapLocation}>
                <ItemCheckStar index={5} setStar={(value) => handleSetStar(value)} />
                <ItemCheckStar index={4} setStar={(value) => handleSetStar(value)} />
                <ItemCheckStar index={3} setStar={(value) => handleSetStar(value)} />
                <ItemCheckStar index={2} setStar={(value) => handleSetStar(value)} />
                <ItemCheckStar index={1} setStar={(value) => handleSetStar(value)} />
            </View>
        </View>
    );
});

const ItemCheckStar = ({ index, setStar }) => {
    const [checked, setCheck] = useState(false);
    const { colors } = useTheme();

    const handleCheck = () => {
        setCheck(!checked);
        setStar(index);
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
            <StarRating
                rating={index}
                maxStars={index}
                fullStarColor={'#FDCC0D'}
                starSize={24}
                disabled={true}
                starStyle={{ width: 30 }}
            />
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
export default React.memo(PickScore);