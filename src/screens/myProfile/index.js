import React, { useRef, useState } from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { ListItemMyProfile } from '@MyProfileScreenComponent';
import { HeaderApp, TextApp, TouchableScale, IndicatorComponent } from '@BaseComponent';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { View, StyleSheet } from 'react-native';
import { updateInformation, reNewUserInformation } from '../../redux/userRedux';
import _ from 'lodash';
import { Identify } from '@Helper';

const MyProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userInformation = useSelector(state => state.user.userInformation);
    const formMyProfileRef = useRef(null);
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);


    const updateInfor = () => {
        let dataPost = formMyProfileRef?.current?.getData()?.dataForm;
        let isError = false;
        _.forEach(Object.values(dataPost), e => {
            if (!e) {
                isError = true;
            }
        })
        if (isError) {
            Toast.show({
                type: 'info',
                text1: global.language['Attention'],
                text1Style: { fontSize: 40 },
                text2: global.language['PleaseFillAllFields'],
                visibilityTime: 3000,
            });
        }
        else {
            setLoading(true);
            updateInformation(dataPost).then(res => {
                setLoading(false);
                if (res.status) {
                    dispatch(reNewUserInformation()).then(res => {
                        if (res) {
                            navigation.goBack();
                            Toast.show({
                                type: 'success',
                                text1: `${global.language['Successfully']}!`,
                                text1Style: { fontSize: 40 },
                                text2: res?.message,
                                visibilityTime: 3000,
                            });
                        }
                    })
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: `${global.language['Oops']}!`,
                        text1Style: { fontSize: 40 },
                        text2: Identify.handleErrorMessage(res?.message),
                        visibilityTime: 3000,
                    });
                }
            })
        }
    }

    return (
        <BaseScreen
            scroll
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={global.language['MyProfile']} />}
            usePadding
        >
            <ListItemMyProfile ref={formMyProfileRef} userInformation={userInformation} />
            <TouchableScale onPress={() => updateInfor()}>
                <View style={[styles.touchable, { backgroundColor: colors.primary }]}>
                    {loading ? <IndicatorComponent color={'#FFFFFF'} /> : <TextApp bold quaternary>{global.language['UpdateInformation'].toUpperCase()}</TextApp>}
                </View>
            </TouchableScale>
        </BaseScreen>
    );
};
const styles = StyleSheet.create({
    touchable: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20
    }
});
export default React.memo(MyProfileScreen);
