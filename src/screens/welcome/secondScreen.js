import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SizedBox, TextApp } from '@BaseComponent';
import {
    backgroundSecondScreen,
    code,
    laravel,
    media,
    rbac,
    vendor,
    imageCompress
} from '@Images';
import { Device } from '@Helper';
import { CommonStyle } from '@Style';

const SecondScreen = ({ }) => {
    const itemOneRow = (image, label, description) => {
        return (
            <View style={styles.wrapItemOneRow}>
                <View style={styles.wrapLeftItemOneRow}>
                    <Image source={image}
                        style={styles.imageItemOneRow}
                    />
                </View>
                <View style={styles.wrapRightItemOneRow}>
                    <TextApp bold>{label}</TextApp>
                    <TextApp button textSecondary>{description}</TextApp>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Image
                source={backgroundSecondScreen}
                style={styles.background}
                resizeMode={'contain'}
            />
            <TextApp bold h5>{'Exclusive Features'}</TextApp>
            <SizedBox height={30} />
            <View style={styles.wrapOneRow}>
                {itemOneRow(laravel, 'Laravel 8', 'Based of newest version of Laravel. The best popular PHP framework')}
                {itemOneRow(rbac, 'Role Based Access Control', 'Allow you add/modify roles to create many type of user')}
            </View>
            <View style={styles.wrapOneRow}>
                {itemOneRow(imageCompress, 'Image Optimization', 'Built-in library that auto compress your photo when uploading')}
                {itemOneRow(media, 'Media Management', 'Manager all your uploaded file')}
            </View>
            <View style={styles.wrapOneRow}>
                {itemOneRow(code, 'Menu & Page Builder', 'Easy customize with cleaning code and well documented')}
                {itemOneRow(vendor, 'Vendor System', 'Allow you to build a booking marketplace system')}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: Device.width,
        height: Device.height,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 100
    },
    image: {
        width: Device.width * .7,
        height: Device.width * .7,
    },
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: Device.width,
        height: Device.height,
    },
    wrapOneRow: {
        width: Device.width,
        alignItems: 'center'
    },
    wrapItemOneRow: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        ...CommonStyle.dropShadow,
        width: Device.width * .9,
        marginVertical: 5,
        borderRadius: 10
    },
    imageItemOneRow: {
        width: Device.width * .15,
        height: Device.width * .15,
    },
    wrapLeftItemOneRow: {
        width: Device.width * .2,
        padding: 5
    },
    wrapRightItemOneRow: {
        width: Device.width * .9 * .7,
    }
});

export default React.memo(SecondScreen);