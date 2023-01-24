import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import RenderHTML from 'react-native-render-html';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableScale, TextApp, ImageApp } from '@BaseComponent';
import { useTheme } from 'react-native-paper';
import { Device } from '@Helper';
import Share from 'react-native-share';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Animatable from 'react-native-animatable';

const DetailNews = ({ item = null, visible = false, closeModal }) => {
    const { colors } = useTheme();
    const topContent = () => {
        return (
            <Animatable.View
                animation={'fadeIn'}
                duration={500}
            >
                <ImageBackground
                    source={{ uri: item?.image_url }}
                    style={styles.imageBackground}
                >
                    <View style={styles.overlay} />
                    <TouchableScale onPress={() => closeModal()} style={styles.touchableBack}>
                        <MaterialIcons name={'keyboard-backspace'} color={colors.quaternary} size={30} style={styles.iconBack} />
                    </TouchableScale>
                    <View style={styles.titleContent}>
                        <TextApp medium quaternary style={styles.title}>{item?.created_at}</TextApp>
                        <TextApp bold quaternary h6 style={styles.title}>{item?.title}</TextApp>
                        <View style={styles.wrapAuthor}>
                            <ImageApp source={{ uri: item?.author?.avatar_url }} style={styles.imageAuthor} />
                            <TextApp bold quaternary style={styles.textAuthor}>{item?.author?.display_name}</TextApp>
                        </View>
                    </View>
                </ImageBackground>
            </Animatable.View>
        )
    }

    const handleTypeShare = (name) => {
        switch (name) {
            case 'sc-facebook':
                return Share.Social.FACEBOOK;
            case 'sc-twitter':
                return Share.Social.TWITTER;

        }
    }
    const actionSingleShare = async (name) => {
        const shareOptions = {
            title: item?.title,
            failOnCancel: false,
            url: item?.url,
            social: handleTypeShare(name)
        };
        await Share.open(shareOptions)
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    const actionShare = async () => {
        const shareOptions = {
            title: item?.title,
            failOnCancel: false,
            url: item?.url,
        };
        await Share.open(shareOptions)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }

    const itemShare = (name) => {
        return (
            <TouchableScale
                style={styles.touchableShare}
                onPress={() => name === 'share-google' ? actionSingleShare(name) : actionShare()}
            >
                <EvilIcons size={22} name={name} color={'black'} />
            </TouchableScale >
        )
    }

    const headerMainContent = () => {
        return (
            <View style={styles.wrapHeaderMainContent}>
                <View style={styles.wrapShareMainContent}>
                    {itemShare('sc-facebook')}
                    {itemShare('sc-twitter')}
                    {itemShare('share-google')}
                </View>
                <View style={styles.wrapCategoryMainContent}>
                    <TextApp bold caption>{item?.category?.name}</TextApp>
                </View>
            </View>
        )
    }

    const contentHTML = () => {
        const source = {
            html: item?.content
        };

        const tagStyles = {
            p: {
                lineHeight: 20
            }
        };

        return (
            <View style={styles.wrapContentHTML}>
                <RenderHTML
                    contentWidth={Device.width}
                    source={source}
                    tagsStyles={tagStyles}
                />
            </View>
        )
    }

    const mainContent = () => {
        return (
            <Animatable.View
                style={styles.wrapMainContent}
                duration={500}
                animation="slideInUp"
            >
                {headerMainContent()}
                {contentHTML()}
            </Animatable.View>
        )
    }

    return (
        <Modal
            visible={visible}
            style={styles.wrapModal}
            useNativeDriver={true}
        >
            <ScrollView style={styles.wrapContent} showsVerticalScrollIndicator={false}>
                {topContent()}
                {mainContent()}
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapModal: {
        margin: 0,
        backgroundColor: '#FFFFFF',
    },
    wrapContent: {
        flex: 1
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        width: Device.width,
        height: Device.height * .5,
    },
    imageBackground: {
        width: Device.width,
        height: Device.height * .5,
    },
    touchableBack: {
        paddingTop: 30,
        paddingLeft: global.isRtl ? undefined : 10,
        paddingRight: global.isRtl ? 10 : undefined,
        alignItems: global.isRtl ? 'flex-end' : 'flex-start',
    },
    iconBack: {
        zIndex: 99999999999999
    },
    titleContent: {
        position: 'absolute',
        bottom: 30,
        left: global.isRtl ? undefined : 10,
        right: global.isRtl ? 10 : undefined,
    },
    wrapAuthor: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    imageAuthor: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    textAuthor: {
        paddingLeft: 10
    },
    wrapMainContent: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: -20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    wrapHeaderMainContent: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 5,

    },
    wrapShareMainContent: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center'

    },
    wrapCategoryMainContent: {
        backgroundColor: '#DEDEDE',
        paddingVertical: 7,
        paddingHorizontal: 7,
        borderRadius: 5
    },
    touchableShare: {
        marginHorizontal: 5,
        width: 30,
        height: 30,
        backgroundColor: '#DEDEDE',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapContentHTML: {
        marginTop: 20,
    },
    title: {
        textAlign: global.isRtl ? 'right' : 'left'
    }

});

export default React.memo(DetailNews);