import React from 'react';
import { View, StyleSheet } from 'react-native';
import TitleBlock from './titleBlock';
import RenderHTML from 'react-native-render-html';
import { Device } from '@Helper';
import { useTheme } from 'react-native-paper';

const Description = ({ data }) => {
    const { colors } = useTheme();

    const source = {
        html: data
    }
    const tagStyles = {
        p: {
            fontFamily: 'Montserrat',
            fontWeight: '400',
            lineHeight: 25,
            marginTop: 10,
            textAlign: global.isRtl ? 'right' : 'left'
        },
        h4: {
            fontFamily: 'Montserrat',
            fontWeight: '600',
            marginTop: 10,
            marginBottom: 5,
            fontSize: 16,
            color: colors.primary,
            textAlign: global.isRtl ? 'right' : 'left'
        },
        li: {
            fontFamily: 'Montserrat',
            fontWeight: '400',
            lineHeight: 25,
            textAlign: global.isRtl ? 'right' : 'left'
        },
        ul: {
            marginTop: 5
        }
    }
    return (
        <View style={styles.container}>
            <TitleBlock title={global.language['Description'].toUpperCase()} />
            <RenderHTML
                contentWidth={Device.width}
                source={source}
                tagsStyles={tagStyles}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10
    },

});

export default React.memo(Description);