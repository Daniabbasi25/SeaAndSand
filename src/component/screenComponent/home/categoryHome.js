import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableScale, TextApp } from '@BaseComponent';
import { Device } from '@Helper';
import { spacingLayout } from '../../../config/theme/spacing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const CategoryHome = ({ navigation }) => {
    const appConfig = useSelector(state => state.app.appConfig);
    const handleBookingType = () => {
        let arrType = [];
        _.forEach(Object.keys(appConfig?.booking_types), ((element, index) => {
            arrType.push(<View key={`item_category_home_${index}`}><ItemCategoryHome type={element} navigation={navigation} appConfig={appConfig}/></View>);
        }))
        return arrType;
    }
    const listBookingType = handleBookingType();
    return (
        <View style={styles.wrapCategoryHome}>
            {listBookingType}
        </View >
    )
}

const ItemCategoryHome = ({ type, navigation, appConfig }) => {
    const handleIcon = () => {
        switch (type) {
            case 'car':
                return <Ionicons name={'md-car-sport'} color={'#FFFFFF'} size={28} />
            case 'event':
                return <Ionicons name={'calendar'} color={'#FFFFFF'} size={28} />
            case 'flight':
                return <Ionicons name={'airplane'} color={'#FFFFFF'} size={28} />
            case 'hotel':
                return <Ionicons name={'ios-bed'} color={'#FFFFFF'} size={28} />
            case 'space':
                return <Ionicons name={'layers'} color={'#FFFFFF'} size={28} />
            case 'tour':
                return <Ionicons name={'ios-map-sharp'} color={'#FFFFFF'} size={28} />
            case 'boat':
                return <Ionicons name={'boat'} color={'#FFFFFF'} size={28} />
            default:
                return <Ionicons name={'ios-map-sharp'} color={'#FFFFFF'} size={28} />
        }
    }

    const handleColor = () => {
        switch (type) {
            case 'car':
                return "#00D2FC";
            case 'event':
                return "#FFC75F";
            case 'flight':
                return "#845EC2";
            case 'hotel':
                return "#FF9671";
            case 'space':
                return "#00C9A7";
            case 'tour':
                return "#D65DB1";
            case 'boat':
                return "#0089BA";
            default:
                return "#FF9671";
        }
    }
    const handleOpenList = () => {
        navigation.navigate('ListItem', { name: type })
    }
    return (
        <View style={styles.wrapItemCategoryHome}>
            <TouchableScale onPress={() => handleOpenList()}>
                <View style={[styles.touchableIcon, { backgroundColor: handleColor(), shadowColor: handleColor() }]}>
                    {handleIcon()}
                </View>
            </TouchableScale>
            {appConfig && appConfig?.booking_types && <TextApp button>{_.startCase(_.camelCase(appConfig.booking_types[type].name))}</TextApp>}
        </View>
    )
}

const itemWidth = (Device.width - (spacingLayout.horizontal * 2)) / 4;
const styles = StyleSheet.create({
    wrapCategoryHome: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        paddingVertical: 7,
        flexWrap: 'wrap',
    },
    wrapItemCategoryHome: {
        width: itemWidth,
        height: itemWidth,
        alignItems: 'center',
        marginVertical: 5,
    },
    touchableIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: itemWidth * .60,
        height: itemWidth * .60,
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: 'grey',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default React.memo(CategoryHome);