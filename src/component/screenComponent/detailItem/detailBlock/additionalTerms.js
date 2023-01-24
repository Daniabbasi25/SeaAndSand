import React from 'react';
import { View, StyleSheet } from 'react-native';
import TitleBlock from './titleBlock';
import RenderHTML from 'react-native-render-html';
import { Device } from '@Helper';
import { useTheme } from 'react-native-paper';

const AdditionalTerms = ({ data }) => {
    const { colors } = useTheme();
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
        <View style={styles.wrapContent}>
            <TitleBlock title={global.language['AdditionalTerms'].toUpperCase()} style={styles.titleBlock} />
            <RenderHTML
                contentWidth={Device.width}
                source={{ html: data }}
                tagsStyles={tagStyles}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    wrapContent: {
        paddingVertical: 10
    },
    titleBlock: {
        paddingTop: 5,
        paddingBottom: 5
    },
    itemTerm: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});

export default React.memo(AdditionalTerms);