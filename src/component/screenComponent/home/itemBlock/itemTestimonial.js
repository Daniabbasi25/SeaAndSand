import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableScale, TextApp, ImageApp, SizedBox } from '@BaseComponent';
import StarRating from 'react-native-star-rating';
import { Icons } from '@Assets';

const ItemTestimonial = ({ item }) => {
    return (
        <TouchableScale>
            <View style={styles.wrapItemTestimonial}>
                <Image source={Icons.quoteMark} resizeMode={'contain'} style={{ width: 30, height: 30, transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }], }} />
                <TextApp style={styles.contentQuote} numberOfLines={4} style={styles.transformText}>{item?.desc}</TextApp>
                <View style={styles.infor}>
                    <ImageApp source={{ uri: item?.avatar_url }} style={styles.avatar} />
                    <SizedBox width={10} />
                    <View>
                        <TextApp style={styles.transformText}>{item?.name}</TextApp>
                        <View style={{ width: '50%' }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={Number(item?.number_star)}
                                fullStarColor={'#FDCC0D'}
                                starSize={18}
                            />
                        </View>
                    </View>
                </View>
            </View >
        </TouchableScale>
    )
}

const styles = StyleSheet.create({
    wrapItemTestimonial: {
        padding: 10,
        marginTop: 10,
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 15
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    infor: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    contentQuote: {
        paddingVertical: 10
    },
    transformText: {
        transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
        textAlign: global.isRtl ? 'right' : 'left'
    },

});

export default React.memo(ItemTestimonial);