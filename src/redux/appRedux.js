import ConnectionAPI from "../connection";
import { getConfigs, registerDevice } from "../config/path";
import { Identify } from "@Helper";

// action types
export const Action = {
  SHOW_SPLASH: "SHOW_SPLASH",
  APP_CONFIG: "APP_CONFIG",
  OPENED_APP: "OPENED_APP",
};

// default state
export const defaultState = {
  showSplash: true,
  appConfig: null,
  openedApp: false,
};

// action creator
export const saveData = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};

export const setOpenedApp = () => async (dispatch) => {
  try {
    dispatch(saveData(Action.OPENED_APP, true));
  } catch (err) {
    console.log(err);
  }
};

export const getAppConfig = (navigation) => async (dispatch) => {
  try {
    const response = await ConnectionAPI({ url: getConfigs, method: "GET" });
    if (response.status) {
      dispatch(saveData(Action.APP_CONFIG, response));
      return response;
    } else {
      navigation.navigate("Wrong", {
        title: `Can't get that configuration right now. \nPlease try again later`,
        canBack: false,
      });
    }
  } catch (err) {
    console.log("---getAppConfig---", err);
  }
};

export const registerDeviceToPushNotification = async (params) => {
  try {
    const response = await ConnectionAPI({
      url: registerDevice,
      method: "POST",
      params,
    });
    if (response.status) {
      console.log("Register Successfully!");
      console.log(response);
      Identify.registeredDevice = true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const hidenSplash = () => async (dispatch, getState) => {
  try {
    dispatch(saveData(Action.SHOW_SPLASH, false));
  } catch (err) {
    console.log(err);
  }
};

// reducer
export const reducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Action.SHOW_SPLASH:
      return { ...state, showSplash: payload };
    case Action.APP_CONFIG:
      return { ...state, appConfig: payload };
    case Action.OPENED_APP:
      return { ...state, openedApp: payload };
    default:
      return state;
  }
};
