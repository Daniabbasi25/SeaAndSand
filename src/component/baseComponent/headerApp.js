import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TouchableScale from './touchableScale';
import { Identify } from '@Helper';
import { useNavigation } from '@react-navigation/native';

const HeaderApp = ({ actionBack, middleContent, rightContent, isPaddingTop = false }) => {
    const navigation = useNavigation();
    const { fontSizes, colors, fonts, spacingLayout } = useTheme();

    const handleBack = () => {
        if (actionBack) {
            return actionBack();
        }
        navigation.goBack();
    }
    return (
        <View style={[styles.root, {
            paddingHorizontal: spacingLayout.horizontal,
            paddingTop: isPaddingTop && Platform.OS != 'ios' ? 20 : 0,
            height: isPaddingTop && Platform.OS != 'ios' ? 70 : 50,
            flexDirection: global.isRtl ? 'row-reverse' : 'row'
        }]}>
            <View style={styles.leftContent}>
                <TouchableScale onPress={() => handleBack()}>
                    <MaterialIcons name={'keyboard-backspace'} color={colors.primary} size={30} />
                </TouchableScale>
            </View>
            <View style={styles.midContent}>
                <Text style={{ color: colors.primary, ...fonts.bold, fontSize: fontSizes.title }}>{middleContent ? middleContent : Identify.getAppName()}</Text>
            </View>
            <View style={styles.rightContent}>
                {rightContent ? rightContent : <></>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        height: 50,
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        width: '10%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    midContent: {
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightContent: {
        width: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    transformText: {
        transform: global.isRtl ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
        textAlign: global.isRtl ? 'right' : 'left'
    },

})
export default React.memo(HeaderApp);