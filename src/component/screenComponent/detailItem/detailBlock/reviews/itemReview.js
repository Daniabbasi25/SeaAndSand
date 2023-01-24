import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextApp, ImageApp, SizedBox } from '@BaseComponent';
import StarRating from 'react-native-star-rating';
import { Icons } from '@Assets';
const ItemReview = ({ item }) => {
    return (
        <View style={styles.wrapItemTestimonial}>
            <Image source={Icons.quoteMark} resizeMode={'contain'} style={{ width: 30, height: 30 }} />
            <TextApp body bold numberOfLines={2}>{item?.title}</TextApp>
            <TextApp button style={styles.contentQuote} numberOfLines={8}>{item?.content}</TextApp>
            <View style={styles.infor}>
                <ImageApp source={{ uri: item?.author?.avatar_id }} style={styles.avatar} />
                <SizedBox width={10} />
                <View>
                    <TextApp>{item?.author?.name}</TextApp>
                    <View style={{ width: '50%' }}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={Number(item?.rate_number)}
                            fullStarColor={'#FDCC0D'}
                            starSize={18}
                        />
                    </View>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    wrapItemTestimonial: {
        padding: 10,
        marginTop: 10,
        width: 270,
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
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    contentQuote: {
        paddingVertical: 10
    }
});

export default React.memo(ItemReview);