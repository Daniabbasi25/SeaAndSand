import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TextApp from './textApp';
import { Device } from '@Helper';
import { emptyData } from '@Images';
import TouchableScale from './touchableScale';
import SizedBox from './sizedBox';
import { useTheme } from 'react-native-paper';

const EmptyData = ({ message = 'No Data', action = null }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Image
                source={emptyData}
                style={styles.image}
                resizeMode={'contain'}
            />
            <TextApp medium>{message}</TextApp>
            <SizedBox height={15} />
            {action && <TouchableScale onPress={() => action()}>
                <View style={[styles.cancelButton, { backgroundColor: colors.primary }]}>
                    <TextApp quaternary bold button>{global.language['Cancel']}</TextApp>
                </View>
            </TouchableScale>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: Device.width * .5,
        height: Device.width * .5,
        alignItems: 'center'
    },
    cancelButton: {
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 10
    }
});
export default React.memo(EmptyData);