import React from 'react';
import BaseScreen from '../base';
import { ListItemAccount } from '@AccountScreenComponent';

const AccountScreen = ({ navigation }) => {
  return (
    <BaseScreen>
      <ListItemAccount navigation={navigation} />
    </BaseScreen>
  );
};
export default React.memo(AccountScreen);
