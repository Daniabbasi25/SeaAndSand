import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp, ImageApp, SizedBox } from '@BaseComponent';
import { Device } from '@Helper';
const ItemLocation = ({ navigation, item }) => {
    return (
        <TouchableScale disabled>
            <View style={styles.wrapItemLocation}>
                <ImageApp source={{ uri: item?.image }} style={styles.image} />
                <View style={styles.overlay} />
                <View style={styles.text}>
                    <TextApp bold quaternary h6 style={styles.title}>{item?.title}</TextApp>
                    <SizedBox height={5} />
                    <SizedBox width={70} height={3} backgroundColor={'#FFFFFF'} />
                </View>
            </View >
        </TouchableScale>
    )
}

const styles = StyleSheet.create({
    wrapItemLocation: {
        width: 300,
        height: 220,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 10
    },
    overlay: {
        height: 220,
        width: 300,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 9,
        borderRadius: 10
    },
    image: {
        flex: 1,
        borderRadius: 10,
        transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }]
    },
    text: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        zIndex: 99,
    },
    title: {
        transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }]
    }
});

export default React.memo(ItemLocation);