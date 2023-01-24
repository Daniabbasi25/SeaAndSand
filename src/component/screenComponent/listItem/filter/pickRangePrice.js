import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import { useTheme } from 'react-native-paper';
import { CommonStyle } from '@Style';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Device } from '@Helper';

const PickRangePrice = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            getData() {
                return { [props?.element?.field]: `${valueSlide[0]};${valueSlide[1]}` }
            }
        }),
    );
    const [valueSlide, setValueSlide] = useState([props?.element?.min_price, props?.element?.max_price]);
    const { colors } = useTheme();
    const handleChangeValue = value => {
        setValueSlide(value);
    }

    return (
        <View style={styles.root}>
            <TextApp medium title style={styles.transformText}>{props?.element?.title}</TextApp>
            <View style={styles.wrapLocation}>
                {global.isRtl ?
                    <TextApp primary medium>{`${valueSlide[1]}$ ${global.language['To']} ${valueSlide[0]}$ ${global.language['From']}`}</TextApp>
                    : <TextApp primary medium>{`${global.language['From']}: ${valueSlide[0]}$ ${global.language['To']} ${valueSlide[1]}$`}</TextApp>}
                <MultiSlider
                    values={[valueSlide[0], valueSlide[1]]}
                    sliderLength={Device.width * .8}
                    onValuesChange={handleChangeValue}
                    min={props?.element?.min_price}
                    max={props?.element?.max_price}
                    step={1}
                    containerStyle={{
                        height: 40,
                    }}
                    trackStyle={{
                        height: 5,
                    }}
                    selectedStyle={{
                        backgroundColor: colors.primary,
                    }}
                    unselectedStyle={{
                        backgroundColor: '#DEDEDE',
                    }}
                />
                <View style={styles.wrapRangePriceDefault}>
                    {!global.isRtl && <TextApp>{props?.element?.min_price}</TextApp>}
                    {!global.isRtl && <TextApp>{props?.element?.max_price}</TextApp>}
                    {global.isRtl && <TextApp>{props?.element?.max_price}</TextApp>}
                    {global.isRtl && <TextApp>{props?.element?.min_price}</TextApp>}
                </View>
            </View>
        </View>
    );
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
        alignItems: 'center',
        ...CommonStyle.dropShadow
    },
    wrapRangePriceDefault: {
        width: Device.width * .85,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left',
    }
});
export default React.memo(PickRangePrice);