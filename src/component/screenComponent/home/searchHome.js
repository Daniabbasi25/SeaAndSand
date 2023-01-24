import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableScale, SizedBox } from '@BaseComponent';
import Toast from 'react-native-toast-message';

const SearchHome = ({ navigation }) => {
    const { colors } = useTheme();
    const [valueSearch, setValueSearch] = useState("");

    const onChangeSearch = (text) => {
        setValueSearch(text);
    }

    const clearValueSearch = () => {
        setValueSearch("");
    }

    const search = () => {
        if (valueSearch) {
            navigation.navigate('SearchAll', { keyword: valueSearch })
            clearValueSearch();
        }
        else {
            Toast.show({
                type: 'success',
                text1: 'Attention!',
                text1Style: { fontSize: 40 },
                text2: 'Please fill search box before search',
                visibilityTime: 3000,
            })
        }
    }

    return (
        <View style={styles.wrapSearchHome}>
            <TextInput
                placeholder="Search Hotel, Tour etc..."
                value={valueSearch}
                onChangeText={(text) => onChangeSearch(text)}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.search}
                placeholderTextColor={'#A2A7CC'}
                onSubmitEditing={() => search()}

            />
            {valueSearch !== "" && <TouchableScale onPress={() => clearValueSearch()}>
                <Ionicons name={'close-circle'} size={18} color={colors.primary} />
            </TouchableScale>}
            <SizedBox width={1} height={30} backgroundColor={colors.disabled} />
            <TouchableScale onPress={() => search()}>
                <View style={styles.touchableSearch}>
                    <Ionicons name={'search'} size={22} color={colors.primary} />
                </View>
            </TouchableScale>
        </View >
    )
}

const styles = StyleSheet.create({
    wrapSearchHome: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: '#F4F5FD',
        borderRadius: 15,
    },
    search: {
        width: '80%',
        height: 50,
        fontFamily: 'Montserrat',
        fontSize: 16,
        textAlign: global.isRtl ? 'right' : 'left'
    },
    touchableSearch: {
        alignItems: 'center'
    }
});

export default React.memo(SearchHome);