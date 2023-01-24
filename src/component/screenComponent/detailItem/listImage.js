import React, { useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Pressable, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import { Device } from '@Helper';
import { TouchableScale, SizedBox } from '@BaseComponent';
import { useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import { handleAddToWishlist } from '../../../redux/detailRedux';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { APP_NAME, BASE_DOMAIN } from 'react-native-dotenv';

const ListImage = ({ gallery, navigation, title, id, object_model }) => {
    const { colors } = useTheme();
    const [showImage, setShowImage] = useState(false);
    const [addedWishlist, setWishlist] = useState(false);
    const userInformation = useSelector(state => state?.user?.userInformation);

    const handleBack = () => {
        navigation.goBack();
    }

    const showGallery = () => {
        setShowImage(true);
    }

    const closeGallery = () => {
        setShowImage(false);
    }

    const handleAddWishlist = () => {
        if (userInformation) {
            let params = {
                object_id: id,
                object_model: object_model
            };
            handleAddToWishlist(params).then(res => {
                if (res.status && res?.class == "active") {
                    setWishlist(true);
                    Toast.show({
                        type: 'success',
                        text1: global.language['Successfully'],
                        text1Style: { fontSize: 40 },
                        text2: global.language['AddToWishList'],
                        visibilityTime: 3000,
                    });
                }
                else {
                    setWishlist(false);
                }
            });
        }
        else {
            Toast.show({
                type: 'info',
                text1: global.language['Attention'],
                text1Style: { fontSize: 40 },
                text2: global.language['RequireLogin'],
                visibilityTime: 3000,
            });
        }
    }

    const handleShare = async () => {
        const shareOptions = {
            title: title,
            failOnCancel: false,
            url: BASE_DOMAIN,
            message: APP_NAME,
        };
        await Share.open(shareOptions)
            .then((res) => {
                console.log('Share Successful!');
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    const modal = () => {
        let images = [];
        _.forEach(gallery, element => {
            images.push({
                url: element,

                width: Device.width,
                props: {
                    resizeMode: 'contain'
                }
            });
        })
        return (
            <Modal
                visible={showImage}
                style={styles.modalViewImage}
                backdropColor={'transparent'}
                animationOut={'fadeOut'}
            >
                <ImageViewer
                    imageUrls={images}
                    onSwipeDown={() => closeGallery()}
                    backgroundColor={"rgba(0,0,0,0.9)"}
                    menus={({ cancel }) => <MaterialIcons name={'close'} size={30} color={colors.quaternary} />}
                    enableSwipeDown={true}
                />
                <View style={styles.closeButton}>
                    <TouchableScale onPress={() => closeGallery()}>
                        <MaterialIcons name={'close'} size={30} color={colors.quaternary} />
                    </TouchableScale>
                </View>
            </Modal>
        )
    }

    return (
        <Animatable.View style={styles.container} animation={'fadeIn'} duration={100}>
            {gallery && !_.isEmpty(gallery) && <Swiper
                autoplayTimeout={3}
                autoplay={true}
                showsPagination={false}
            >
                {gallery.map((element, index) => {
                    return (
                        <View style={styles.img} key={`${index}`}>
                            <Pressable style={styles.img} onPress={() => showGallery()}>
                                <Image source={{ uri: element }} style={styles.img} />
                            </Pressable>
                        </View>
                    )
                })}
            </Swiper>}
            <View style={styles.backButton}>
                <TouchableScale onPress={() => handleBack()} style={styles.itemAction}>
                    <MaterialIcons name={'keyboard-backspace'} color={colors.quaternary} size={22} />
                </TouchableScale>
                <View style={styles.flexActionSocial}>
                    <TouchableScale onPress={() => handleShare()} style={styles.itemAction}>
                        <AntDesign name={'sharealt'} color={colors.quaternary} size={22} />
                    </TouchableScale>
                    <SizedBox width={15} />
                    <TouchableScale onPress={() => handleAddWishlist()} style={styles.itemAction}>
                        <AntDesign name={addedWishlist ? 'heart' : 'hearto'} color={colors.quaternary} size={22} />
                    </TouchableScale>
                </View>
            </View>
            {modal()}
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Device.height * .45,
    },
    img: {
        flex: 1
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? Device.isIphoneX() ? 40 : 30 : StatusBar.currentHeight + 5,
        zIndex: 999,
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalViewImage: {
        margin: 0,
    },
    closeButton: {
        position: 'absolute',
        top: 35,
        left: 10,
        right: 0,
        bottom: 0,
        width: 50,
        height: 50
    },
    flexActionSocial: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center'
    },
    itemAction: {
        padding: 7,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 100,

    }
});

export default React.memo(ListImage);