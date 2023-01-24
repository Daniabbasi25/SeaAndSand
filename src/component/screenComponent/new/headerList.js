import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';

const HeaderList = ({ title, navigation }) => {
    return (
        <View style={styles.wrapHeaderList}>
            <TextApp
                bold
                h6
                primary
                style={styles.textHeaderList}>{title}</TextApp>
            <TouchableScale
                style={styles.touchableShowAll}
                onPress={() => navigation.navigate('ListNew')}
            >
                <TextApp bold caption>{global.language['ShowAll']}</TextApp>
            </TouchableScale>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapHeaderList: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    textHeaderList: {

    },
    touchableShowAll: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#EEEEEE',
        borderRadius: 5
    }
});
export default React.memo(HeaderList);