import React from 'react';
import BaseScreen from '../base';
import { HeaderApp, TextApp } from '@BaseComponent';
import { View, Image, StyleSheet } from 'react-native';
import { Images } from '@Assets';

const WrongScreen = ({ route }) => {
    const { title, canBack } = route?.params;
    return (
        <BaseScreen
            header={canBack ? <HeaderApp middleContent={""} /> : null}
        >
            <View style={styles.container}>
                <Image
                    source={Images.oops}
                    style={styles.image}
                />
                <TextApp bold title>Something went wrong !!!</TextApp>
                <TextApp button style={styles.description}>{title}</TextApp>
            </View>
        </BaseScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200
    },
    description: {
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20
    }
});
export default React.memo(WrongScreen);
