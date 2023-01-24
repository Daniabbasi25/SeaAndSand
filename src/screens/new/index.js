import React, { useEffect } from 'react';
import BaseScreen from '../base';
import { ListLastestNew, ListOtherNews } from '@NewScreenComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getListNew } from '../../redux/newRedux';
import { Indicator } from '@BaseComponent';
import _ from 'lodash';
import { View, StyleSheet, Dimensions } from 'react-native';

const NewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const listNew = useSelector(state => state.new.listNew);

  useEffect(() => {
    dispatch(getListNew());
  }, []);

  const listLastestNew = _.slice(listNew, 0, Math.floor(_.size(listNew) / 3));
  const listOtherNew = _.slice(listNew, Math.floor(_.size(listNew) / 3), _.size(listNew));
  return (
    <BaseScreen
      scroll
      usePadding
    >
      {!listNew ? <View style={styles.root}>
        <Indicator />
      </View> : <>
        {!_.isEmpty(listLastestNew) && <ListLastestNew navigation={navigation} data={listLastestNew} />}
        {!_.isEmpty(listOtherNew) && <ListOtherNews navigation={navigation} data={listOtherNew} />}
      </>}
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default React.memo(NewScreen);
