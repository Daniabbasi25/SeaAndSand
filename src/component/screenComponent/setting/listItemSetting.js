import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonStyle } from '@Style';
import SettingLanguage from './settingLanguage';
// import SettingCurrency from './settingCurrency';

const ListItemSetting = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <SettingLanguage />
            {/* <SettingCurrency /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        ...CommonStyle.dropShadow
    }
});
export default React.memo(ListItemSetting);