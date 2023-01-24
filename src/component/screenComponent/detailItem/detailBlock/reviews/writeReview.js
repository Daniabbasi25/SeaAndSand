import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { TextApp, IndicatorComponent } from '@BaseComponent';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { addReview } from '../../../../../redux/detailRedux';
import { Identify } from '@Helper';
import _ from 'lodash';
import Toast from 'react-native-toast-message';

const WriteReview = ({ review_stats, type, id }) => {
    const userInformation = useSelector(state => state.user.userInformation);
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(true);
    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => openModal()}
                disabled={!userInformation}
            >
                <View style={[styles.wrapReview, { backgroundColor: userInformation ? colors.primary : colors.disabled }]}>
                    {userInformation ? <TextApp medium quaternary>{global.language['WriteAReview']}</TextApp> :
                        <TextApp right={global.isRtl ? true : false} medium >{global.language['YouMustLoginToWriteReview']}</TextApp>}
                </View>
            </TouchableOpacity>
            <ModalReview visible={visible} closeModal={() => closeModal()} colors={colors} review_stats={review_stats} type={type} id={id} />
        </>
    );
}

const ModalReview = ({ closeModal, visible, colors, review_stats, type, id }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [height, setHeight] = React.useState(70);
    const [listRating, setListRating] = useState({});
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState({});

    useEffect(() => {
        return () => {
            setTitle('');
            setContent('');
            setHeight(70);
            setListRating({});
            setLoading(false);
            setWarning({})
        }
    }, [])

    useEffect(() => {
        let obj = {};
        review_stats.forEach(element => {
            obj[element] = 0
        })
        setListRating(obj);
    }, []);

    useEffect(() => {
        if (!visible) {
            setHeight(undefined);
        }
    }, [visible]);

    const setStar = (key, number) => {
        let newStar = { ...listRating };
        newStar[key] = number;
        setListRating(newStar);
    }

    const itemReview = (element, index) => {
        return (
            <View style={styles.wrapItemReview} key={`item_review_${index}`}>
                <View style={styles.leftReview}>
                    <TextApp medium title>{element}</TextApp>
                </View>
                <View style={styles.rightReview}>
                    <StarRating
                        rating={listRating[element]}
                        fullStarColor={'#FDCC0D'}
                        starSize={25}
                        maxStars={5}
                        selectedStar={star => setStar(element, star)}

                    />
                </View>
            </View>
        )
    }

    const listItemReview = () => {
        let list = [];
        review_stats.forEach((element, index) => {
            list.push(itemReview(element, index));
        });
        return (
            <View style={styles.wrapListItemReview}>
                {list}
            </View>
        )
    }

    const contentForm = () => {
        return (
            <ScrollView>
                <TextInput
                    label={global.language['Label']}
                    style={{
                        backgroundColor: '#FFFFFF',
                        textAlign: global.isRtl ? 'right' : 'left'
                    }}
                    underlineColor={colors.primary}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    multiline
                    label={global.language["WriteSomethingYouFeel"]}
                    onContentSizeChange={(event) => {
                        if (height <= 150) {
                            setHeight(height + event.nativeEvent.contentSize.height)
                        }
                    }}
                    underlineColor={colors.primary}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    style={{
                        height,
                        backgroundColor: '#FFFFFF',
                        textAlign: global.isRtl ? 'right' : 'left'
                    }}
                    onChangeText={text => setContent(text)}
                />
                {listItemReview()}
                {warning?.show && warning.message}
            </ScrollView>
        )
    }
    const handleReview = () => {
        let params = {
            "review_title": title,
            "review_content": content,
            "review_rate": "5",
            "review_stats": listRating,
            "token": Identify.getToken()
        }
        setLoading(true);
        addReview(type, id, params).then(res => {
            setLoading(false);
            if (!res?.status) {
                if (_.isArray(res?.message) || _.isObject(res?.message)) {
                    let arrWarning = [];
                    _.forEach(Object.values(res?.message), (text, index) => {
                        arrWarning.push(<View key={`warning_${index}`} style={{ marginVertical: 5 }}><TextApp regularItalic error style={styles.transformText}>{text}</TextApp></View>)
                    })
                    setWarning({ show: true, message: arrWarning })
                }
                else {
                    let arrWarning = <View key={`warning_message}`} style={{ marginVertical: 5 }}><TextApp regularItalic error style={styles.transformText}>{res?.message}</TextApp></View>;
                    setWarning({ show: true, message: arrWarning })
                }
            }
            else {
                closeModal();
                Toast.show({
                    type: 'success',
                    text1: global.language['Successfully'],
                    text1Style: { fontSize: 40 },
                    text2: global.language['ThankForYourReview'],
                    visibilityTime: 3000,

                });
            }
        })
    }

    return (
        <Modal
            isVisible={visible}
            backdropTransitionOutTiming={0}
            animationInTiming={1}
            style={{ margin: 0 }}
        >
            <Animatable.View
                animation={'fadeIn'}
                delay={200}
                style={styles.wrapContentModal}>
                <TouchableOpacity onPress={() => closeModal()}>
                    <MaterialIcons name={'close'} size={30} />
                </TouchableOpacity>
                {contentForm()}
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleReview()}>
                    <View style={[styles.submitReview, { backgroundColor: colors.primary }]}>
                        {loading ? <IndicatorComponent color={'#FFFFFF'} /> : <TextApp quaternary bold>{global.language['LeaveAReview']}</TextApp>}
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapReview: {
        alignItems: 'center',
        paddingVertical: 13,
        borderRadius: 10,
        marginVertical: 10
    },
    wrapContentModal: {
        backgroundColor: '#FFFFFF',
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 40
    },
    wrapListItemReview: {
        borderWidth: 1,
        padding: 10,
        marginTop: 25,
        borderRadius: 10,
        borderColor: '#C3C3C3'
    },
    wrapItemReview: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        paddingVertical: 5
    },
    leftReview: {
        width: '50%',
        alignItems: global.isRtl ? 'flex-end' : 'flex-start'
    },
    rightReview: {
        width: '50%',
        alignItems: !global.isRtl ? 'flex-end' : 'flex-start',
    },
    submitReview: {
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        height: 50
    },
    transformText: {
        textAlign: global.isRtl ? 'right' : 'left'
    }
});

export default React.memo(WriteReview);

/*
review_title: czczxc
review_content: zczxczxc zxczxcz cz zxc zxc zxc  zxcz xczcxzc zxcz c
review_stats[Service]: 5
review_stats[Organization]: 2
review_stats[Friendliness]: 4
review_stats[Area Expert]: 3
review_stats[Safety]: 3
review_service_id: 1
review_service_type: hotel

{
    review_title:'czczxc',
    review_content: 'sfdaf asdf asdf asf ',
    review_stats:{
        Service: 5,
        Organization: 5,
        Friendliness: 5,
        Area Expert: 5,
        Safety: 5,
    },
    review_service_id:1,
    review_service_type:'hotel'
}

*/
