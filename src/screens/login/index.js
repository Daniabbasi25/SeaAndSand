import React, { useRef, useState, useEffect } from 'react';
import BaseScreen from '../base';
import { useTheme } from 'react-native-paper';
import {
  TitleLogin,
  FormLogin,
  ButtonLogin,
  OtherLogin,
  SocialLogin,
  NewAccount
} from '@LoginScreenComponent';
import { login } from '../../redux/userRedux';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const formLoginRef = useRef(null);
  const { colors } = useTheme();

  useEffect(() => {
    return () => { unmounted.current = true }
  }, []);

  const handleLogin = () => {
    let dataLogin = formLoginRef?.current?.getData();
    setLoading(true);
    dispatch(login(dataLogin)).then(res => {
      if (!unmounted.current) {
        setLoading(false);
      }
      if (res.status) {
        navigation.navigate('Home');
        Toast.show({
          type: 'success',
          text1: `${global.language['Hi']}!`,
          text1Style: { fontSize: 40 },
          text2: `${global.language['WelcomeBack']} 👋`,
          visibilityTime: 3000,
        });
      }
      else {
        Toast.show({
          type: 'error',
          text1: `${global.language['Oops']}!`,
          text1Style: { fontSize: 40 },
          text2: res?.message,
          visibilityTime: 3000,

        });
      }
    })
  }
  return (
    <BaseScreen scroll backgroundColor={colors.background} usePadding>
      <TitleLogin navigation={navigation} />
      <FormLogin ref={formLoginRef} navigation={navigation} />
      <ButtonLogin executeLogin={() => handleLogin()} loading={loading} />
      <OtherLogin />
      <SocialLogin />
      <NewAccount navigation={navigation} />
    </BaseScreen>
  );
};
export default React.memo(LoginScreen);
