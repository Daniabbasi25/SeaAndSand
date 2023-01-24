import React from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import { ListWishList } from '@WishlistScreenComponent';
import { HeaderApp } from '@BaseComponent';

const WishlistScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <BaseScreen
            backgroundColor={colors.background}
            header={<HeaderApp
                middleContent={global.language['Wishlist']} />}
            usePadding
        >
            <ListWishList navigation={navigation} />
        </BaseScreen>
    );
};
export default React.memo(WishlistScreen);
