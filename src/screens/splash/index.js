import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hidenSplash, getAppConfig } from '../../redux/appRedux';
import { Storage } from '@Helper';
import _ from 'lodash';
import { getDataHome } from '../../redux/homeRedux';
import { login } from '../../redux/userRedux';
import Identify from '../../helper/identify';
import { languages } from '../../config/languages/index';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getAppConfig(navigation)).then(res => {
      if (res && res?.status) {
        if (res?.currency_main && res?.locale) {
          getDataFromConfig(res);
        }
        else {
          getLocalData();
        }
      }
    });
  }, []);

  const getDataFromConfig = async (res) => {
    const language = await Storage.getData('language');
    if (language) {
      Identify.languageSelected = language;
      if (languages && languages?.hasOwnProperty(language)) {
        Identify.language = languages[language];
        Identify.isRtl = languages[language].isRtl;
        global.isRtl = languages[language].isRtl;
        global.language = languages[language];
      }
    }
    else {
      let language = languages[Identify.languageSelected]
      global.language = language;
      global.isRtl = language.isRtl;
      Identify.language = language;
      Identify.isRtl = language.isRtl;
    }
    if (res?.currency_main) {
      const currency = res?.currency.find(e => e?.currency_main == res?.currency_main);
      Identify.currency = currency;
      global.currency = currency;
    }
    else {
      global.currency = Identify.currency;
    }
    const response = await Storage.getCustomerAutoLoginInfo();
    if (!_.isNull(response)) {
      dispatch(login(response)).then(res => {
        dispatch(getDataHome()).then(res => {
          if (res) {
            dispatch(hidenSplash());
          }
        });
      })
    }
    else {
      dispatch(getDataHome()).then(res => {
        if (res) {
          dispatch(hidenSplash());
        }
      });
    }
  }

  const getLocalData = async () => {
    const language = await Storage.getData('language');
    if (language) {
      Identify.languageSelected = language;
      if (languages && languages?.hasOwnProperty(language)) {
        Identify.language = languages[language];
        Identify.isRtl = languages[language].isRtl;
        global.isRtl = languages[language].isRtl;
        global.language = languages[language];
      }
    }
    else {
      let language = languages[Identify.languageSelected]
      global.language = language;
      global.isRtl = language.isRtl;
      Identify.language = language;
      Identify.isRtl = language.isRtl;
    }
    const currency = await Storage.getData('currency');
    if (currency) {
      Identify.currency = JSON.parse(currency);
      global.currency = JSON.parse(currency);
    }
    else {
      global.currency = Identify.currency;
    }
    const response = await Storage.getCustomerAutoLoginInfo();
    if (!_.isNull(response)) {
      dispatch(login(response)).then(res => {
        dispatch(getDataHome()).then(res => {
          if (res) {
            dispatch(hidenSplash());
          }
        });
      })
    }
    else {
      dispatch(getDataHome()).then(res => {
        if (res) {
          dispatch(hidenSplash());
        }
      });
    }
  }

  return null;
};
export default React.memo(SplashScreen);
